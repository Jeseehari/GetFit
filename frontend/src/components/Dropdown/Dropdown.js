import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // import CSS module

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleNext = () => {
    props.onNext(selectedValue);
  };

  return (
    <div>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <select id={props.name} name={props.name} className={styles.select} onChange={handleSelect}>
        <option value="">--Please choose an option--</option>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button className={styles.button} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Dropdown;
