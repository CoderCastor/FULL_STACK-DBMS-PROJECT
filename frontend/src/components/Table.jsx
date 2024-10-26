import React from "react";

function Table({ columns, data,onView,onDelete }) {
  return (
    <div className="max-h-[480px] overflow-y-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-zinc-800 text-white sticky top-0 shadow-2xl">
          <tr>
            {columns.map((column) => (
              <th
                className="px-10 py-5 text-3xl text-center "
                key={column.field}
              >
                {column.header}
              </th>
            ))}
            <th className="px-10 py-5 text-3xl text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  className="px-10 py-5 bg-zinc-100 text-3xl text-center border-2"
                  key={column.field}
                >
                  {row[column.field]}
                </td>
              ))}

              <td className="flex justify-center items-center gap-3 bg-zinc-100 px-10 py-5">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl font-black hover:bg-blue-400"
                  onClick={() => onView(row)}
                >
                  View
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl font-black hover:bg-red-400"
                  onClick={() => onDelete(row)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
