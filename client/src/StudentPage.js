import axios from "axios";
import { useState, useEffect } from "react";
import AnnouncementsList from "./components/AnnouncementsList";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

const URL_ANNMENTS = "/api/announcements";

function StudentPage() {
  const [annmData, setAnnmData] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_ANNMENTS);
      setAnnmData(response.data.data.map((d) => {
        return {
          id : d.id,
          key : d.id,
          ...d.attributes
        }
      }));
      // console.log(annmData)
    } catch (err) {
      console.log(err);
    } finally {
      // console.log(annmData);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (<AnnouncementsList data={annmData}></AnnouncementsList>);
}

export default StudentPage;
