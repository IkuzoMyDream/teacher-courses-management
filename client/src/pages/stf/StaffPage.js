import { useState } from "react";
import CoursesFilter from "../../components/stf/courses-filter";
import CoursesList from "../../components/stf/courses-list";

function StaffPage() {
  const [search, setSearch] = useState("");
  return (
    <>
      <CoursesFilter setSearch={setSearch}></CoursesFilter>
      <CoursesList search={search}></CoursesList>;
    </>
  );
}

export default StaffPage;
