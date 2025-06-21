import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContract = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [pdf, setPdf] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('notes', notes);
    if (pdf) formData.append('pdf', pdf);

    try {
      await axios.post('/api/contracts', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to add contract');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-semibold">Add Contract</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" required />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input mt-3" required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input mt-3" required />
        <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="input mt-3" rows="3" />
        <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="mt-3" />
        <button type="submit" className="btn mt-4">Add</button>
      </form>
    </div>
  );
};

export default AddContract;
