import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ destination: '', startDate: '', endDate: '', budget: '' });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Connection Error:", err);
      setLoading(false);
    }
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/trips', form);
      setTrips([res.data, ...trips]);
      setForm({ destination: '', startDate: '', endDate: '', budget: '' });
    } catch (err) {
      alert("Backend is not responding. Check your terminal!");
    }
  };

  const filteredTrips = trips.filter(t => 
    t.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <header style={{ borderBottom: '2px solid #3b82f6', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>✈️ My Travel Planner</h1>
      </header>

      {/* --- ADD TRIP FORM --- */}
      <section style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Plan a New Adventure</h3>
        <form onSubmit={handleAddTrip} style={{ display: 'grid', gap: '10px' }}>
          <input 
            style={{ padding: '12px', borderRadius: '6px', background: '#0f172a', color: 'white', border: '1px solid #334155' }}
            placeholder="Destination (e.g., Tokyo)" 
            required 
            value={form.destination}
            onChange={e => setForm({...form, destination: e.target.value})} 
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="date" required style={{ padding: '10px', borderRadius: '6px' }} value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
            <input type="date" required style={{ padding: '10px', borderRadius: '6px' }} value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
          </div>
          <input 
            type="number" 
            placeholder="Budget ($)" 
            required 
            style={{ padding: '12px', borderRadius: '6px' }} 
            value={form.budget} 
            onChange={e => setForm({...form, budget: e.target.value})} 
          />
          <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Add Trip to List
          </button>
        </form>
      </section>

      {/* --- SEARCH --- */}
      <input 
        style={{ width: '100%', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '1rem', border: '2px solid #3b82f6' }}
        placeholder="🔍 Search saved trips..." 
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* --- RESULTS GRID --- */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {loading ? <p>Loading data...</p> : 
         filteredTrips.length > 0 ? filteredTrips.map(t => (
          <div key={t._id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '8px solid #3b82f6' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{t.destination}</h2>
            <p style={{ margin: '5px 0' }}>📅 {new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}</p>
            <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>Budget: ${t.budget}</p>
          </div>
        )) : <p style={{ opacity: 0.6 }}>No trips found. Add one above! ✨</p>}
      </div>
    </div>
  );
}