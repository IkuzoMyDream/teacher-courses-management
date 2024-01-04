import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import useLocalState from "../useLocalStorage";
import CoursesList from "../components/courses-list";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

function StudentPage() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
