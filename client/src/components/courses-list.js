import { Card, Container, Table } from "react-bootstrap";
import {  useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../utils/context";


export default function CoursesList(props) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const myData = useDataContext();

  if (myData) {
    myData.courses.sort(
      (a, b) => b.announcements.length - a.announcements.length
    );
    return (
      <div>
        {myData.courses.map((d) => (
          <div key={d.id}>
            <Container>
              <Table hover bordered>
                <tbody>
                  {d.announcements.length} ประกาศ
                  <tr>
                    {d.announcements.length !== 0 ? (
                      <td>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/student/courses/${
                            d.name.split(" ")[0]
                          }/announcements`}
                        >
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
                            // onClick={() => console.log(d)}
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
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <Card
                          style={{
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
