import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useDataContext } from "../utils/context";

export default function AnnouncementsList() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const myData = useDataContext();
  console.log(myData);

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("jwt");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
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

  const currTime = new Date().getTime();

  return (
    <Navbar style={{ backgroundColor: "#C3E2C2" }}>
      <Container>
        <Button variant="secondary">
          {" "}
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
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
        <Nav.Item>
          <h1>ระบบประกาศคะแนนนักศึกษา</h1>
        </Nav.Item>
        <Button onClick={handleLogout} variant="danger">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
