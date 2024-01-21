import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataContext } from "../../utils/std-context";
import { Spin } from "antd";

export default function AnnouncementsList() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const myData = useDataContext();
  const { courseName } = useParams();
  const currTime = new Date().getTime();

  const formatDate = (datetime) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(datetime));
  };

  if (myData) {
    const findCourse = myData.courses.find(
      (course) => course.name.split(" ")[0] === courseName
    );
    const announcements = findCourse.announcements;
    announcements.sort(
      (a, b) => new Date(a.publish_datetime) - new Date(b.publish_datetime)
    );

    return (
      <Container>
        {announcements.map((d) =>
          currTime - new Date(d.publish_datetime).getTime() >= 0 ? (
            <Link
              key={d.id}
              style={{ textDecoration: "none" }}
              to={`/student/courses/${courseName}/announcements/${d.id}/entry`}
            >
              <Card
                className={`text-center mb-3 ${
                  hoveredCard === d.id ? "custom-hover" : ""
                }`}
                onMouseOver={() => setHoveredCard(d.id)}
                onMouseOut={() => setHoveredCard(null)}
                style={{
                  transition: "background-color 0.3s",
                  backgroundColor:
                    hoveredCard === d.id
                      ? "rgba(0, 60, 113, 0.2)"
                      : "rgba(0, 60, 113, 0.05)",
                  cursor: "pointer",
                }}
              >
                <Card.Body>
                  <Card.Title as="h1">{d.title}</Card.Title>
                  <Card.Subtitle>{d.description}</Card.Subtitle>
                  <Card.Text>ผู้ประกาศ {d.announcer.username}</Card.Text>
                  <Card.Text>
                    สามารถเข้าดูได้เมื่อ {formatDate(d.publish_datetime)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ) : (
            <Card
              key={d.id}
              className={`text-center mb-3 ${
                hoveredCard === d.id ? "custom-hover" : ""
              }`}
              onMouseOver={() => setHoveredCard(d.id)}
              onMouseOut={() => setHoveredCard(null)}
              style={{
                transition: "background-color 0.3s",
                backgroundColor: "rgba(0, 60, 113, 0.01)",
                cursor: "not-allowed",
              }}
            >
              <Card.Body>
                <Card.Title as="h1">{d.title}</Card.Title>
                <Card.Subtitle>{d.description}</Card.Subtitle>
                <Card.Text>ผู้ประกาศ {d.announcer.username}</Card.Text>
                <Card.Text>
                  สามารถเข้าดูได้เมื่อ {formatDate(d.publish_datetime)}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        )}
      </Container>
    );
  } else {
    return <Spin></Spin>;
  }
}
