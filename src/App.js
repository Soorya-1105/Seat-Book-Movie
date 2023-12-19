import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginScreen from "./Components/Login/Login";
import SeatBooking from "./Components/SeatBooking/SeatBooking"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<LoginScreen />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/seat-booking" element={<SeatBooking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
