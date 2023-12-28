import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
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

  const ackCheck = async () => {
    try {
      let response = await axios.put(
        `/api/entries/${announcement.entry.id}/ackCheck`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("yeah");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  useEffect(() => {
    console.log(announcement);
  }, [announcement]);

  if (announcement.course) {
    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <td>{announcement.course.course_name}</td>
              <td>{announcement.entry.score}</td>
              {!announcement.entry.ack_datetime ? (
                <td>
                  <Button onClick={() => ackCheck()}>ack</Button>
                </td>
              ) : (
                <td>{announcement.entry.ack_datetime}</td>
              )}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <h1>wait</h1>;
  }
}

export default EntryPage;
