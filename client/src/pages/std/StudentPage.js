import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import CoursesList from "../../components/std/courses-list";
import StudentNavbar from "../../components/std/student-navbar";
import { DataProvider } from "../../utils/context";

function StudentPage() {

  return (
    <DataProvider>
        <StudentNavbar></StudentNavbar>
        <CoursesList></CoursesList>
    </DataProvider>
  );
}

export default StudentPage;
  