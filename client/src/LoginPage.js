import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import axiosConfig from "./axios-interceptor";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);

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
      let result = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password: password,
      });
      axiosConfig.jwt = result.data.jwt;
      result = await axios.get("http://localhost:1337/api/users/me?populate=role");

      if (result.data.role) {
        if (result.data.role.name === "Student") {
          console.log("Student");
        } else if (result.data.role.name == "Staff") {
          console.log("Staff");
        }
      }
    } catch (e) {
      setSubmitEnabled(true);
      console.log(e);
    }
  };

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
      {/* <Form.Group className="mb-3" controlId="">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit" disabled={!submitEnabled}>
        Submit
      </Button>
    </Form>
  );
}
