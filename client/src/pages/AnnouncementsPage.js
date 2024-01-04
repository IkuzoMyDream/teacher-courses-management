import AnnouncementsList from "../components/announcements-list";
import { DataProvider } from "../utils/context";


function AnnouncementsPage() {


  return (
    <DataProvider>
      <AnnouncementsList></AnnouncementsList>;
    </DataProvider>
  );
}

export default AnnouncementsPage;
