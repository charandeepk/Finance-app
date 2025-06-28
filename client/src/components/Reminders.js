import { useEffect, useState } from 'react';
import './Reminders.css';

function Reminders() {
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('https://finance-backend-prgf.onrender.com');
        const data = await res.json();

        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const next30Days = new Date();
        next30Days.setDate(now.getDate() + 30);

        const filtered = data.filter(client => {
          const loanDate = new Date(client.startDate);
          return loanDate < next30Days;
        });

        const sorted = filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        setDeadlines(sorted);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="reminders-container">
      <h2>Upcoming Deadlines (Next 30 Days & Overdue)</h2>

      <div className="deadline-list">
        {deadlines.map((client) => {
          const loanDate = new Date(client.startDate);
          const now = new Date();
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(now.getFullYear() - 1);

          const cardClass = loanDate < oneYearAgo ? 'deadline-card overdue' : 'deadline-card due-soon';

          return (
            <div key={client._id} className={cardClass}>
              <h3>{client.name}</h3>
              <p>Amount: ₹{client.amount}</p>
              <p>Start Date: {client.startDate.slice(0, 10)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reminders;