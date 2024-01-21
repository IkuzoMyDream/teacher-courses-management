import { useLocation, useSearchParams } from "react-router-dom";
import { useDataContextStf } from "../../utils/stf-context";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import useLocalState from "../../utils/useLocalStorage";
import { Container } from "react-bootstrap";

export default function EntriesGraph({ entries }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const announcementId = searchParams.get("id");
  const myData = useDataContextStf();
  const courseName = pathname.split("/")[3];
  const announcement = myData?.courses
    .find((d) => d.name?.split(" ")[0] == courseName)
    .announcements?.find((d) => d.id == announcementId);
  const maxScore = announcement?.full_score;

  const scores = entries?.map((d) => d.score);
  const labels = [1, 2, 3, 4, 5].map(
    (n) => `${((n - 1) * maxScore) / 5} - ${(n * maxScore) / 5}`
  );
  const bins = [0, 0, 0, 0, 0];
  for (let i = 0; i < scores.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (
        scores[i] >= (j * maxScore) / 5 &&
        scores[i] <= ((j + 1) * maxScore) / 5
      ) {
        bins[j]++;
        break;
      }
    }
  }

  if (scores && bins && labels) {
    return (
      <Container>
        <Bar
          data={{
            labels: labels,
            datasets: [{ label: "Student", data: bins }],
          }}
        ></Bar>
      </Container>
    );
  }
}
