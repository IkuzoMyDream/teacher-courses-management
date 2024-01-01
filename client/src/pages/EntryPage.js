import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, Navbar, Nav, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useLocalState from "../useLocalStorage";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function EntryPage() {
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState({});
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {

      // error here!!!!
      let response = await axios.get(
        `/api/announcements?filters[id][$eq]=${announcementId}&populate=*`
      );

      response = response.data.data[0].attributes;
      console.log(response);

      setAnnouncement({
        course: response.course.data.attributes,
        entry: {
          score: response.entries.data[0].attributes.score,
          id: response.entries.data[0].id,
          ack_datetime: response.entries.data[0].attributes.ack_datetime,
          feedback: response.entries.data[0].attributes.feedback,
        },
        announcer: response.announcer.data.attributes,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      // console.log(announcement);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("jwt");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    setJwt("a");
    navigate("/");
  };

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

  const ackCheck = async (e) => {
    try {
      console.log(announcement);
      let response = await axios.put(
        `/api/entries/${announcement.entry.id}/ackCheck`
      );
      console.log(response);

      fetchItem();
    } catch (err) {
      console.log(err);
    } finally {
      console.log("yeah");
    }
  };

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    fetchItem();
  }, []);
  useEffect(() => {
    // console.log(announcement);
  }, [announcement]);

  if (announcement.course) {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#C3E2C2" }}>
          <Container>
            <Navbar.Brand>
              <Nav.Link href="https://www.psu.ac.th/" target="_blank">
                <Image
                  src="/PSU-Logo-01.png"
                  alt="PSU Logo"
                  fluid
                  style={{ maxWidth: "100px" }}
                />
              </Nav.Link>
            </Navbar.Brand>
            <h1>ระบบประกาศคะแนนนักศึกษา</h1>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </Container>
        </Navbar>
        <Table>
          <tbody>
            <tr>
              <td>{announcement.course.course_name}</td>
              <td>{announcement.entry.score}</td>
              <td>{announcement.entry.feedback}</td>
              {!announcement.entry.ack_datetime ? (
                <td>
                  <Button onClick={ackCheck}>ack</Button>
                </td>
              ) : (
                <td>
                  "ack time = {formatDate(announcement.entry.ack_datetime)}"
                </td>
              )}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <Spin spinning={isLoading}></Spin>;
  }
}

export default EntryPage;
