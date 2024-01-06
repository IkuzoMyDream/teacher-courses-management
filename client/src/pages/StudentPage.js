import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import useLocalState from "../useLocalStorage";
import CoursesList from "../components/courses-list";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

function StudentPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DataProvider>
      <Spin spinning={isLoading}>
        <StudentNavbar></StudentNavbar>
        <CoursesList></CoursesList>
      </Spin>
    </DataProvider>
  );
}

export default StudentPage;
