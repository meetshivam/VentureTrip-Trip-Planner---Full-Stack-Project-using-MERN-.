import { useEffect, useState } from 'react';
import api from './services/api';

export default function App() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ destination: '', startDate: '', endDate: '', budget: '' });
  const [weatherData, setWeatherData] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
      res.data.forEach(trip => fetchFullWeather(trip.destination));
      setLoading(false);
    } catch (err) {
      console.error("Connection Error:", err);
      setLoading(false);
    }
  };

  const fetchFullWeather = async (city) => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results) return;

      const { latitude, longitude } = geoData.results[0];
      
      const [wRes, aRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`),
        fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi`)
      ]);

      const weather = await wRes.json();
      const air = await aRes.json();

      setWeatherData(prev => ({
        ...prev,
        [city]: { 
          current: weather.current_weather.temperature,
          aqi: air.current.european_aqi,
          forecast: weather.daily.time.map((date, index) => ({
            date: date,
            maxTemp: weather.daily.temperature_2m_max[index],
            minTemp: weather.daily.temperature_2m_min[index],
            code: weather.daily.weathercode[index]
          }))
        }
      }));
    } catch (err) {
      console.error("Forecast fetch failed:", err);
    }
  };

  const getDayName = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("Departure cannot be before Arrival.");
      return;
    }
    try {
      const res = await api.post('/trips', form);
      setTrips([res.data, ...trips]);
      fetchFullWeather(res.data.destination);
      setForm({ destination: '', startDate: '', endDate: '', budget: '' });
    } catch (err) { alert("Error adding trip."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove trip?")) {
      try {
        await api.delete(`/trips/${id}`);
        setTrips(trips.filter(t => t._id !== id));
      } catch (err) { alert("Delete failed."); }
    }
  };

  const openCalendar = (e) => { e.target.showPicker(); };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', color: 'white', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'system-ui', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <header style={{ borderBottom: '2px solid #3b82f6', marginBottom: '30px', paddingBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>🌍 VentureTrip | Your Personal Trip Planner ✈️  </h1>
        </header>

        {/* FORM SECTION */}
        <section style={{ background: '#1e293b', padding: '25px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #334155' }}>
          <form onSubmit={handleAddTrip} style={{ display: 'grid', gap: '15px' }}>
            <input 
              style={{ padding: '15px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #334155' }}
              placeholder="Search Destination City" 
              required value={form.destination}
              onChange={e => setForm({...form, destination: e.target.value})} 
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{fontSize: '0.75rem', opacity: 0.7, marginBottom: '5px', display: 'block'}}>Arrival Date</label>
                <input type="date" min={today} required onClick={openCalendar} onFocus={openCalendar} style={{ padding: '12px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', colorScheme: 'dark' }} value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
              </div>
              <div>
                <label style={{fontSize: '0.75rem', opacity: 0.7, marginBottom: '5px', display: 'block'}}>Departure Date</label>
                <input type="date" min={form.startDate || today} required onClick={openCalendar} onFocus={openCalendar} style={{ padding: '12px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', colorScheme: 'dark' }} value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
              </div>
            </div>
            <input type="number" placeholder="Budget (₹)" required style={{ padding: '15px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
            <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Schedule Trip</button>
          </form>
        </section>

        {/* TRIP LIST */}
        <div style={{ display: 'grid', gap: '25px' }}>
          {trips.filter(t => t.destination.toLowerCase().includes(search.toLowerCase())).map(t => {
            const w = weatherData[t.destination];
            return (
              <div key={t._id} style={{ background: '#1e293b', borderRadius: '15px', borderLeft: '10px solid #3b82f6' }}>
                <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ margin: '0 0 5px 0' }}>{t.destination}</h2>
                    <p style={{ opacity: 0.7 }}>📅 {new Date(t.startDate).toLocaleDateString()} — {new Date(t.endDate).toLocaleDateString()}</p>
                  </div>
                  {w && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0 }}>{w.current}°C</p>
                      <button 
                        onClick={() => setExpandedCard(expandedCard === t._id ? null : t._id)}
                        style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '6px 15px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        {expandedCard === t._id ? "Hide Forecast" : "7-Day Forecast 🔍"}
                      </button>
                    </div>
                  )}
                </div>

                {expandedCard === t._id && w && (
                  <div style={{ background: '#0f172a', padding: '25px', borderTop: '1px solid #334155' }}>
                    <h4 style={{ margin: '0 0 15px 0', opacity: 0.8 }}>Upcoming Week in {t.destination}</h4>
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '10px' }}>
                      {w.forecast.map((day, i) => (
                        <div key={i} style={{ minWidth: '80px', background: '#1e293b', padding: '15px', borderRadius: '10px', textAlign: 'center', border: day.date === today ? '1px solid #3b82f6' : '1px solid transparent' }}>
                          <p style={{ fontSize: '0.7rem', margin: '0 0 5px 0', opacity: 0.6 }}>{getDayName(day.date)}</p>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>{day.maxTemp}°</p>
                          <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.5 }}>{day.minTemp}°</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '20px', borderTop: '1px solid #334155', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: 0 }}>AIR QUALITY INDEX</p>
                        <p style={{ margin: 0, color: w.aqi > 100 ? '#f87171' : '#10b981', fontWeight: 'bold' }}>{w.aqi} AQI</p>
                      </div>
                      <button onClick={() => handleDelete(t._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️ Delete</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- FOOTER / POST SCRIPT --- */}
      <footer style={{ 
        marginTop: '50px', 
        paddingTop: '20px', 
        borderTop: '1px solid #334155', 
        textAlign: 'center', 
        opacity: 0.8,
        fontSize: '1rem',
        paddingBottom: '20px',
        letterSpacing: '1px'
      }}>
        <p>Built with ❤️ by 
          <a 
            href="https://github.com/meetshivam" // <--- REPLACE WITH YOUR REAL GITHUB LINK
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              marginLeft: '8px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#60a5fa';
              e.target.style.textShadow = '0 0 8px rgba(59, 130, 246, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.textShadow = 'none';
            }}
          >
            Shivam Gautam , Sonu Yadav and Sarthak Parmar
          </a>
        </p>
      </footer>
    </div>
  );
}