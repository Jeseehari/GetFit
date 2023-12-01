import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ScheduledClass.module.css";

const SCHEDULED_CLASS_API = "/scheduled-class";
const INSERT_INDIVIDUAL_CLASS_API = '/booked-class';

function ScheduledClass() {
  const [scheduledClasses, setScheduledClasses] = useState([]);
  const [date, setDate] = useState("");

  const fetchData = async () => {
    if (date) {
      const json = {
        date: date
      };

      const response = await axios.post(`${SCHEDULED_CLASS_API}`, json);
      setScheduledClasses(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const insertIndividualClass = async (row) => {
    const booking = {
      "email": localStorage.getItem('email'),
      "title": row.title,
      "city": row.city,
      "time": row.time,
      "date": row.date
    };

    try {
      const response = await axios.post(`${INSERT_INDIVIDUAL_CLASS_API}`, booking);
      console.log(response.data);
      alert("Booking Successful!!!");
    } catch (error) {
      console.error(error);
    }
  };

  // Get the current date in the required format (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];


  return (
    <div className={styles.pagecontainer}>
    <div className={styles.container}>
      <h2>Scheduled Classes</h2>
      <label htmlFor="selectDate">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.dateInput}
        min={currentDate}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>City</th>
            <th>Time</th>
            <th></th> {/* Add an empty table header for the button */}
          </tr>
        </thead>
        <tbody>
          {scheduledClasses.map((scheduledClass) => (
            <tr key={scheduledClass.time}>
              <td>{scheduledClass.date}</td>
              <td>{scheduledClass.title}</td>
              <td>{scheduledClass.city}</td>
              <td>{scheduledClass.time}</td>
              <td>
          <button onClick={() => insertIndividualClass(scheduledClass)}>Book</button>
        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
  
}

export default ScheduledClass;
