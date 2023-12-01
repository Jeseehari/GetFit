
import React, { useState } from "react";
import axios from "axios";
import styles from "./ClassSchedule.module.css";

const ENROLL_API = "/class-schedule";

function ClassSchedule() {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);

  const handleTitleChange =(event) => {
    setTitle(event.target.value);
  }

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDateChange =(event) => {
    setDate(event.target.value);
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${ENROLL_API}`, {
        title,
        city,
        date,
        time,
      });
      console.log(response.data);
      setTitle("");
      setCity("");
      setDate("");
      setTime("");
      setError(null);
      alert("Class Creation Successful!!!");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Get the current date in the required format (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.container}>
    <div className={styles.container}>
      <div className={styles.card}>
      <h2>Schedule a Class</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Class Name:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
       
        <div className={styles.inputContainer}>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={city} onChange={handleCityChange} required />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Date">Date:</label>
          <input type="Date" id="date" value={date} onChange={handleDateChange} min={currentDate} required />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Time">Time:</label>
          <input type="Time" id="time" value={time} onChange={handleTimeChange} required />
        </div>
        <button type="submit" className={styles.button}>
          Create Class
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default ClassSchedule;









