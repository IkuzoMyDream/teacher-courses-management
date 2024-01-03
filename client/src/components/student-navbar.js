import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("jwt");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    navigate("/");
  };

  return (
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
  );
}
