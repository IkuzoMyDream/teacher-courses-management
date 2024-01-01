import axios from "axios";
import { useState, useEffect } from "react";
import AnnouncementsList from "../components/AnnouncementsList";
import useLocalState from "../useLocalStorage";
import { Button, Container, Nav, Navbar, Image, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

const URL_MY_COURSE = "/api/users/me?populate[courses][populate]=announcement";

function StudentPage() {
  const [myCourse, setMyCourse] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    fetchItems();
  }, []);

  // useEffect(() => {}, [myCourse]);

  return (
    <div>
      <Spin spinning={isLoading}>
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
        <Container>
          <AnnouncementsList data={myCourse}></AnnouncementsList>
        </Container>
      </Spin>
      
    </div>
  );
}

export default StudentPage;
