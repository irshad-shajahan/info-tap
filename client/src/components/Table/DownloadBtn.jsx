import { DownloadIcon } from "../Icons/Icons";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <button
      className="bg-indigo-700 px-5 flex items-center py-2 rounded-lg fill-white text-white font-semibold gap-2 hover:bg-indigo-500"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <DownloadIcon />
      Download
    </button>
  );
};

export default DownloadBtn;
