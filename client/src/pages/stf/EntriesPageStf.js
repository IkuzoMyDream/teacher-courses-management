import EntriesList from "../../components/stf/entries-list";
import AnnouncementEdit from "../../components/stf/announcement-edit";
import EntriesPost from "../../components/stf/entries-post";
import { Container, Dropdown } from "react-bootstrap";
import { useState } from "react";
import EntriesGraph from "../../components/stf/entries-graph";
import { Spin } from "antd";

function EntriesPageStf() {
  const [filterShow, setFilterShow] = useState("ตาราง");
  const [entries, setEntries] = useState([]);
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <AnnouncementEdit></AnnouncementEdit>
      <Container className="text-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {filterShow}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="" onClick={() => setFilterShow("ตาราง")}>
              ตาราง
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="" onClick={() => setFilterShow("กราฟ")}>
              กราฟ
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      {filterShow === "ตาราง" ? (
        <EntriesList
          setEntries={setEntries}
          setIsSpin={setIsSpin}
        ></EntriesList>
      ) : (
        <EntriesGraph entries={entries}></EntriesGraph>
      )}

      <EntriesPost></EntriesPost>
    </Spin>
  );
}

export default EntriesPageStf;
