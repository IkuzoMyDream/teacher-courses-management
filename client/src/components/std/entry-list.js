import { useDataContextStd } from "../../utils/std-context";
import { useSearchParams, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import axios from "axios";

export default function EntryList({ setIsSpin }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const announcementId = searchParams.get("id");
  const myData = useDataContextStd();

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

  if (myData) {
    const entry = myData.entries.find(
      (entry) => entry.announcement?.id == announcementId
    );
    console.log(entry);
    const ack = async (e) => {
      axios.defaults.baseURL =
        process.env.REACT_APP_BASE_URL || "http://localhost:1337";
      await axios
        .put(`/api/entries/${entry?.id}/ackCheck`)
        .then(window.location.reload());
    };

    if (entry) {
      setIsSpin(false);
      return (
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <h5>คะแนน / {entry.announcement.full_score}</h5>
                </th>
                <th>
                  <h5>สถานะ</h5>
                </th>
                <th>
                  <h5>คอมเม้นต์</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={entry?.id}>
                <td style={{ fontSize: "large" }}>{entry.score}</td>
                <td style={{ fontSize: "large" }}>
                  {entry.ack_datetime ? (
                    `ยืนยันแล้วเมื่อ ${formatDate(entry.ack_datetime)}`
                  ) : (
                    <Button variant="primary" size="sm" onClick={ack}>
                      ยืนยัน
                    </Button>
                  )}{" "}
                </td>
                <td style={{ fontSize: "large" }}>{entry.feedback} </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      );
    } else {
      setIsSpin(false);
      return (
        <Container>
          <h1>คุณไม่มีคะแนน กรุณาติดต่ออาจารย์ประจำวิชา</h1>
        </Container>
      );
    }
  }
}
