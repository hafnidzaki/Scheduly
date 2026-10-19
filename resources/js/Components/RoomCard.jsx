import StatusBadge from './StatusBadge';
import PrimaryButton from './PrimaryButton';

export default function RoomCard({ room, onPinjam }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <StatusBadge status={room.status} />
            </div>
            <p className="text-sm text-gray-600 mt-2">Kapasitas: {room.capacity} orang</p>
            <PrimaryButton
                onClick={() => onPinjam(room)}
                disabled={room.status !== 'available'}
                className="mt-4 w-full justify-center"
            >
                Pinjam
            </PrimaryButton>
        </div>
    );
}