import AnnouncementsList from "../components/announcements-list";
import { DataProvider } from "../utils/context";
import StudentNavbar from "../components/student-navbar";

function AnnouncementsPage() {
  return (
    <DataProvider>
      <StudentNavbar></StudentNavbar>
      <AnnouncementsList></AnnouncementsList>;
    </DataProvider>
  );
}

export default AnnouncementsPage;
