import React, { useEffect, useState } from "react";
import axios from '../../axios/axiosInstance';
import styles from "./HoursSpent.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const RECORDS_API = "/hoursspent";
const RECORDS_TIME_API = "/hoursspent/time";

function HoursSpentGraph() {
  const [chartData, setChartData] = useState(null);
  const [chartTimeData, setChartTimeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${RECORDS_API}`);
        setChartData(response.data);
      } catch (error) {
        setError("An error occurred while fetching data");
      }
      try {
        const response = await axios.get(`${RECORDS_TIME_API}`);
        setChartTimeData(response.data);
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  const formatData = () => {
    const data = [
      { label: 'Current Day Count', currentDayCount: chartData["currentDayCount"] },
      { label: 'Past 7 Days Count', past7DaysCount: chartData["past7DaysCount"] }
    ];

    return data;
  };

  const formatTimeData = () => {
    const data = [
      { label: 'Current Day Count', currentDayCount: chartTimeData["currentDayCount"] },
      { label: 'Past 7 Days Count', past7DaysCount: chartTimeData["past7DaysCount"] }
    ];

    return data;
  };

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        <h2>Number of Hours worked</h2>
        {error && <div className={styles.error}>{error}</div>}
        {chartData && <BarChart width={500} height={300} data={formatData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="currentDayCount" fill="#8884d8" />
          <Bar dataKey="past7DaysCount" fill="#008000" />
        </BarChart>}
      </div>

      <div className={styles.graph}>
        <h2>Number of Visitors</h2>
        {error && <div className={styles.error}>{error}</div>}
        {chartTimeData && <BarChart width={500} height={300} data={formatTimeData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="currentDayCount" fill="#8884d8" />
          <Bar dataKey="past7DaysCount" fill="#008000" />
        </BarChart>}
      </div>
    </div>
  );
}

export default HoursSpentGraph;
