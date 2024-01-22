import { useState } from "react";
import { Spin } from "antd";
import CoursesFilter from "../../components/stf/courses-filter";
import CoursesList from "../../components/stf/courses-list";

function StaffPage() {
  const [search, setSearch] = useState("");
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <CoursesFilter setSearch={setSearch}></CoursesFilter>
      <CoursesList search={search} setIsSpin={setIsSpin}></CoursesList>;
    </Spin>
  );
}

export default StaffPage;
