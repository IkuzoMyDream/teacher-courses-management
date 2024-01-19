import StaffNavbar from "../../components/stf/staff-navbar";
import CoursesList from "../../components/stf/courses-list";
// import { DataProvider } from "../../utils/context";
import { DataProviderStf } from "../../utils/stf-context";

function StaffPage() {
  return (
    <DataProviderStf>
      <StaffNavbar></StaffNavbar>
      <CoursesList></CoursesList>
    </DataProviderStf>
  );
}

export default StaffPage;
