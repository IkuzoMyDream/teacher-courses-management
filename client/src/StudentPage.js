import axios from "axios";

export default function StudentPage() {
  const getDate = async () => {
    const result = await axios.get("http://localhost:1337/api/announcements");
    console.log(result);
  };
  getDate();
  return "hello Student";
}
