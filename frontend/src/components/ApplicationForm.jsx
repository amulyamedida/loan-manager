import { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loanAmount: '',
    purpose: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${API_URL}/api/applications`, formData);
      alert('Application submitted!');
    } catch (error) {
      console.error(error);
      alert('Error submitting application');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Loan Application</h2>
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} /><br />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} /><br />
      <input type="number" name="loanAmount" placeholder="Loan Amount" required onChange={handleChange} /><br />
      <textarea name="purpose" placeholder="Purpose" required onChange={handleChange}></textarea><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
