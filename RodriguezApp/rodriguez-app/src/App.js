import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import { FlightPage } from './FlightPage';
import Home from './Home';
import { PassengerPage } from './PassengerPage';


function App() {
  return (
    
      

      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passenger" element={<PassengerPage />} />
          <Route path="/flight" element={<FlightPage />} />

        </Routes>
      </BrowserRouter>

    



  );
}

export default App;
