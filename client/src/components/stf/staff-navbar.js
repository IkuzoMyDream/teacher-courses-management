import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import {
  useNavigate,
  useLocation,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { useDataContextStf } from "../../utils/stf-context";

export default function StaffNavbar() {
  const myData = useDataContextStf();
  const { pathname } = useLocation();
  const { announcementTitle } = useParams();
  const courseName = pathname.split("/")[3];
  const username = myData?.username;
  const navigate = useNavigate();

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
          <Nav.Item>
            <Nav.Item>
              <p style={{ color: "white", margin: 0, fontSize: "small" }}>
                {username}
              </p>
              <p style={{ color: "white", margin: 0, fontSize: "small" }}>
                (admin)
              </p>
            </Nav.Item>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </Nav.Item>
        </Container>
      </Navbar>
      <Container>
        {(() => {
          switch (pathname.split("/").length) {
            case 3:
              return <p>รายวิชา</p>;
            case 4:
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
            case 5:
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
                    to={`/staff/courses/${courseName}`}
                  >
                    {courseName}&nbsp;&nbsp;
                  </Link>
                  /&nbsp;&nbsp;{announcementTitle}
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
