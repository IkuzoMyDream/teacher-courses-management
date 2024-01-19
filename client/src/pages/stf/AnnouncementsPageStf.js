import StaffNavbar from "../../components/stf/staff-navbar";
import AnnouncementsList from "../../components/stf/announcements-list";
import { DataProviderStf } from "../../utils/stf-context";
import AnnouncementPost from "../../components/stf/announcement-post";

function AnnouncementsPageStf() {
  return (
    <DataProviderStf>
      <StaffNavbar></StaffNavbar>
      <AnnouncementPost></AnnouncementPost>
      <AnnouncementsList></AnnouncementsList>
    </DataProviderStf>
  );
}

export default AnnouncementsPageStf;
