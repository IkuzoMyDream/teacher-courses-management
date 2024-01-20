import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function StaffNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const courseName = pathname.split("/")[3];

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    navigate("/login");
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "rgba(0, 60, 113, 0.5)" }}>
        <Container>
          {pathname === "/staff/courses" ? (
            <></>
          ) : (
            <Button variant="secondary" onClick={() => navigate(-1)}>
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
            <h1 style={{ color: "white" }}>ระบบประกาศคะแนนนักศึกษา (Admin)</h1>
          </Nav.Item>
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container>
        {(() => {
          switch (pathname.split("/").length) {
            case 3:
              return <p>รายวิชา</p>;
            case 5:
              return (
                <p>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/staff/courses`}
                  >
                    รายวิชา
                  </Link>
                  &nbsp;&nbsp;/&nbsp;&nbsp;{courseName}
                </p>
              );
            case 7:
              return (
                <p>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/staff/courses`}
                  >
                    รายวิชา
                  </Link>
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/staff/courses/${courseName}/announcements`}
                  >
                    {courseName}&nbsp;&nbsp;
                  </Link>
                  /&nbsp;&nbsp;{state.announcementTitle}
                </p>
              );
            default:
              return null;
          }
        })()}
      </Container>
    </>
  );
}
