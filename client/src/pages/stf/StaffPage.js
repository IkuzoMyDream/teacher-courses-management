import { DataProviderStf } from "../../utils/stf-context";
import StaffNavbar from "../../components/stf/staff-navbar";
import CoursesList from "../../components/stf/courses-list";
import StaffPath from "../../components/stf/staff-path";

function StaffPage() {
  return (
    <DataProviderStf>
      <StaffNavbar></StaffNavbar>
      {/* <StaffPath></StaffPath> */}
      <CoursesList></CoursesList>
    </DataProviderStf>
  );
}

export default StaffPage;
