import { useEffect, useState } from 'react';
import './Clients.css';

const API_BASE = process.env.REACT_APP_API_URL || 'https://finance-app-backend-h4ee.onrender.com';

function Clients() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [overdueClients, setOverdueClients] = useState([]);
  const [error, setError] = useState('');
  const [showTotal, setShowTotal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/clients`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setClients(data);
        setError('');
      } else {
        console.error('❌ Expected array, got:', data);
        setClients([]);
        setError('Server returned unexpected data.');
      }
    } catch (err) {
      console.error('❌ Error fetching clients:', err);
      setClients([]);
      setError('Failed to fetch clients. Please try again later.');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const overdue = clients.filter(client => {
      const loanDate = new Date(client.startDate);
      return !isNaN(loanDate) && loanDate < oneYearAgo;
    });
    setOverdueClients(overdue);
  }, [clients]);

  useEffect(() => {
    const total = clients.reduce((sum, client) => sum + Number(client.amount || 0), 0);
    setTotalAmount(total);
  }, [clients]);

  const addClient = async () => {
    if (name && amount && date) {
      try {
        const res = await fetch(`${API_BASE}/api/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, amount, startDate: date })
        });
        const newClient = await res.json();
        if (newClient && newClient._id) {
          setClients([...clients, newClient]);
          setName('');
          setAmount('');
          setDate('');
          setError('');
        } else {
          setError('Server error. Invalid client created.');
        }
      } catch (err) {
        console.error('❌ Error adding client:', err);
        setError('Could not add client. Please try again.');
      }
    }
  };

  const removeClient = async (id) => {
    try {
      await fetch(`${API_BASE}/api/clients/${id}`, { method: 'DELETE' });
      setClients(clients.filter(client => client._id !== id));
      setError('');
    } catch (err) {
      console.error('❌ Error deleting client:', err);
      setError('Could not delete client.');
    }
  };

  return (
    <div className="clients-container">
      <h2 className="clients-header">Client Management</h2>

      {/* Stylish Toggle Box for Total Amount */}
      <div
        className="total-box"
        onClick={() => setShowTotal(!showTotal)}
      >
        {showTotal
          ? `💰 Total Loaned: ₹${totalAmount}`
          : '🔍 Click to View Total Borrowed Amount'}
      </div>

      <div className="add-client-form">
        <div className="form-group">
          <label>Client Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="large-font" />
        </div>
        <div className="form-group">
          <label>Loan Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="large-font" />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="large-font" />
        </div>
        <button onClick={addClient} className="add-button">Add Client</button>
      </div>

      {error && <p className="error">{error}</p>}

      {overdueClients.length > 0 && (
        <div className="overdue-section">
          <h3 className="overdue-header">⚠️ Overdue Loans (1+ Year)</h3>
          <div className="client-list">
            {overdueClients.map((client) => (
              <div key={client._id} className="client-card overdue">
                <h3>{client.name}</h3>
                <p>Amount: ₹{client.amount}</p>
                <p>Start Date: {client.startDate ? client.startDate.slice(0, 10) : 'N/A'}</p>
                <button onClick={() => removeClient(client._id)} className="remove-button">Mark as Paid</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="current-loans-section">
        <h3>Current Loans</h3>
        <div className="client-list">
          {clients
            .filter(client => !overdueClients.some(ov => ov._id === client._id))
            .map((client) => (
              <div key={client._id} className="client-card">
                <h3>{client.name}</h3>
                <p>Amount: ₹{client.amount}</p>
                <p>Start Date: {client.startDate ? client.startDate.slice(0, 10) : 'N/A'}</p>
                <button onClick={() => removeClient(client._id)} className="remove-button">Remove</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Clients;