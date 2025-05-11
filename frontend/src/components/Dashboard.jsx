import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_URL}/applications`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [API_URL]);

  const total = applications.length;
  const avgLoan = total
    ? applications.reduce((sum, app) => sum + Number(app.loanAmount), 0) / total
    : 0;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Total Applications: {total}</p>
      <p>Average Loan Amount: ₹{avgLoan.toFixed(2)}</p>
    </div>
  );
};

export default Dashboard;
