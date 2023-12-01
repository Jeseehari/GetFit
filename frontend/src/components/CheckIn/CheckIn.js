import React, { useState } from "react";
import styles from "./CheckIn.module.css";
import axios from '../../axios/axiosInstance';


const CHECK_IN_API = "/check-in";

function CheckIn() {
  const [checkIn, setCheckIn] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (email && checkIn) {
      const json = {
        email,
        checkin: new Date(checkIn).toLocaleString(),
        total: 1,
      };
      try {
        await axios.post(`${CHECK_IN_API}`, json);
        alert("Check in submitted successfully!");
        setCheckIn("");
        setEmail("");
      } catch (error) {
        alert("Error submitting check in!");
      }
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className={styles.pagecontainer}>
    <div className={styles.container}>
      <h1 className={styles.h1}>Check In</h1>
      <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="checkin">Check In:</label>
          <input
            type="datetime-local"
            id="checkin"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            max={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default CheckIn;
