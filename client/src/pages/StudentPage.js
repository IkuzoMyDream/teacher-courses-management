import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import useLocalState from "../useLocalStorage";
import CoursesList from "../components/courses-list";
import StudentNavbar from "../components/student-navbar";
import { DataProvider } from "../utils/context";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

//localhost:1337/api/users/me?populate[courses][populate][announcement][populate]=*&populate[entries][populate]=course

const URL_MY_COURSE =
  "/api/users/me?populate[courses][populate][announcements][populate]=*&populate[entries][populate]=course";

function StudentPage() {
  const [myCourses, setMyCourses] = useState([]);
  const [myEntries, setMyEntries] = useState([]);
  const [myData, setMydata] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_MY_COURSE);
      setMydata(response.data);
      setMyCourses(response.data.courses);
      setMyEntries(response.data.entries);
    } catch (err) {
      console.log(err);
      window.localStorage.removeItem("jwt");
      axios.defaults.headers.common = {
        Authorization: ``,
      };
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("jwt");
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    setJwt("a");
    navigate("/");
  };

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    fetchItems();
  }, []);

  return (
    <DataProvider>
      <Spin spinning={isLoading}>
        <StudentNavbar></StudentNavbar>
        <CoursesList data={myCourses}></CoursesList>
      </Spin>
    </DataProvider>
  );
}

export default StudentPage;
export const dataContext = createContext(null);
