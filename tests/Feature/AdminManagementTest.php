<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminManagementTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => 'admin'])->save();

        return $user;
    }

    public function test_admin_can_open_all_management_pages(): void
    {
        $this->actingAs($this->admin());

        $this->get(route('admin.rooms.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Rooms/Index'));

        $this->get(route('admin.schedules.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Schedules/Index'));

        $this->get(route('admin.bookings.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Bookings/Index'));
    }

    public function test_non_admin_users_cannot_access_admin_management(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('admin.rooms.index'))
            ->assertForbidden();
    }

    public function test_admin_can_create_a_room_and_change_its_status(): void
    {
        $this->actingAs($this->admin());

        $this->post(route('admin.rooms.store'), [
            'name' => 'Ruang Kuliah 101',
            'capacity' => 40,
        ])->assertSessionHasNoErrors();

        $room = Room::query()->firstOrFail();
        $this->assertSame('Ruang Kuliah 101', $room->name);
        $this->assertSame(40, $room->capacity);

        $this->patch(route('admin.rooms.status', $room), [
            'status' => 'maintenance',
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('rooms', [
            'id' => $room->id,
            'status' => 'maintenance',
        ]);
    }

    public function test_admin_cannot_create_overlapping_room_schedules(): void
    {
        $this->actingAs($this->admin());
        $room = Room::create([
            'name' => 'Ruang A',
            'capacity' => 30,
        ]);

        $payload = [
            'room_id' => $room->id,
            'subject' => 'Pemrograman Web',
            'day_of_week' => 'Senin',
            'start_time' => '09:00',
            'end_time' => '10:30',
        ];

        $this->post(route('admin.schedules.store'), $payload)
            ->assertSessionHasNoErrors();

        $this->post(route('admin.schedules.store'), [
            ...$payload,
            'subject' => 'Basis Data',
            'start_time' => '10:00',
            'end_time' => '11:00',
        ])->assertSessionHasErrors('room_id');

        $this->assertDatabaseCount('schedules', 1);
    }

    public function test_admin_can_emergency_cancel_an_active_booking(): void
    {
        $this->actingAs($this->admin());
        $user = User::factory()->create();
        $room = Room::create([
            'name' => 'Ruang A',
            'capacity' => 30,
        ]);
        $booking = Booking::create([
            'user_id' => $user->id,
            'room_id' => $room->id,
            'purpose' => 'Kegiatan mahasiswa',
            'booking_date' => '2026-10-20',
            'start_time' => '13:00',
            'end_time' => '14:00',
            'status' => 'approved',
        ]);

        $this->patch(route('admin.bookings.cancel', $booking))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'cancelled',
        ]);
    }
}
