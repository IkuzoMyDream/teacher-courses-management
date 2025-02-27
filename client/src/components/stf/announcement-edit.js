import { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDataContextStf } from "../../utils/stf-context";
import AnnouncementDelete from "./announcement-delete";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function AnnouncementEdit() {
  // prepare source
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const announcementId = searchParams.get("id");
  const myData = useDataContextStf();
  const courseName = pathname.split("/")[3];
  const announcement = myData?.courses
    .find((d) => d.name?.split(" ")[0] == courseName)
    .announcements?.find((d) => d.id == announcementId);
  const announcementOwnerId = announcement?.announcer?.id;

  // state for edit
  const [title, setTitle] = useState(announcement?.title);
  const [description, setDescription] = useState(announcement?.description);
  const [publishDatetime, setPublishDatetime] = useState(
    announcement?.publish_datetime
  );
  const [maxScore, setMaxScore] = useState(0);

  // editting part
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const courseId = myData?.courses?.find(
    (d) => d.name?.split(" ")[0] == pathname.split("/")[3]
  ).id;
  const userId = myData?.id;

  const formatDate = (datetime) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(datetime));
  };

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
                  <Form.Label>วัน-เวลาเผยแพร่ประกาศ</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder={formatDate(announcement?.publish_datetime)}
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
              <Form.Label>วัน-เวลาเผยแพร่ประกาศ</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={formatDate(announcement?.publish_datetime)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={{ span: 6, offset: 3 }}>
              <Form.Label className="text-center">ผู้ประกาศ</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={announcement?.announcer?.username}
              />
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col className="col-6">
              <Button
                disabled={userId === announcementOwnerId ? false : true}
                variant="primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditModal(true);
                }}
                size="sm"
              >
                แก้ไขประกาศ
              </Button>
            </Col>
            <Col className="col-6">
              <AnnouncementDelete
                announcementOwnerId={announcementOwnerId}
                userId={userId}
              ></AnnouncementDelete>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
