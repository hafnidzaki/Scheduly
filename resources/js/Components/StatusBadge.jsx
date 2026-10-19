const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    available: 'bg-green-100 text-green-800',
    maintenance: 'bg-orange-100 text-orange-800',
    'in use': 'bg-blue-100 text-blue-800',
};

export default function StatusBadge({ status }) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status] ?? 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
}