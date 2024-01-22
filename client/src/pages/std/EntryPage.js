import EntryAnnouncement from "../../components/std/entry-announcement";
import EntryList from "../../components/std/entry-list";
import OverallScores from "../../components/std/overall-scores";
import { useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { Spin } from "antd";

function EntryPage() {
  const [filterShow, setFilterShow] = useState("คะแนนที่ได้");
  const [entries, setEntries] = useState([]);
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <EntryAnnouncement></EntryAnnouncement>
      <Container className="text-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {filterShow}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="" onClick={() => setFilterShow("คะแนนที่ได้")}>
              คะแนนที่ได้
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              href=""
              onClick={() => setFilterShow("คะแนนทั้งหมด (กราฟ)")}
            >
              คะแนนทั้งหมด (กราฟ)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      {filterShow === "คะแนนที่ได้" ? (
        <EntryList setIsSpin={setIsSpin}></EntryList>
      ) : (
        <OverallScores></OverallScores>
      )}
    </Spin>
  );
}

export default EntryPage;
