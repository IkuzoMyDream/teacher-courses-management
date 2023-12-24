import { Table } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function AnnouncementsList(props) {
  console.log(props);
  if (props.data) {
    return (
      <div>
        <Table hover>
          <tbody>
            {props.data.map((d) => (
              <tr>
                <Card key={d.id} className="mb-3" borderless>
                  <Card.Header>{d.course_name}</Card.Header>
                  <Card.Body>{d.announcement.publish_datetime}</Card.Body>
                </Card>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
