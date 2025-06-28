import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Calculator from './components/Calculator';
import Clients from './components/Clients';
import Home from './components/Home';
import Reminders from './components/Reminders';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/reminders">Reminders</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/reminders" element={<Reminders />} />
      </Routes>
    </Router>
  );
}

export default App;