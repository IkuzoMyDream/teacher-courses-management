import { useParams } from "react-router-dom";
import { useDataContext } from "../../utils/std-context";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import useLocalState from "../../utils/useLocalStorage";
import { Spin } from "antd";

export default function OverallScores() {
  const myData = useDataContext();
  const [auth, setAuth] = useLocalState(null, "auth");
  const { announcementId } = useParams();
  const [overallScores, setOverallScores] = useState([0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5]);

  const fetchData = async () => {
    axios.defaults.baseURL =
      process.env.REACT_APP_BASE_URL || "http://localhost:1337";
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${auth.jwt}`,
      };
      let response = await axios.get(
        `/api/announcements?filters[id][$eq]=${announcementId}&populate=entries`
      );
      const full_score = response.data.data[0].attributes.full_score;

      setLabels(
        labels.map(
          (n) => `${((n - 1) * full_score) / 5} - ${(n * full_score) / 5}`
        )
      );

      response = response.data.data[0].attributes.entries.data;
      const scores = response.map((d) => d.attributes.score);
      const bins = [0, 0, 0, 0, 0];
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            scores[i] >= (j * full_score) / 5 &&
            scores[i] <= ((j + 1) * full_score) / 5
          ) {
            bins[j]++;
            break;
          }
        }
      }
      setOverallScores(bins);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(overallScores);
  }, [overallScores]);

  useEffect(() => {
    // console.log(labels);
  }, [labels]);

  if (myData && overallScores && labels) {
    return (
      <Bar
        data={{
          labels: labels,
          datasets: [{ label: "Student", data: overallScores }],
        }}
      ></Bar>
    );
  } else {
    return <Spin></Spin>;
  }
}
