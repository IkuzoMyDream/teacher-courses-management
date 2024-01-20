import EntriesList from "../../components/stf/entries-list";
import StaffNavbar from "../../components/stf/staff-navbar";
import AnnouncementEdit from "../../components/stf/announcement-edit";
import { DataProviderStf } from "../../utils/stf-context";
import EntriesPost from "../../components/stf/entries-post";

function EntriesPageStf() {
  return (
    <div>
      <DataProviderStf>
        <StaffNavbar></StaffNavbar>
        <AnnouncementEdit></AnnouncementEdit>
        <EntriesPost></EntriesPost>
        <EntriesList></EntriesList>
      </DataProviderStf>
    </div>    
  );
}

export default EntriesPageStf;
