import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataContextStd } from "../../utils/std-context";
import { Spin } from "antd";

export default function AnnouncementsList({ filterSort, search, setIsSpin }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const myData = useDataContextStd();
  const { courseName } = useParams();
  const currTime = new Date().getTime();

  const formatDate = (datetime) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(datetime));
  };

  if (myData) {
    let announcements = myData.courses.find(
      (course) => course.name.split(" ")[0] === courseName
    ).announcements;

    if (filterSort === "ประกาศล่าสุด") {
      announcements = announcements.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else {
      announcements = announcements.filter(
        (d) => currTime - new Date(d.publish_datetime).getTime() <= 0
      );
      announcements = announcements.sort(
        (a, b) =>
          new Date(a.publish_datetime).getTime() -
          new Date(b.publish_datetime).getTime()
      );
    }

    if (announcements.length !== 0) {
      setIsSpin(false);
      return (
        <Container>
          {announcements
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((d) => {
              return currTime - new Date(d.publish_datetime).getTime() >= 0 ? (
                <Link
                  key={d.id}
                  style={{ textDecoration: "none" }}
                  to={`/student/courses/${courseName}/${d.title}?id=${d.id}`}
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
                    <Card.Header>
                      <Card.Title as="h1">{d.title}</Card.Title>
                      <Card.Subtitle>{d.description}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        นักศึกษาสามารถเข้าดูได้เมื่อ{" "}
                        {formatDate(d.publish_datetime)}
                      </Card.Text>
                      <Card.Text>
                        วันที่สร้างประกาศ{" "}
                        {formatDate(d.publishedAt).split(",")[0]}
                      </Card.Text>
                      <Card.Text>ผู้ประกาศ {d.announcer.username}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ) : (
                <Card
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
                  <Card.Header>
                    <Card.Title as="h1">{d.title}</Card.Title>
                    <Card.Subtitle>{d.description}</Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      นักศึกษาสามารถเข้าดูได้เมื่อ{" "}
                      {formatDate(d.publish_datetime)}
                    </Card.Text>
                    <Card.Text>
                      วันที่สร้างประกาศ{" "}
                      {formatDate(d.publishedAt).split(",")[0]}
                    </Card.Text>
                    <Card.Text>ผู้ประกาศ {d.announcer.username}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </Container>
      );
    } else {
      setIsSpin(false);
      return (
        <Container>
          <h1 className="text-center">ไม่มีประกาศ</h1>
        </Container>
      );
    }
  }
}
