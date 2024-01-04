import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useLocalState from "../useLocalStorage";

const DataContext = createContext();
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export const DataProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [myData, setMyData] = useState(null);

  const fetchData = async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.get(
        "/api/users/me?populate[courses][populate][announcements][populate]=*&populate[entries][populate]=*"
      );
      setMyData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [myData]);

  return <DataContext.Provider value={myData}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
