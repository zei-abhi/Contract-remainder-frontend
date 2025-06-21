import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await axios.get('/api/contracts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setContracts(res.data);
      } catch (err) {
        alert('Error fetching contracts');
      }
    };
    fetchContracts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contract?')) return;
    try {
      await axios.delete(`/api/contracts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setContracts(contracts.filter(c => c._id !== id));
    } catch (err) {
      alert('Error deleting contract');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Contracts</h1>
        <div>
          <button onClick={logout} className="btn mr-2">Logout</button>
          <Link to="/add" className="btn">Add Contract</Link>
        </div>
      </div>
      <div className="grid gap-4">
        {contracts.length === 0 && <p>No contracts found.</p>}
        {contracts.map(c => (
          <div key={c._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{c.title}</h2>
            <p><strong>Start:</strong> {new Date(c.startDate).toLocaleDateString()}</p>
            <p><strong>End:</strong> {new Date(c.endDate).toLocaleDateString()}</p>
            {c.pdfUrl && <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View PDF</a>}
            <button onClick={() => handleDelete(c._id)} className="btn mt-2 bg-red-500 hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
