import { Link, NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";
// import logoImage from "/public/logo.png"; // Import the logo image
import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";

function NavigationBar() {
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const email = localStorage.getItem("email");
  const isAdmin = email === "admin@gmail.com";
  const { isLoggedIn } = useAuth();

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div className={styles.linksContainer}>
        {isLoggedIn ? (
          isAdmin ? (
            // Admin navigation links
            


            
            <>
            
              {/* <Link to="/about" className={styles.link}>Home</Link> */}
              <Link to="/about" className={styles.link}>About Get Fit</Link>
              <div className={styles.dropdown}>
              <button className={styles.dropbtn}>Admin</button>
              <div className={styles.dropdownContent}>
                <Link to="/classschedule" className={styles.link}>Create a Class</Link>
                <Link to="/enroll" className={styles.link}>Enroll New Member</Link>
                <Link to="/freetrial" className={styles.link}>Activate Free Trial</Link>
                <Link to="/cancelfreetrial" className={styles.link}>Cancel Free Trial</Link>
                <Link to="/checkin" className={styles.link}>CheckIn</Link>
                <Link to="/checkout" className={styles.link}>CheckOut</Link>
              </div>
              </div>
              <div className={styles.dropdown}>
              <button className={styles.dropbtn}>Dashboard</button>
              <div className={styles.dropdownContent}>
                <Link to="/adminpanel" className={styles.link}>Classes</Link>
                <Link to="/hoursspent" className={styles.link}>Analytics</Link>
              </div>
              </div>
              
               <Link to="/logout" className={styles.link}>Logout</Link>
            </>
          ) : (
            // User navigation links
            <>
              
              <Link to="/about" className={styles.link}>About Get Fit</Link>
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>User</button>
                <div className={styles.dropdownContent}>
                  <Link to="/scheduledclass" className={styles.link}>Book Class</Link>
                  <Link to="/booked" className={styles.link}>Scheduled Classes</Link> 
                  <Link to="/log" className={styles.link}>Log Hours</Link>
                  <Link to="/activities" className={styles.link}>Activities</Link>
                  <Link to="/logout" className={styles.link}>Logout</Link>
                </div>
              </div>
              
            </>
          )
        ) : (
          // Navigation links for non-logged-in users
          <>
            
            <Link to="/about" className={styles.link}>About Gym</Link>
            <Link to="/login" className={styles.link}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;









// import { Link, NavLink } from "react-router-dom";
// import styles from "./NavigationBar.module.css";

// import { useAuth } from "../AuthContext/AuthContext";

// function NavigationBar() {
//   const email = localStorage.getItem("email");
//   const isAdmin = email === "admin@gmail.com";
//   const { isLoggedIn } = useAuth();

//   return (
//     <nav className={styles.container}>
//       {isLoggedIn ? (
//         isAdmin ? (
//           // Admin navigation links
//           <>
//             <Link to="/" className={styles.link}>Home</Link>
//             <Link to="/about" className={styles.link}>About Gym</Link>
//             <Link to="/classschedule" className={styles.link}>Create a Class</Link>
//             <Link to="/enroll" className={styles.link}>Enroll New Member</Link>
//             <Link to="/checkinout" className={styles.link}>Check In/Out</Link>
//             <Link to="/freetrial" className={styles.link}>Activate Free Trial</Link>
//             <Link to="/cancelfreetrial" className={styles.link}>Cancel Free Trial</Link>
//             <Link to="/logout" className={styles.link}>Logout</Link>
//           </>
//         ) : (
//           // User navigation links
//           <>
//             <Link to="/" className={styles.link}>Home</Link>
//             <Link to="/about" className={styles.link}>About Gym</Link>
//             <Link to="/book" className={styles.link}>Book a Class</Link>
//             <Link to="/scheduledclass" className={styles.link}>Scheduled Classes</Link>
//             {/* <Link to="/classschedulelist" className={styles.link}>Class Schedule list</Link> */}
//             <Link to="/booked" className={styles.link}>Booked Classes</Link> 
//             <Link to="/log" className={styles.link}>Log Hours</Link>
//             <Link to="/activities" className={styles.link}>Activities</Link>
//             <Link to="/logout" className={styles.link}>Logout</Link>
            
//           </>
//         )
//       ) : (
//         // Navigation links for non-logged-in users
//         <>
//           <Link to="/" className={styles.link}>Home</Link>
//           <Link to="/about" className={styles.link}>About Gym</Link>
//           <Link to="/login" className={styles.link}>Login</Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default NavigationBar;
