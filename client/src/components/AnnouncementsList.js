import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AnnouncementsList(props) {
  // console.log(props);

  const [hoveredCard, setHoveredCard] = useState(null);

  if (props.data) {
    return (
      <div>
        {props.data.map((d) => (
          <Link
            to={`/student/announcements/${d.announcement.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              key={d.id}
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
              <Card.Body>{d.announcement.publish_datetime}</Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return null; // Handle the case where props.data is not available
}
