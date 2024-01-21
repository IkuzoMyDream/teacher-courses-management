import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Image,
} from "react-bootstrap";
import { useDataContextStf } from "../../utils/stf-context";
import * as XLSX from "xlsx";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import EntriesDelete from "./entries-delete";

const EntriesPost = () => {
  const myData = useDataContextStf();
  const [file, setFile] = useState(null);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showConfirmPostModal, setShowConfirmModal] = useState(false);
  const announcementId = searchParams.get("id");
  const courseName = pathname.split("/")[3];
  const announcement = myData?.courses
    .find((d) => d.name?.split(" ")[0] == courseName)
    .announcements?.find((d) => d.id == announcementId);
  const announcementOwnerId = announcement?.announcer?.id;

  const userId = myData?.id;

  const entries = myData?.courses
    .find((d) => d.name?.split(" ")[0] === courseName)
    .announcements.find((d) => d.id == announcementId)?.entries;

  const courseId = myData?.courses?.find(
    (d) => d.name?.split(" ")[0] === pathname.split("/")[3]
  ).id;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const fetchUserIds = async () => {
    try {
      const response = await axios.get("/api/users");
      return response?.data
        .filter((d) => d.email[0].match(/\d/))
        .reduce((acc, d) => {
          const std_code = d.email.slice(0, 3);
          acc[std_code] = d.id;
          return acc;
        }, {});
    } catch (error) {
      console.error("Error fetching user IDs:", error.message);
      return {};
    }
  };

  const uploadEntries = async (jsonData, idS) => {
    try {
      await Promise.all(
        jsonData.slice(1, -1).map(async (d) => {
          const key = d[0];
          const score = d[1] + "";
          const feedback = d[2];
          await axios.post("/api/entries", {
            data: {
              owner: idS[key],
              score: score,
              feedback: feedback,
              course: courseId,
              announcement: announcementId,
            },
          });
        })
      );
    } catch (error) {
      console.error("Error uploading entries:", error.message);
    } finally {
      window.location.reload();
    }
  };

  const deleteEntries = async () => {
    try {
      await Promise.all(
        entries.map(async (d) => {
          await axios.delete(`/api/entries/${d.id}`);
        })
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting entries:", error.message);
    }
  };

  const handleUpload = async (e) => {
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const workbookData = e.target.result;
          const jsonData = parseExcel(workbookData);

          console.log("Converted JSON:", jsonData);

          if (jsonData) {
            const idS = await fetchUserIds();
            if (Object.keys(idS).length !== 0) {
              await uploadEntries(jsonData, idS);
            }
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

  if (announcementOwnerId === userId) {
    if (entries?.length === 0 || !entries) {
      return (
        <Container>
          <Modal
            show={showConfirmPostModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>ตัวอย่างไฟล์ที่ถูกต้อง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                <li>ต้องเป็นไฟล์นามสกุล .xlsx เท่านั้น</li>
                <li>
                  คอลัมน์ (1, 2, 3) ต้องเป็น (รหัสนักศึกษา, คะแนน, คอมเม้นต์)
                  ตามลำดับ
                </li>
                <li>เริ่มใส่รายการจากแถวที่ 2 เป็นต้นไป</li>
              </ul>
              <Image
                src={"/entries-post-example.jpg"}
                style={{ width: "100%" }}
              ></Image>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                }}
              >
                รับทราบ
              </Button>
            </Modal.Footer>
          </Modal>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
          >
            <Row className="mb-3">
              <Col sm={{ span: 6, offset: 3 }}>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowConfirmModal(true)}
                >
                  ตัวอย่าง
                </Button>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                ></Form.Control>
                <Button type="submit" size="sm" variant="secondary">
                  Upload
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      );
    } else {
      return <EntriesDelete></EntriesDelete>;
    }
  }
};

export default EntriesPost;
