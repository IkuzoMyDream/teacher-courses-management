import { useDataContextStf } from "../../utils/stf-context";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Table } from "react-bootstrap";

export default function EntriesList() {
  const { announcementId } = useParams();
  const myData = useDataContextStf();
  const { pathname } = useLocation();
  const courseName = pathname.split("/")[3];

  if (myData) {
    const entries = myData?.courses 
      .find((d) => d.name?.split(" ")[0] == courseName)
      .announcements?.find((d) => d.id == announcementId)?.entries;

    console.log(entries);
    return (
      <div>
        <Table>
          <tbody>
            {entries.map((d) => (
              <tr>
                <td>{d.owner.username}</td>
                <td>{d.score}</td>
                <td>{d.ack_datetime} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
