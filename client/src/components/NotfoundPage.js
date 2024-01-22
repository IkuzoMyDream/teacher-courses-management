import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4">404 Not Found</h1>
          <p className="lead">The page you are looking for does not exist.</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="outline-secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
