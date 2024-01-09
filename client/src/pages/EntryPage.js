import EntryList from "../components/entry-list";
import OverallScores from "../components/overall-scores";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

function EntryPage() {
    return (
      <div>
        <DataProvider>
          <StudentNavbar></StudentNavbar>
          <EntryList></EntryList>
          <OverallScores></OverallScores>
        </DataProvider>
      </div>
    );
}

export default EntryPage;
