import { useDataContextStf } from "../../utils/stf-context";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

export default function EntriesList({ setEntries }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const announcementId = searchParams.get("id");
  const { pathname } = useLocation();
  const myData = useDataContextStf();
  const courseName = pathname.split("/")[3];

  const formatDate = (datetime) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(datetime));
  };

  if (myData) {
    const entries = myData?.courses
      .find((d) => d.name?.split(" ")[0] == courseName)
      .announcements?.find((d) => d.id == announcementId)?.entries;
    setEntries(entries);

    if (entries.length !== 0) {
      return (
        <Container>
          <Table>
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>คะแนน</th>
                <th>สถานะ</th>
                <th>คอมเม้นต์</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((d) => (
                <tr key={d.id}>
                  <td>{d.owner.username}</td>
                  <td>{d.score}</td>
                  <td>
                    {d.ack_datetime
                      ? `ยืนยันแล้วเมื่อ ${formatDate(d.ack_datetime)}`
                      : "ยังไม่ยืนยัน"}{" "}
                  </td>
                  <td>{d.feedback} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      return (
        <Container>
          <h1 className="text-center">ไม่มีรายการคะแนน</h1>
        </Container>
      );
    }
  }
}
