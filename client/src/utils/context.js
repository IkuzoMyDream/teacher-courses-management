import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useLocalState from "../useLocalStorage";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [myData, setMyData] = useState(null);

  const fetchData = async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.get(
        "/api/users/me?populate[courses][populate][announcements][populate]=*&populate[entries][populate]=course"
      );
      setMyData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is running");
    fetchData();
  }, []);

  useEffect(() => {}, [myData]);

  return <DataContext.Provider value={myData}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
