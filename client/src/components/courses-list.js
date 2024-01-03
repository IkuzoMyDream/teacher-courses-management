import { Card, Container, Table } from "react-bootstrap";

export default function CoursesList(props) {
  if (props.data) {
    return (
      <div>
        {props.data.map((d) => (
          <div key={d.id}>
            <Container>
              <Table hover bordered>
                <tbody>
                  <tr>
                    {/* {d.course_name} */}
                    <td>
                      <Card>
                        <Card.Header>{d.course_name}</Card.Header>
                        <Card.Body></Card.Body>
                      </Card>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </div>
        ))}
      </div>
    );
  }
}
