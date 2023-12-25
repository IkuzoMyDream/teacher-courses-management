import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EntryPage() {
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState({});

  const fetchItem = async () => {
    try {
      let response = await axios.get(
        `/api/announcements?filters[id][$eq]=${announcementId}&populate=*`
      );

      response = response.data.data[0].attributes;

      // console.log(response.course.data.attributes.course_name);
      setAnnouncement({
        course: response.course.data.attributes,
        entry: response.entries.data[0].attributes,
        announcer: response.announcer.data.attributes,
      });
    } catch (err) {
      console.log(err);
    } finally {
      // console.log(announcement);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  useEffect(() => {
    console.log(announcement.course);
  }, [announcement]);

  if (announcement.course) {
    return (
      <div>
        <h1>{announcement.course.course_name}</h1>
        <h2>{announcement.entry.score}</h2>
      </div>
    );
  } else {
    return <h1>wait</h1>;
  }
}

export default EntryPage;
