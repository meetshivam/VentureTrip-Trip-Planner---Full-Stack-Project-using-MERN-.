import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get('/trips/analytics').then(res => setData(res.data));
  }, []);

  return (
    <div className="grid" style={{ marginBottom: 30 }}>
      <div className="card">
        <h3>Total Trips</h3>
        <h1>{data.totalTrips}</h1>
      </div>

      <div className="card">
        <h3>Total Budget</h3>
        <h1>₹ {data.totalBudget}</h1>
      </div>

      <div className="card">
        <h3>Upcoming Trips</h3>
        <h1>{data.upcomingTrips}</h1>
      </div>
    </div>
  );
}
