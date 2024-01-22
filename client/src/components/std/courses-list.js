import { Card, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataContextStd } from "../../utils/std-context";
import { Spin } from "antd";

export default function CoursesList({ search, setIsSpin }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const myData = useDataContextStd();

  if (myData) {
    myData.courses.sort(
      (a, b) => b.announcements.length - a.announcements.length
    );
    setIsSpin(false);
    return (
      <Container>
        <div className="row">
          {myData.courses
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((d) => (
              <div className="col-md-6" key={d.id}>
                {d.announcements.length != 0 ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/student/courses/${d.name.split(" ")[0]}`}
                  >
                    <Card
                      className="mb-3"
                      onMouseOver={() => setHoveredCard(d.id)}
                      onMouseOut={() => setHoveredCard(null)}
                      style={{
                        transition: "background-color 0.3s",
                        backgroundColor:
                          hoveredCard === d.id
                            ? "rgba(0, 60, 113, 0.2)"
                            : "rgba(0, 60, 113, 0.05)",
                        cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{d.name.split(" ")[0]}</Card.Title>
                        <Card.Title>
                          {d.name.split(" ").slice(1).join(" ")}
                        </Card.Title>
                        <Card.Subtitle>section {d.section}</Card.Subtitle>
                        <Card.Text>
                          {d.credit} หน่วยกิต{" "}
                          {d.enrollment_type === "C" ? "Credit" : "Audit"}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                ) : (
                  <Card
                    className="mb-3"
                    style={{
                      transition: "background-color 0.3s",
                      backgroundColor: "rgba(0, 60, 113, 0.01)",
                      cursor: "not-allowed",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{d.name.split(" ")[0]}</Card.Title>
                      <Card.Title>
                        {d.name.split(" ").slice(1).join(" ")}
                      </Card.Title>
                      <Card.Subtitle>section {d.section}</Card.Subtitle>
                      <Card.Text>
                        {d.credit} หน่วยกิต{" "}
                        {d.enrollment_type === "C" ? "Credit" : "Audit"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </div>
            ))}
        </div>
      </Container>
    );
  } else {
    return <Spin></Spin>;
  }
}
