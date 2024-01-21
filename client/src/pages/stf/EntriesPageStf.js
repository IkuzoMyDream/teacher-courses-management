import EntriesList from "../../components/stf/entries-list";
import AnnouncementEdit from "../../components/stf/announcement-edit";
import EntriesPost from "../../components/stf/entries-post";
import { Container, Dropdown } from "react-bootstrap";
import { useState } from "react";
import EntriesGraph from "../../components/stf/entries-graph";

function EntriesPageStf() {
  const [filterShow, setFilterShow] = useState("ตาราง");
  const [entries, setEntries] = useState([]);
  return (
    <>
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
        <EntriesList setEntries={setEntries}></EntriesList>
      ) : (
        <EntriesGraph entries={entries}></EntriesGraph>
      )}

      <EntriesPost></EntriesPost>
    </>
  );
}

export default EntriesPageStf;
