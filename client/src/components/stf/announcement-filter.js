// AnnouncementFilter.js

import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";

export default function AnnouncementFilter({
  filter,
  setFilter,
  filterSort,
  setFilterSort,
}) {
  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="" onClick={() => setFilter("ประกาศของฉัน")}>
                ประกาศของฉัน
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="" onClick={() => setFilter("ประกาศทั้งหมด")}>
                ประกาศทั้งหมด
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
  );
}
