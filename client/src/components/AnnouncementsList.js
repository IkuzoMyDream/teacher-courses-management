import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AnnouncementsList(props) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [myEntry, setMyEntry] = useState({});

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

  useEffect(() => {
    console.log(myEntry);
  }, [myEntry]);

  if (props.courses && props.entries) {
    // console.log(props);
    return (
      <div>
        {props.courses.map((d) => (
          <div key={d.id}>
            {new Date(d.announcement.publish_datetime).getTime() > currTime ? (
              <Card
                className={`mb-3 ${hoveredCard === d.id ? "custom-hover" : ""}`}
                onMouseOver={() => setHoveredCard(d.id)}
                onMouseOut={() => setHoveredCard(null)}
                style={{
                  transition: "background-color 0.3s",
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
                to={{ pathname: `/student/announcements/${d.id}` }}
                state={{
                  entry: props.entries.find(
                    (entry) => entry.course.id === d.id
                  ),
                }}
                style={{ textDecoration: "none" }}
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
