import { Table } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function AnnouncementsList(props) {
  console.log(props);
  return (
    <div>
      <Table bordered hover size="lg" responsive="xl">
        <tbody>
          {props.data.map((d) => (
            <tr key={d.id} >
              <td>{d.course_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
