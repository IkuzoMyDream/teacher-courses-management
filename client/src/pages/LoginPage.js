import { useEffect, useState } from "react";
import useLocalState from "../utils/useLocalStorage";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [auth, setAuth] = useLocalState(null, "auth");

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
    } catch (e) {
      setSubmitEnabled(true);
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth?.role === "Student") {
      navigate("/student/courses");
      // navigate(from, { replace: true });
    } else if (auth?.role === "Staff") {
      navigate("/staff");
      // navigate(from, { replace: true });
    }
  }, [auth?.role]);

  return (  
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!submitEnabled}>
        Submit
      </Button>
    </Form>
  );
}
