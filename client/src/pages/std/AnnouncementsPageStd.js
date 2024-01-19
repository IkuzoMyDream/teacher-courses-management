import AnnouncementsList from "../../components/std/announcements-list";
import { DataProvider } from "../../utils/context";
import StudentNavbar from "../../components/std/student-navbar";

function AnnouncementsPageStd() {
  return (
    <DataProvider>
      <StudentNavbar></StudentNavbar>
      <AnnouncementsList></AnnouncementsList>;
    </DataProvider>
  );
}

export default AnnouncementsPageStd;
