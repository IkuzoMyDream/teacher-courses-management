import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AnnouncementsList(props) {
  const [hoveredCard, setHoveredCard] = useState(null);

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

  if (props.data) {
    return (
      <div>
        {props.data.map((d) => (
          <div key={d.id}>
            {new Date(d.announcement.publish_datetime).getTime() > currTime ? (
              <Card
                className={`mb-3 ${hoveredCard === d.id ? "custom-hover" : ""}`}
                onMouseOver={() => setHoveredCard(d.id)}
                onMouseOut={() => setHoveredCard(null)}
                style={{
                  transition: "background-color 0.3s",
                  // backgroundColor: hoveredCard === d.id ? "#596FB7" : "inherit",
                  cursor: "not-allowed",
                }}
              >
                <Card.Header>{d.course_name}</Card.Header>
                <Card.Body>
                  {formatDate(d.announcement.publish_datetime)}
                </Card.Body>
              </Card>
            ) : (
              <Link
                to={`/student/announcements/${d.announcement.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  className={`mb-3 ${hoveredCard === d.id ? "custom-hover" : ""}`}
                  onMouseOver={() => setHoveredCard(d.id)}
                  onMouseOut={() => setHoveredCard(null)}
                  style={{
                    transition: "background-color 0.3s",
                    backgroundColor: hoveredCard === d.id ? "#596FB7" : "inherit",
                    cursor: "pointer",
                  }}
                >
                  <Card.Header>{d.course_name}</Card.Header>
                  <Card.Body>
                    {formatDate(d.announcement.publish_datetime)}
                  </Card.Body>
                </Card>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
