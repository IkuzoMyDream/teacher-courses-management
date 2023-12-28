import axios from "axios";
import { useState, useEffect } from "react";
import AnnouncementsList from "../components/AnnouncementsList";
import useLocalState from "../useLocalStorage";
import { Button, Container, Nav, Navbar, Image, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

const URL_MY_COURSE = "/api/users/me?populate[courses][populate]=announcement";

function StudentPage() {
  const [myCourse, setMyCourse] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_MY_COURSE);
      setMyCourse(response.data.courses);
    } catch (err) {
      console.log(err);
      window.localStorage.removeItem("jwt");
      axios.defaults.headers.common = {
        Authorization: ``,
      };
      navigate("/");
    } finally {
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

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    fetchItems();
  }, []);

  useEffect(() => {}, [myCourse]);

  return (
    <div >
      <Navbar style={{ backgroundColor: "#C3E2C2" }}>
        <Container>
          <Navbar.Brand>
            <Image
              src="/PSU-Logo-01.png"
              alt="PSU Logo"
              fluid
              style={{ maxWidth: "100px" }}
            />
          </Navbar.Brand>
          <Navbar.Collapse>ระบบประกาศคะแนนนักศึกษา</Navbar.Collapse>
          <Button onClick={handleLogout} variant="outline-danger">
            Logout
          </Button>
        </Container>
      </Navbar>
      <AnnouncementsList data={myCourse}></AnnouncementsList>
    </div>
  );
}

export default StudentPage;
