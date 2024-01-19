import { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function AnnouncementPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishDatetime, setPublishDatetime] = useState(null);
  const [maxScore, setMaxScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post("/api/announcements", {
      data: {
        title: title,
        description: description,
        publish_datetime: publishDatetime,
        full_score: maxScore,
      },
    });
    console.log(title, description, publishDatetime, maxScore);
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Col sm={{ span: 6, offset: 3 }}>
            <Form.Label className="text-center">หัวข้อ</Form.Label>
            <Form.Control
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
              type="number"
              placeholder="คะแนนเต็ม"
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </Col>
          <Col sm="6">
            <Form.Label>เวลาประกาศ</Form.Label>
            <Form.Control
              type="date"
              placeholder="เพิ่มรายละเอียด"
              onChange={(e) => setPublishDatetime(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
