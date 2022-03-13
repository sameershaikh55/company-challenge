import React from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import downloadFile from "../../assets/images/downloadFile.svg";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportExcelTable = ({ clientName, challengeName, assignmentList }) => {
	// 	ASSIGNMENT LIST GENERATOR
	const assignmentListGenerator = (assignmentListParam) => {
		let assignments = [];
		for (let i = 0; i < assignmentListParam.length; i++) {
			assignments.push({
				assignment_title: assignmentListParam[i].assignment_title,
				assignment_subtitle: assignmentListParam[i].assignment_subtitle,
				assignment_description: assignmentListParam[i].assignment_description,
				assignment: assignmentListParam[i].assignment,
				video_url: assignmentListParam[i].video_url,
				assignment_password: assignmentListParam[i].assignment_password,
				media: assignmentListParam[i].media,
				video_url: assignmentListParam[i].video_url,
				assignment_created_at: assignmentListParam[i].assignment_created_at,
			});
		}
		return assignments;
	};

	// 	SAVING FILE DETAILS
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	// 	EXPORT FUNCTION
	const exportToExcel = (csvData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(csvData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<button
			onClick={(e) =>
				exportToExcel(
					assignmentListGenerator(assignmentList),
					`${clientName}-${challengeName}-assignments`
				)
			}
		>
			<img src={downloadFile} alt="downloadFile" />
		</button>
	);
};

export default ExportExcelTable;
