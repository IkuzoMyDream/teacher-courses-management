import { Row, Container, Col, Form, InputGroup } from "react-bootstrap";

export default function CoursesFilter({ setSearch }) {
  return (
    <Container className="mb-3">
      <Row>
        <Col>
          <Form>
            <InputGroup>
              <Form.Control
                placeholder="ค้นหารายวิชา"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  e.keyCode === 13 && e.preventDefault();
                }}
              ></Form.Control>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
