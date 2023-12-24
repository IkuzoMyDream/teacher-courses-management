import { useState } from "react";
import { Card } from "react-bootstrap";

export default function AnnouncementsList(props) {
  console.log(props);

  const [hoveredCard, setHoveredCard] = useState(null);

  if (props.data) {
    return (
      <div>
        {props.data.map((d) => (
          <Card
            key={d.id}
            className={`mb-3 ${hoveredCard === d.id ? "custom-hover" : ""}`}
            borderless
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
        ))}
      </div>
    );
  }

  return null; // Handle the case where props.data is not available
}
