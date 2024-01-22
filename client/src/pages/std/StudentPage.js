import { useState } from "react";
import { Spin } from "antd";
import CoursesList from "../../components/std/courses-list";
import CoursesFilter from "../../components/std/courses-filter";

function StudentPage() {
  const [search, setSearch] = useState("");
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <CoursesFilter setSearch={setSearch}></CoursesFilter>
      <CoursesList search={search} setIsSpin={setIsSpin}></CoursesList>
    </Spin>
  );
}

export default StudentPage;
