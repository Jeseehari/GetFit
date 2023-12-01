import React, { useEffect, useState } from "react";
import axios from '../../axios/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import styles from "./AdminPanel.module.css";


const DASHBOARD_API = "/admin-panel";

function AdminPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${DASHBOARD_API}`);
        const response = await axios.get(`${DASHBOARD_API}`);
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterDataByCurrentDate = () => {
    if (data) {
      const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
      const filteredData = data.filter((item) => item.date === currentDate);
      const newData = [{
        date: filteredData[0].date,
        classes: filteredData[0].classnum
      }];

      return newData;
    }
    return [];
  };

  const filterDataByFutureDates = () => {
    if (data) {
      const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
      const filteredData = data.filter((item) => item.date > currentDate);
      const modifiedData = filteredData.map(obj => {
        return { date: obj.date, classes: obj.classnum };
      });
      const sortedData = modifiedData.sort((a, b) => a.date.localeCompare(b.date));

      return sortedData;
    }
    return [];
  };

  const formatCharts = () => {
    const currentDayData = filterDataByCurrentDate();
    const futureDatesData = filterDataByFutureDates();
    if (currentDayData.length > 0) {
      return (
      
      <div className={styles.container}>
        <div className={styles.graph}>
          <h2>Current Day</h2>
          
          <BarChart width={500} height={300} data={currentDayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="classes" fill="#8884d8" />
          </BarChart>
        </div>
        <div className={styles.graph}>
            <h2>Future Dates Classes</h2>
            <BarChart width={500} height={300} data={futureDatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="classes" fill="#EEBF2F" />
            </BarChart>
          </div>
        
      </div>
      
      );
    } else {
      return <div>No data available for the current date....</div>;
    }
  };

  return <div className={styles.container}>
    
    {formatCharts()}</div>;
}

export default AdminPanel;
