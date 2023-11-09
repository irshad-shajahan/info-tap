import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  // import { USERS } from "../../data";
  import { useState } from "react";
  import DownloadBtn from "./DownloadBtn";
  import DebouncedInput from "./DebouncedInput";
  import { useNavigate } from 'react-router-dom';
  import { SearchIcon } from "../Icons/Icons";
  
  const TanStackTable = ({data,columns,fileName,show}) => {
   
    // const [data] = useState(() => [...USERS]);
    const [globalFilter, setGlobalFilter] = useState("");
  
    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
    const navigate = useNavigate()
    return (
      <div className="p-2 lg:max-w-6xl mx-auto text-white h-screen fill-gray-400 pt-5">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <SearchIcon />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 text-black focus:w-1/3 duration-300 border-indigo-500"
              placeholder="Search all columns..."
            />
          </div> 
          {show?<button className="bg-orange-600 w-60 flex items-center hover:bg-orange-400 hover:text-black transition  delay-300 ease-in-out gap-2 mr-10 rounded-lg font-semibold px-4" onClick={()=>navigate('/digital-office-form')}>Edit form Inputs<ion-icon name="hammer"/></button>:''}
          <DownloadBtn data={data} fileName={fileName} />
        </div>
       <div className=" overflow-x-auto custom-scrollbar pb-3">
       <table className=" w-full text-left rounded-xl overflow-hidden max-h-screen">
          <thead className=" bg-[#2389D2]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-4">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className='bg-white text-black font-semibold'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
       </div>
        {/* pagination */}
        <div className="flex items-center justify-end mt-2 gap-2 text-black">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>
  
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default TanStackTable;
  