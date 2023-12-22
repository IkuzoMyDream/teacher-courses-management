import { Table } from "react-bootstrap";

export default function AnnouncementsList(props) {
  // console.log(props);
  return (
    <Table  bordered hover size="sm">
      <tbody>
        {props.data.map((d) => (
          <tr key={d.id}>
            <td>{d.title}</td>
            <td>{d.description}</td>
            <td>{d.publish_datetime}</td>
            {/* <td>{d.course}</td>  */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
