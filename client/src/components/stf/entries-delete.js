import { Button, Modal } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useDataContextStf } from "../../utils/stf-context";
import axios from "axios";
import { useState } from "react";

export default function EntriesDelete() {
  const myData = useDataContextStf();
  const { pathname } = useLocation();
  const { announcementId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const courseName = pathname.split("/")[3];
  const entries = myData?.courses
    .find((d) => d.name?.split(" ")[0] === courseName)
    .announcements.find((d) => d.id == announcementId)?.entries;

  const deleteEntries = async () => {
    try {
      await Promise.all(
        entries.map(async (d) => {
          await axios.delete(`/api/entries/${d.id}`);
        })
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting entries:", error.message);
    }
  };
  return (
    <>
      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
        ลบรายการคะแนน
      </Button>
      <Modal show={showDeleteModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>ท่านแน่ใจว่าต้องการลบรายการคะแนนใช่หรือไม่</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" type="button" onClick={deleteEntries}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
