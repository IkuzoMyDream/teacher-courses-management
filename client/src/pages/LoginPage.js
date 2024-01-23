import { useEffect, useState } from "react";
import useLocalState from "../utils/useLocalStorage";
import {
  Button,
  Form,
  Container,
  Nav,
  Image,
  Navbar,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [auth, setAuth] = useLocalState(null, "auth");

  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      // get JWT
      const result = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password: password,
      });
      setAuth({
        jwt: result.data.jwt,
        role: result.data.user.email[0].match(/\d/) ? "Student" : "Staff",
      });

      axios.defaults.headers.common = {
        Authorization: `Bearer ${result.data.jwt}`,
      };
    } catch (err) {
      console.log(err);
      setSubmitEnabled(true);
      setErrMsg(err.message);
    }
  };

  useEffect(() => {
    if (auth?.role === "Student") {
      navigate("/student/courses");
    } else if (auth?.role === "Staff") {
      navigate("/staff/courses");
    }
  }, [auth?.role]);

  return (
    <>
      <Navbar style={{ backgroundColor: "rgba(0, 60, 113, 0.5)" }}>
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
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center ">
        <Form onSubmit={handleSubmit} className="border p-4 rounded">
          {errMsg && (
            <Alert variant="danger">อีเมลหรือรหัสผ่านไม่ถูกต้อง</Alert>
          )}
          <h2 className="text-center mb-4">ระบบประกาศคะแนนนักศึกษา</h2>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>อีเมล</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>รหัสผ่าน</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!submitEnabled}
            block
          >
            เข้าสู่ระบบ
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LoginPage;
