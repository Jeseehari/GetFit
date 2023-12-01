import React, { useState, useEffect  } from "react";
import axios from '../../axios/axiosInstance';
import styles from "./FreeTrial.module.css";


const FREE_TRIAL_API = "/free-trial";

function FreeTrial() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, "");
    setContactNumber(numericInput);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${FREE_TRIAL_API}`, {
        name,
        email,
        contactNumber,
      });
      console.log(response.data);
      setName("");
      setEmail("");
      setContactNumber("");
      setError(null);
      fetchMembers();
      alert("Free Trial added");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${FREE_TRIAL_API}`);
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []); // Fetch members only once when the component mounts


  return (
    <div className={styles.container}>
     <div className={styles.cardContainer}>
      <div className={styles.card1}>
        <h2>FreeTrial</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="tel" id="contactNumber" value={contactNumber} onChange={handleContactNumberChange}  pattern="[0-9]*" required />
          </div>
        
          <button type="submit" className={styles.button}>
            FreeTrial
          </button>
        </form>
      </div>
      <div className={styles.card2}>
        {members.length > 0 && (
        <div className={styles.memberList}>
          <h3>Free Trial Members:</h3>
          <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.contactNumber}</td>  
                </tr>
              ))}
              </tbody>
          </table>
        </div>
         )}
      </div>
    </div> 
    </div>
  );
}

export default FreeTrial;
