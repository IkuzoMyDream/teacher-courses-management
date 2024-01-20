import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDataContextStf } from "../../utils/stf-context";
import * as XLSX from "xlsx";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function EntriesPost() {
  const [file, setFile] = useState(null);
  const [maxScore, setMaxScore] = useState(null);
  const [idS, setIdS] = useState([]);
  const { pathname } = useLocation();
  const { announcementId } = useParams();
  const myData = useDataContextStf();
  const courseId = myData?.courses?.find(
    (d) => d.name?.split(" ")[0] == pathname.split("/")[3]
  ).id;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const filtersIds = async () => {
    const response = await axios.get("/api/users");
    let idS = {};
    response?.data
      .filter((d) => d.email[0].match(/\d/))
      .forEach((d) => {
        const std_code = d.email.slice(0, 3);
        idS[std_code] = d.id;
      });
    setIdS(idS);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = (e) => {
          const workbookData = e.target.result;
          const jsonData = parseExcel(workbookData);

          console.log("Converted JSON:", jsonData);
          setMaxScore(jsonData[0][1].split(" ")[2].replace(/\D/g, ""));

          if (jsonData && idS.length != 0) {
            jsonData.slice(1, -1).forEach((d) => {
              const key = d[0];
              const score = d[1] + "";
              const feedback = d[2];
              axios.post("/api/entries", {
                data: {
                  owner: idS[key],
                  score: score,
                  feedback: feedback,
                  course: courseId,
                  announcement: announcementId,
                },
              });
            });
          }
        };

        reader.readAsBinaryString(file);
      } catch (error) {
        console.error("Error reading file:", error.message);
      }
    }
  };

  const parseExcel = (workbookData) => {
    const workbook = XLSX.read(workbookData, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      blankrows: false,
    });

    return jsonData;
  };

  useEffect(() => {
    handleUpload();
  }, [idS]);

  return (
    <Container>
      <Form.Control type="file" onChange={handleFileChange} />
      <button onClick={filtersIds}>Upload and Convert</button>
    </Container>
  );
}
