export default function DataTable({
    headers = [],
    columns,
    data = [],
    actions,
    emptyMessage = 'Tidak ada data yang tersedia.',
}) {
    const tableColumns =
        columns ??
        headers.map((header, index) => ({
            label: header,
            key: typeof data[0] === 'object' ? Object.keys(data[0])[index] : index,
        }));

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {tableColumns.map((column) => (
                            <th
                                key={column.key ?? column.label}
                                scope="col"
                                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions && (
                            <th scope="col" className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Aksi
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={row.id ?? rowIndex} className="transition-colors hover:bg-gray-50">
                                {tableColumns.map((column, columnIndex) => (
                                    <td key={column.key ?? columnIndex} className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                                        {column.render
                                            ? column.render(row)
                                            : row[column.key] ?? '—'}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-medium">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={tableColumns.length + (actions ? 1 : 0)}
                                className="px-5 py-12 text-center text-sm text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}