import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import useLocalState from "../useLocalStorage";
import CoursesList from "../components/courses-list";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

function StudentPage() {

  return (
    <DataProvider>
        <StudentNavbar></StudentNavbar>
        <CoursesList></CoursesList>
    </DataProvider>
  );
}

export default StudentPage;
  