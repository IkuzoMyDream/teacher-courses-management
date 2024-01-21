import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spin } from "antd";
import { useDataContextStf } from "../../utils/stf-context";

export default function AnnouncementsList({ filter, filterSort, search }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const myData = useDataContextStf();
  const { courseName } = useParams();
  const userId = myData?.id;

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

    if (filter === "ประกาศของฉัน") {
      announcements = announcements.filter((d) => d.announcer.id === userId);
    }

    if (filterSort === "ประกาศล่าสุด") {
      announcements = announcements.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    } else {
      announcements = announcements.sort(
        (a, b) => new Date(a.publish_datetime) - new Date(b.publish_datetime)
      );
    }

    if (announcements.length !== 0) {
      return (
        <Container>
          {announcements
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((d) => (
              <Link
                key={d.id}
                style={{ textDecoration: "none" }}
                to={`/staff/courses/${courseName}/${d.title}?id=${d.id}`}
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
                      วันที่สร้างประกาศ {formatDate(d.publishedAt).split(",")[0]}
                    </Card.Text>
                    <Card.Text>ผู้ประกาศ {d.announcer.username}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        </Container>
      );
    } else {
      return (
        <Container>
          <h1 className="text-center">ไม่มีประกาศ</h1>
        </Container>
      );
    }
  } else {
    return <Spin></Spin>;
  }
}
