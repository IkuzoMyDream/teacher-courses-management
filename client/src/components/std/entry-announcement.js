import { Form, Row, Col } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDataContextStd } from "../../utils/std-context";

export default function EntryAnnouncement() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const announcementId = searchParams.get("id");
  const myData = useDataContextStd();
  const courseName = pathname.split("/")[3];
  const announcement = myData?.courses
    .find((d) => d.name?.split(" ")[0] == courseName)
    ?.announcements?.find((d) => d.id == announcementId);
  return (
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
        <Col sm={{ span: 6, offset: 3 }}>
          <Form.Label>คะแนนเต็ม</Form.Label>
          <Form.Control
            disabled
            type="number"
            value={announcement?.full_score}
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
    </Form>
  );
}
