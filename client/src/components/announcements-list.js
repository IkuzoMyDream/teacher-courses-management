import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import { useDataContext } from "../utils/context";
import { Spin } from "antd";

export default function AnnouncementsList() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const myData = useDataContext();
  const { courseName } = useParams();

  const formatDate = (datetime) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(datetime));
  };

  const currTime = new Date().getTime();

  if (myData) {
    const findCourse = myData.courses.find(
      (course) => course.name.split(" ")[0] === courseName
    );
    const announcements = findCourse.announcements;
    console.log(announcements);
    return (
      <Container>
        {announcements.map((d) => (
          <Link
            key={d.id}
            style={{ textDecoration: "none" }}
            to={`/student/courses/${courseName}/announcements/${d.id}/entry`}
          >
            <Card
              className={`text-center mb-3 ${hoveredCard === d.id ? "custom-hover" : ""}`}
              onMouseOver={() => setHoveredCard(d.id)}
              onMouseOut={() => setHoveredCard(null)}
              style={{
                transition: "background-color 0.3s",
                backgroundColor: hoveredCard === d.id ? "#c4fcf8" : "#f8fcfc",
                cursor: "pointer",
              }}
            >
              <Card.Body>
                <Card.Title as="h1">{d.title}</Card.Title>
                <Card.Subtitle>{d.description}</Card.Subtitle>
                <Card.Text>{formatDate(d.publish_datetime)}</Card.Text>
                <Card.Text>{d.announcer.username}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </Container>
    );
  } else {
    return <Spin></Spin>;
  }
}
