import axios from "axios";
import { useState, useEffect } from "react";
import AnnouncementsList from "./components/AnnouncementsList";
import axiosConfig from "./axios-interceptor";
import useLocalState from "./useLocalStorage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

const URL_ANNMENTS = "/api/announcements";

function StudentPage() {
  const [annmData, setAnnmData] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const fetchItems = async () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    };
    try {
      const response = await axios.get(URL_ANNMENTS + "?populate=*");
      console.log(response);
      setAnnmData(
        response.data.data.map((d) => {
          return {
            id: d.id,
            key: d.id,
            title: d.attributes.title,
            description: d.attributes.description,
            publish_datetime: d.attributes.publish_datetime,
            course: d.attributes.course,
            // ...d.attributes,
          };
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      // console.log(annmData);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setJwt("");
    navigate("/");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <AnnouncementsList data={annmData}></AnnouncementsList>
      <Button onClick={handleLogout}>Logout </Button>
    </div>
  );
}

export default StudentPage;
