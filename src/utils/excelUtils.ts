import * as XLSX from "xlsx";

// Data to ExcelFiel
const arrayToExcelFile = (data: any[][]) => {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "participation_list.xlsx");
};

// ExcelFile to Data
const excelFileToArray = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) return;

      try {
        const binaryStr = event.target.result as string;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // 첫 번째 시트 선택
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 시트 데이터를 2차원 배열로 변환
        const sheetData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as string[][];

        resolve(sheetData); // 성공적으로 데이터 반환
      } catch (error) {
        reject(error); // 처리 중 오류 발생 시 reject
      }
    };

    reader.readAsBinaryString(file);
  });
};

// Download Template Excel File
const downloadTemplate = () => {
  const fileUrl = "/files/writon_participate_template.xlsx";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "writon_participate_template.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { arrayToExcelFile, excelFileToArray, downloadTemplate };
