import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

import { AuthProvider } from "./components/AuthContext/AuthContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AboutGym from "./components/AboutGym/AboutGym";
import BookedClass from "./components/BookedClass/BookedClass";
import LogHours from "./components/LogHours/LogHours";
import Activities from "./components/Activities/Activities";
import Enroll from "./components/Enroll/Enroll";
import FreeTrial from "./components/FreeTrial/FreeTrial";
import CancelFreeTrial from "./components/CancelFreeTrial/CancelFreeTrial";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ClassSchedule from "./components/ClassSchedule/ClassSchedule";
import ScheduledClass from "./components/ScheduledClass/ScheduledClass";
import CheckIn from "./components/CheckIn/CheckIn";
import CheckOut from "./components/CheckOut/CheckOut";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import HoursSpent from "./components/HoursSpent/HoursSpent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<AboutGym />} />
          <Route path="/about" element={<AboutGym />} />
          <Route path="/classschedule" element={<ClassSchedule />} />
          <Route path="/booked" element={<BookedClass />} />
          <Route path="/log" element={<LogHours />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/freetrial" element={<FreeTrial />} />
          <Route path="/cancelfreetrial" element={<CancelFreeTrial />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/scheduledclass" element={<ScheduledClass />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/hoursspent" element={<HoursSpent />} />
          
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
