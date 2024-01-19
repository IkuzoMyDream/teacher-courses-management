import { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDataContextStf } from "../../utils/stf-context";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function AnnouncementPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishDatetime, setPublishDatetime] = useState(null);
  const [maxScore, setMaxScore] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();
  const myData = useDataContextStf();
  const courseId = myData?.courses?.find(
    (d) => d.name?.split(" ")[0] == pathname.split("/")[3]
  ).id;
  const userId = myData?.id;

  const handleSubmit = async (e) => {
    const response = await axios.post("/api/announcements", {
      data: {
        title: title,
        description: description,
        publish_datetime: publishDatetime,
        full_score: maxScore,
        course: parseInt(courseId),
        announcer: userId,
      },
    });
    window.location.reload();
  };

  return (
    <Container>
      <Modal
        show={showModal}
        // onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ท่านแน่ใจว่าต้องการโพสต์ประกาศใช่หรือไม่</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>ท่านแน่ใจว่าต้องการโพสต์ประกาศใช่หรือไม่?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <Row className="mb-3">
          <Col sm={{ span: 6, offset: 3 }}>
            <Form.Label className="text-center">หัวข้อ</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="หัวข้อประกาศ"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={{ span: 6, offset: 3 }}>
            <Form.Label className="text-center">รายละเอียด</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="เพิ่มรายละเอียด"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm="6">
            <Form.Label>คะแนนเต็ม</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="คะแนนเต็ม"
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </Col>
          <Col sm="6">
            <Form.Label>เวลาประกาศ</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="เพิ่มรายละเอียด"
              onChange={(e) => setPublishDatetime(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="primary" type="submit">
              ยืนยัน
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
