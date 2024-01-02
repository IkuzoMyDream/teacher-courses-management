import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, Navbar, Nav, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useLocalState from "../useLocalStorage";
import { Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function EntryPage() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const [myEntry, setMyEntry] = useState({});
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      setMyEntry(state.entry);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
      let response = await axios.put(`/api/entries/${myEntry.id}/ackCheck`);
      console.log(response);

      fetchItem();
      navigate("/");
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
    console.log(myEntry);
  }, [myEntry]);

  if (myEntry.course) {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#C3E2C2" }}>
          <Container>
            <Button
              variant="secondary"
              onClick={() => navigate("/student/announcements")}
            >
              {" "}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M18.5 4.14l1 1.72L8.97 12l10.53 6.14-1 1.72L5 12l13.5-7.86z" />
              </svg>
              Back
            </Button>
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
              <td>{myEntry.course.course_name}</td>
              <td>{myEntry.score}</td>
              <td>{myEntry.feedback}</td>
              {!myEntry.ack_datetime ? (
                <td>
                  <Button onClick={ackCheck}>ack</Button>
                </td>
              ) : (
                <td>"ack time = {formatDate(myEntry.ack_datetime)}"</td>
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
