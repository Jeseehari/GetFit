import React, { useState, useEffect } from "react";
import axios from '../../axios/axiosInstance';

import styles from "./AboutGym.module.css"; // import CSS module

import Dropdown from "../Dropdown/Dropdown";


const ABOUT_GYM_API = "/aboutgym";

function AboutGym() {
  const [gymData, setGymData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleNext = (value) => {
    setSelectedOption(value);
    
  };

  const cities = [
    { value: "San Jose", label: "San Jose" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Los Angeles", label: "Los Angeles" },
  ];

  useEffect(() => {
    if (selectedOption !== "") {
      axios
        .get(ABOUT_GYM_API + `/${selectedOption}`)
        .then((response) => {
          setGymData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedOption]);

  useEffect(() => {
    axios
      .get(ABOUT_GYM_API)
      .then((response) => {
        setGymData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.pagecontainer}>
    <h1>Get Fit</h1>
    <div className={styles.container}>
      <div  className={styles.para}>
        <p >
        Welcome to Get Fit, your ultimate fitness destination! Step into a world of motivation and transformation as we empower you to achieve your health and wellness goals. Our state-of-the-art facilities, experienced trainers, and diverse range of fitness programs make us the go-to gym for individuals of all fitness levels. From high-intensity workouts to rejuvenating yoga sessions and invigorating Zumba classes, we offer something for everyone. Join our vibrant community, where you'll find support, inspiration, and a positive atmosphere that will keep you motivated on your fitness journey. Get ready to unleash your potential, break barriers, and discover the incredible power of a fit and healthy lifestyle. It's time to Get Fit and embrace the best version of yourself!
        </p>
        </div>
    <div>
      <div className={styles.cardContainer1}>
        <div className={styles.card}>
          <Dropdown
            name="cities"
            label="Select city"
            options={cities}
            onNext={handleNext}
          />
        </div>
      </div>
    
      <div className={styles.gymDetailsContainer}>
        {gymData && gymData.info && (
          <div className={styles.cardContainer2}>
            <div className={styles.card}>
            <h2 className={styles.heading}>Gym Memberships</h2>
            <ul className={styles.list}>
              {gymData.info.memberships.map((membership) => (
                <li key={membership.type} className={styles.listItem}>
                  {membership.type}: {membership.price}
                </li>
              ))}
            </ul>
          </div>
          </div>
        )}
      
        {selectedOption && gymData && gymData.info && (
          <div className={styles.cardContainer3}>
            <div className={styles.card}>

            <h2 className={styles.heading}>Gym Locations and Schedule</h2>
            <ul className={styles.list}>
              {gymData.info.cities.map((city) => (
                <li key={city.city} className={styles.listItem}>
                  <h3 className={styles.subheading}>{city.city}</h3>
                  <ul className={styles.sublist}>
                    {city.intervals.map((interval) => (
                      <li
                        key={`${interval.date}-${interval.start}-${interval.end}`}
                        className={styles.sublistItem}
                      >
                        {interval.date} ({interval.start} - {interval.end})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          </div>
        )}
      </div>
      </div>
    </div>
    </div>
  );
}



export default AboutGym;






