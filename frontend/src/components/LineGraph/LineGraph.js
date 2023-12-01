import React from "react";
import styles from "./LineGraph.module.css";

function LineGraph(props) {
  const activities = props.activities;

  const maxYValue = Math.max(...activities.map((activity) => Math.max(...activity.values)));

  const formatActivity = (activity, index) => {
    const yScale = (value) => ((maxYValue - value) / maxYValue) * 100;
    const points = activity.values
      .map((value, i) => `${i * 10},${yScale(value)}`)
      .join(" ");
    return (
      <g key={activity.name}>
        <polyline points={points} fill="none" stroke={activity.color} strokeWidth="3" />
        {activity.values.map((value, i) => (
          <circle key={i} cx={`${i * 10}%`} cy={`${yScale(value)}%`} r="3" fill={activity.color} />
        ))}
        <text x={`${(activity.values.length - 1) * 10}%`} y={`${yScale(activity.values[activity.values.length - 1]) - 3}%`} textAnchor="end" dominantBaseline="text-bottom" className={styles.label}>
          {activity.name}
        </text>
      </g>
    );
  };

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100" className={styles.chart}>
        <line x1="0" x2="100" y1="100" y2="100" stroke="black" strokeWidth="2" />
        <line x1="0" x2="0" y1="0" y2="100" stroke="black" strokeWidth="2" />
        {activities.map((activity) => ({
          ...activity,
          values: activity.values.map((value) => parseFloat(value)),
        })).map(formatActivity)}
      </svg>
    </div>
  );
}

export default LineGraph;
