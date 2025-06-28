import { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [interestType, setInterestType] = useState('compound');

  const calculateInterest = () => {
    if (!principal || !rate || !startDate || !endDate) return;

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const timeDiff = end - start;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    let interestAmount;
    if (interestType === 'simple') {
      // Simple Interest: I = P * r * t
      interestAmount = p * r * (daysDiff/365);
    } else {
      // Compound Interest: A = P(1 + r/n)^(nt) - P
      interestAmount = p * (Math.pow(1 + r/365, daysDiff) - p);
    }

    const totalAmount = p + interestAmount;

    setResult({
      principal: p.toFixed(2),
      interest: interestAmount.toFixed(2),
      total: totalAmount.toFixed(2),
      days: daysDiff,
      type: interestType
    });
  };

  return (
    <div className="calculator-container">
      <h2>Interest Calculator</h2>
      
      <div className="calculator-form">
        <input
          type="number"
          placeholder="Principal Amount (₹)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Annual Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        
        <div className="interest-toggle">
          <label>
            <input
              type="radio"
              name="interestType"
              checked={interestType === 'simple'}
              onChange={() => setInterestType('simple')}
            />
            Simple Interest
          </label>
          <label>
            <input
              type="radio"
              name="interestType"
              checked={interestType === 'compound'}
              onChange={() => setInterestType('compound')}
            />
            Compound Interest
          </label>
        </div>

        <button onClick={calculateInterest}>Calculate</button>
      </div>

      {result && (
        <div className="result">
          <h3>Calculation Result:</h3>
          <div className="result-grid">
            <div>Principal Amount:</div>
            <div>₹{result.principal}</div>
            
            <div>Interest Rate:</div>
            <div>{rate}% ({result.type})</div>
            
            <div>Period:</div>
            <div>{result.days} days</div>
            
            <div>Interest Amount:</div>
            <div>₹{result.interest}</div>
            
            <div className="total-label">Total Amount:</div>
            <div className="total-amount">₹{result.total}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;