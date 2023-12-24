import { Table } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function AnnouncementsList(props) {
  console.log(props)
  if (props.data) {
    return (
      <div>
        <Table bordered hover size="lg" responsive="xl">
          <tbody>
            {props.data.map((d) => (
              <tr key={d.id}>
                <td>{d.course_name}</td>
                <td>{d.announcement.publish_datetime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
