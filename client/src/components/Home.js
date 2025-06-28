import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Block 1: Clients */}
      <Link to="/clients" className="block client-block">
        <h2>Konanki Ramesh</h2>
        <p>View/Manage Clients</p>
      </Link>

      {/* Block 2: Calculator */}
      <Link to="/calculator" className="block calculator-block">
        <h2>Compound Interest Calculator</h2>
        <p>Calculate Interest</p>
      </Link>

      {/* Block 3: Reminders */}
      <Link to="/reminders" className="block reminder-block">
        <h2>Upcoming Deadlines</h2>
        <p>Next 30 Days</p>
      </Link>
    </div>
  );
}

export default Home;