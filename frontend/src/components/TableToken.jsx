import React from "react";

function TableToken({ columns, data,onView,onDelete }) {
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

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableToken;
