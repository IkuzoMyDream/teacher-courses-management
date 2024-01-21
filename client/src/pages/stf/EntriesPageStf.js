import EntriesList from "../../components/stf/entries-list";
import AnnouncementEdit from "../../components/stf/announcement-edit";
import EntriesPost from "../../components/stf/entries-post";

function EntriesPageStf() {
  return (
    <>
      <AnnouncementEdit></AnnouncementEdit>
      <EntriesPost></EntriesPost>
      <EntriesList></EntriesList>
    </>
  );
}

export default EntriesPageStf;
