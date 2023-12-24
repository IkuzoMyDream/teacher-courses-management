import axios from "axios";
import { useState, useEffect } from "react";
import AnnouncementsList from "./components/AnnouncementsList";
import axiosConfig from "./axios-interceptor";
import useLocalState from "./useLocalStorage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

const URL_MY_COURSE = "/api/users/me?populate[courses][populate]=announcement";

function StudentPage() {
  const [myCourse, setMyCourse] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_MY_COURSE);
      setMyCourse(response.data.courses);
    } catch (err) {
      console.log(err);
      window.localStorage.removeItem("jwt");
      axios.defaults.headers.common = {
        Authorization: ``,
      };
      navigate("/");
    } finally {
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

  useEffect(() => {
    // console.log(myCourse);
  }, [myCourse]);

  return (
    <div className="container">
      <AnnouncementsList data={myCourse}></AnnouncementsList>
      <Button onClick={handleLogout}>Logout </Button>
    </div>
  );
}

export default StudentPage;
