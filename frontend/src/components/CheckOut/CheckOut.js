import React, { useState } from "react";
import styles from "./CheckOut.module.css";
import axios from '../../axios/axiosInstance';


const CHECK_OUT_API = "/check-out";

function CheckOut() {
  const [checkOut, setCheckOut] = useState("");
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (email && checkOut) {
      const json = {
        email,
        checkout: new Date(checkOut).toLocaleString(),
      };
      try {
        await axios.post(`${CHECK_OUT_API}`, json);
        alert("Check out submitted successfully!");
        setCheckOut("");
        setEmail("");
      } catch (error) {
        alert("Error submitting check out!");
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
      <h1 className={styles.h1}>Check Out</h1>
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
          <label htmlFor="checkout">Check Out:</label>
          <input
            type="datetime-local"
            id="checkout"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            max={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
    </div>
  );
}

export default CheckOut;
