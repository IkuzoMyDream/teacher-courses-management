import EntryList from "../../components/std/entry-list";
import OverallScores from "../../components/std/overall-scores";
import StudentNavbar from "../../components/std/student-navbar";
import { DataProvider } from "../../utils/context";

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
