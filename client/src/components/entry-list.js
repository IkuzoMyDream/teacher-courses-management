import { Spin } from "antd";
import { useDataContext } from "../utils/context";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

export default function EntryList() {
  const { announcementId } = useParams();
  const myData = useDataContext();

  if (myData) {
    const formatDate = (datetime) => {
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Bangkok",
      };
      return new Intl.DateTimeFormat("en-GB", options).format(
        new Date(datetime)
      );
    };
    const myEntry = myData.entries.find(
      (entry) => entry.announcement.id == announcementId
    );

    const ack = async (e) => {
      axios.defaults.baseURL =
        process.env.REACT_APP_BASE_URL || "http://localhost:1337";
      await axios
        .put(`/api/entries/${myEntry.id}/ackCheck`)
        .then(window.location.reload());
    };

    if (myEntry) {
      console.log(myEntry);
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Text as="h1">
                score: {myEntry.score}/{myEntry.announcement.full_score}
              </Card.Text>
              <Card.Text as="h1">feedback: {myEntry.feedback}</Card.Text>
              {myEntry.ack_datetime ? (
                <Card.Text>
                  ยืนยันแล้วเมื่อ {formatDate(myEntry.ack_datetime)}
                </Card.Text>
              ) : (
                <Button onClick={ack}>ยืนยัน</Button>
              )}
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      console.log(myEntry);
      return (
        <div>
          <h1>คุณไม่มีคะแนน กรุณาติดต่ออาจารย์ประจำวิชา</h1>
        </div>
      );
    }
  } else {
    return <Spin></Spin>;
  }
}
