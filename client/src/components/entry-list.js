import { Spin } from "antd";
import { useDataContext } from "../utils/context";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

export default function EntryList() {
  const { announcementId } = useParams();
  const myData = useDataContext();

  if (myData) {
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

    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Text>{myEntry.score}</Card.Text>
            <Card.Text>{myEntry.feedback}</Card.Text>
            {myEntry.ack_datetime ? (
              <Card.Text>{myEntry.ack_datetime}</Card.Text>
            ) : (
              <Button onClick={ack}>ยืนยัน</Button>
            )}
          </Card.Body>
        </Card>
      </div>
    )
  } else {
    return <Spin></Spin>
  }
}
