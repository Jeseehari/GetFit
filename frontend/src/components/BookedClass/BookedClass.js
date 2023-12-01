import React, { useState, useEffect } from "react";
import axios from '../../axios/axiosInstance';
import styles from "./BookedClass.module.css";


const BOOKED_CLASS_API = "/booked-class/fetch";

function BookedClass() {
  const [bookedClasses, setBookedClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        const json = {
          "email": email
        };

        const response = await axios.post(`${BOOKED_CLASS_API}`, json);
        setBookedClasses(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pagecontainer}>
    <div className={styles.container}>
      <h2>Your Schedule</h2>
      <div className={styles.list}>
  {bookedClasses.map((booking) => (
    <div key={booking.time} className={styles.item}>
      <div className={styles.title}>{booking.title}</div>
      <div className={styles.date}>{booking.date}</div>
      <div className={styles.location}>{booking.city}</div>
      <div className={styles.time}>{booking.time}</div>
    </div>
  ))}
</div>
    </div>
    </div>
  );
}

export default BookedClass;