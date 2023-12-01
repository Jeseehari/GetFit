// DateSelector.js

import React, { useState } from 'react';
import axios from '../../axios/axiosInstance';

const DateSelector = ({ onSchedulesFetched }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFetchSchedules = async () => {
    try {
      const response = await axios.get(`/datebasedschedules/${selectedDate}`);
      onSchedulesFetched(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching class schedules:', error);
    }
  };

  return (
    <div>
      <label htmlFor="date">Select a date:</label>
      <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
      <button onClick={handleFetchSchedules}>Fetch Schedules</button>
    </div>
  );
};

export default DateSelector;
