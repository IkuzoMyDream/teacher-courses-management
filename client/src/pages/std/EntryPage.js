import EntryList from "../../components/std/entry-list";
import OverallScores from "../../components/std/overall-scores";
import StudentNavbar from "../../components/std/student-navbar";
import { DataProvider } from "../../utils/std-context";

function EntryPage() {
    return (
      <>
          <EntryList></EntryList>
          <OverallScores></OverallScores>
      </>
    );
}

export default EntryPage;
