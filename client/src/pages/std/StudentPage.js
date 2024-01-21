import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import CoursesList from "../../components/std/courses-list";
import StudentNavbar from "../../components/std/student-navbar";
import { DataProvider } from "../../utils/std-context";

function StudentPage() {
  return <CoursesList></CoursesList>;
}

export default StudentPage;
