import EntryList from "../components/entry-list";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

function EntryPage() {
    return (
      <div>
        <DataProvider>
          <StudentNavbar></StudentNavbar>
          <EntryList></EntryList>
        </DataProvider>
      </div>
    );
}

export default EntryPage;
