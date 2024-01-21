import { Modal, Button } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDataContextStf } from "../../utils/stf-context";

export default function AnnouncementDelete(props) {
  const myData = useDataContextStf();
  const { pathname } = useLocation();
  const courseName = pathname.split("/")[3];
  const { announcementId } = useParams();
  const [showDeleteModal1, setShowDeleteModal1] = useState(props.isOpen);
  const [showDeleteModal2, setShowDeleteModal2] = useState(false);
  const navigate = useNavigate();
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
    } catch (error) {
      console.error("Error deleting entries:", error.message);
    }
  };
  return (
    <>
      <Button
        disabled={props?.userId == props?.announcementOwnerId ? false : true}
        variant="danger"
        type="button"
        onClick={() => setShowDeleteModal1(true)}
      >
        ลบประกาศ
      </Button>
      <Modal show={showDeleteModal1} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            การลบประกาศจะทำให้ข้อมูลรายการคะแนนทั้งหมดหายตามไปด้วย
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal1(false)}
          >
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              setShowDeleteModal1(false);
              setShowDeleteModal2(true);
            }}
          >
            รับทราบ
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal2} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>ท่านแน่ใจว่าต้องการลบประกาศใช่หรือไม่</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal2(false)}
          >
            ยกเลิก
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              axios.delete(`/api/announcements/${announcementId}`);
              deleteEntries();
              navigate(-1);
            }}
          >
            ลบประกาศ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
