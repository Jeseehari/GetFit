import React, { useEffect, useState } from "react";
import axios from '../../axios/axiosInstance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import styles from "./Activities.module.css";


const ACTIVITIES_API = "/activities";

function Activities() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        const json = {
          email: email,
        };

        const response = await axios.post(`${ACTIVITIES_API}`, json);
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  const formatCharts = () => {
    const charts = [];
    if (data) {
      const weekActivities = [
        { name: "Threadmill", Threadmill: data.threadmillWeek, color: "#008080" },
        { name: "Cycling", Cycling: data.cyclingWeek, color: "#8884d8" },
        { name: "StairMach", StairMach: data.stairMachinesWeek, color: "#228B22" },
        { name: "WeightTraining", WeightTraining: data.weightTrainingWeek, color: "#8B008B" },
      ];

      const monthActivities = [
        { name: "Threadmill", Threadmill: data.threadmillMonth, color: "#008080" },
        { name: "Cycling", Cycling: data.cyclingMonth, color: "#8884d8" },
        { name: "StairMach", StairMach: data.stairMachinesMonth, color: "#228B22" },
        { name: "WeightTraining", WeightTraining: data.weightTrainingMonth, color: "#8B008B" },
      ];

      const ninetyDaysActivities = [
        { name: "Threadmill", Threadmill: data.threadmillNinetyDays, color: "#008080" },
        { name: "Cycling", Cycling: data.cyclingNinetyDays, color: "#8884d8" },
        { name: "StairMach", StairMach: data.stairMachinesNinetyDays, color: "#228B22" },
        { name: "WeightTraining", WeightTraining: data.weightTrainingNinetyDays, color: "#8B008B" },
      ];

      charts.push(
        <div key="week" className={styles.chartsContainer}>
          <h2>Last Week</h2>
          <CustomBarChart activities={weekActivities} />
        </div>
      );

      charts.push(
        <div key="month" className={styles.chartsContainer}>
          <h2>Last Month</h2>
          <CustomBarChart activities={monthActivities} />
        </div>
      );

      charts.push(
        <div key="90days" className={styles.chartsContainer}>
          <h2>Last 90 Days</h2>
          <CustomBarChart activities={ninetyDaysActivities} />
        </div>
      );
    }
    return charts;
  };

  // return <div className={styles.container}>{formatCharts()}</div>;
    return (
      <div className={styles.pagecontainer}>
       
       <div>{formatCharts()}</div>
       </div>
       
       );
     
    
}

function CustomBarChart(props) {
  const activities = props.activities;

  return (
    
    <div className={styles.container}>
      <BarChart width={500} height={300} data={activities}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Bar dataKey={activities[0].name} fill={activities[0].color} />
        <Bar dataKey={activities[1].name} fill={activities[1].color} />
        <Bar dataKey={activities[2].name} fill={activities[2].color} />
        <Bar dataKey={activities[3].name} fill={activities[3].color} />
      </BarChart>
    </div>
    
  );
}



export default Activities;













