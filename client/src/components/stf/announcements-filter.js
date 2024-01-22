
import React, { useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

export default function AnnouncementsFilter({
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  setSearch,
}) {
  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href=""
                  onClick={() => setFilter("ประกาศของฉัน")}
                >
                  ประกาศของฉัน
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href=""
                  onClick={() => setFilter("ประกาศทั้งหมด")}
                >
                  ประกาศทั้งหมด
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Form>
              <InputGroup>
                <Form.Control
                  placeholder="ค้นหาประกาศ"
                  onChange={(e) => setSearch(e.target.value)}
                ></Form.Control>
              </InputGroup>
            </Form>
          </Col>
          <Col className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {filterSort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href=""
                  onClick={() => setFilterSort("ประกาศล่าสุด")}
                >
                  ประกาศล่าสุด
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href=""
                  onClick={() => setFilterSort("เผยแพร่ประกาศ")}
                >
                  เผยแพร่ประกาศ
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </>
  );
}
