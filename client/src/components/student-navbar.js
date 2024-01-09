import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("jwt");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    navigate("/login");
  };

  return (
    <Navbar style={{ backgroundColor: "#C3E2C2" }}>
      <Container>
        {pathname === "/student/courses" ? (
          console.log("home")
        ) : (
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
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
        )}
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
