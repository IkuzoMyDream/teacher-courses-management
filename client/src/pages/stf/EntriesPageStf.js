import EntriesList from "../../components/stf/entries-list";
import StaffNavbar from "../../components/stf/staff-navbar";
import { DataProviderStf } from "../../utils/stf-context";

function EntriesPageStf() {
  return (
    <div>
      <DataProviderStf>
        <StaffNavbar></StaffNavbar>
        <EntriesList></EntriesList>
      </DataProviderStf>
    </div>
  );
}

export default EntriesPageStf;
