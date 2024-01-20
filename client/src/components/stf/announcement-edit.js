import { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDataContextStf } from "../../utils/stf-context";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function AnnouncementEdit() {
  // prepare source
  const { announcementId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const myData = useDataContextStf();
  const courseName = pathname.split("/")[3];
  const announcement = myData?.courses
    .find((d) => d.name?.split(" ")[0] == courseName)
    .announcements?.find((d) => d.id == announcementId);

  // state for edit
  const [title, setTitle] = useState(announcement?.title);
  const [description, setDescription] = useState(announcement?.description);
  const [publishDatetime, setPublishDatetime] = useState(
    announcement?.publish_datetime
  );
  const [maxScore, setMaxScore] = useState(announcement?.full_score);

  // editting part
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const courseId = myData?.courses?.find(
    (d) => d.name?.split(" ")[0] == pathname.split("/")[3]
  ).id;
  const userId = myData?.id;

  const handleSubmit = async (e) => {
    const response = await axios.put(`/api/announcements/${announcement.id}`, {
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

  if (announcement) {
    return (
      <Container>
        {/* {"confirm modal"} */}
        <Modal show={showConfirmModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>ท่านแน่ใจว่าต้องการโพสต์ประกาศใช่หรือไม่</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              ยกเลิก
            </Button>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>

        {/* {"edit modal"} */}
        <Modal show={showEditModal} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขประกาศ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col sm={{ span: 6, offset: 3 }}>
                  <Form.Label className="text-center">หัวข้อ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={announcement?.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={{ span: 6, offset: 3 }}>
                  <Form.Label className="text-center">รายละเอียด</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={announcement?.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm="6">
                  <Form.Label>คะแนนเต็ม</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={announcement?.full_score}
                    onChange={(e) => setMaxScore(e.target.value)}
                  />
                </Col>
                <Col sm="6">
                  <Form.Label>เวลาประกาศ</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder={announcement?.publish_datetime}
                    onChange={(e) => setPublishDatetime(e.target.value)}
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                setShowConfirmModal(true);
                setShowEditModal(false);
              }}
            >
              แก้ไข
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Row className="mb-3">
            <Col sm={{ span: 6, offset: 3 }}>
              <Form.Label className="text-center">หัวข้อ</Form.Label>
              <Form.Control disabled type="text" value={announcement?.title} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={{ span: 6, offset: 3 }}>
              <Form.Label className="text-center">รายละเอียด</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={announcement?.description}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="6">
              <Form.Label>คะแนนเต็ม</Form.Label>
              <Form.Control
                disabled
                type="number"
                value={announcement?.full_score}
              />
            </Col>
            <Col sm="6">
              <Form.Label>เวลาประกาศ</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={announcement?.publish_datetime}
              />
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="col-6">
              <Button
                variant="primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditModal(true);
                }}
              >
                แก้ไขประกาศ
              </Button>
            </Col>
            <Col className="col-6">
              <Button
                variant="danger"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  axios.delete(`/api/announcements/${announcement.id}`);
                  navigate(-1);
                }}
              >
                ลบประกาศ
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
