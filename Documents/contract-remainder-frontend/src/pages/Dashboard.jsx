import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);

  const fetchContracts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/contracts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setContracts(res.data);
    } catch (err) {
      alert('Failed to load contracts');
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Contracts</h1>
      <ul className="space-y-4">
        {contracts.map((contract) => (
          <li key={contract._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{contract.title}</h2>
            <p>Start: {new Date(contract.startDate).toLocaleDateString()}</p>
            <p>End: {new Date(contract.endDate).toLocaleDateString()}</p>
            {contract.notes && <p>Notes: {contract.notes}</p>}
            {contract.pdfUrl && (
              <a href={contract.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
                View PDF
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
