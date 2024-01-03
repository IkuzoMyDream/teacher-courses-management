import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function CoursesList(props) {
  const [hoveredCard, setHoveredCard] = useState(null);

  if (props.data) {
    props.data.sort((a, b) => b.announcements.length - a.announcements.length);
    console.log(props.data);
    return (
      <div>
        {props.data.map((d) => (
          <div key={d.id}>
            <Container>
              <Table hover bordered>
                <tbody>
                    {d.announcements.length} ประกาศ
                  <tr>
                    {d.announcements.length !== 0 ? (
                      <td>
                        <Card
                          className={`mb-3 ${
                            hoveredCard === d.id ? "custom-hover" : ""
                          }`}
                          onMouseOver={() => setHoveredCard(d.id)}
                          onMouseOut={() => setHoveredCard(null)}
                          style={{
                            transition: "background-color 0.3s",
                            backgroundColor:
                              hoveredCard === d.id ? "#596FB7" : "inherit",
                            cursor: "pointer",
                          }}
                        >
                          <Card.Body>
                            <Card.Title>{d.name}</Card.Title>
                            <Card.Subtitle>{d.section}</Card.Subtitle>
                            <Card.Text>
                              {d.credit} หน่วยกิต{" "}
                              {d.enrollment_type === "C" ? "Credit" : "Audit"}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </td>
                    ) : (
                      <td>
                        <Card
                          className={`mb-3 ${
                            hoveredCard === d.id ? "custom-hover" : ""
                          }`}
                          onMouseOver={() => setHoveredCard(d.id)}
                          onMouseOut={() => setHoveredCard(null)}
                          style={{
                            transition: "background-color 0.3s",
                            cursor: "not-allowed",
                          }}
                        >
                          <Card.Body>
                            <Card.Title>{d.name}</Card.Title>
                            <Card.Subtitle>{d.section}</Card.Subtitle>
                            <Card.Text>
                              {d.credit} หน่วยกิต{" "}
                              {d.enrollment_type === "C" ? "Credit" : "Audit"}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </td>
                    )}
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
