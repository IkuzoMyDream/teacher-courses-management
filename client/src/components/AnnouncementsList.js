import { Table } from "react-bootstrap";

export default function AnnouncementsList(props) {
  console.log(props);
  return (
    <Table>
      <tbody>
        {props.data.map((d) => (
          <tr key={d.id}>
            <td>{d.title}</td>
            <td>{d.description}</td>
            <td>{d.publish_datetime}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
