import { useState } from 'react';
import api from '../services/api';

export default function AddTripModal({ onAdd }) {
  const [form, setForm] = useState({});

  const submit = async () => {
    const res = await api.post('/trips', form);
    onAdd(res.data);
  };

  return (
    <div className="card" style={{ marginBottom: 30 }}>
      <input placeholder="Destination" onChange={e => setForm({ ...form, destination: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, startDate: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, endDate: e.target.value })} />
      <input placeholder="Budget" onChange={e => setForm({ ...form, budget: e.target.value })} />
      <button onClick={submit}>Add Trip</button>
    </div>
  );
}
