import React from 'react';

export default function TripCard({ trip, isActive }) {
  // Formatting the dates to look nicer
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`trip-card ${isActive ? 'active-card' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Destination
          </span>
          <h3 style={{ margin: '5px 0 15px 0', fontSize: '1.5rem', color: '#f8fafc' }}>
            {trip.destination}
          </h3>
        </div>
        {isActive && <span className="status-badge">Viewing</span>}
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="label">Start Date</span>
          <span className="value">{formatDate(trip.startDate)}</span>
        </div>
        <div className="detail-item">
          <span className="label">End Date</span>
          <span className="value">{formatDate(trip.endDate)}</span>
        </div>
      </div>

      <div className="card-footer">
        <span className="budget-label">Total Budget</span>
        <span className="budget-amount">${trip.budget?.toLocaleString()}</span>
      </div>

      <style jsx>{`
        .trip-card {
          background: #1e293b;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #334155;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .active-card {
          border-color: #3b82f6;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
          background: #1e2945;
        }
        .status-badge {
          background: #3b82f6;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }
        .card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px 0;
          border-top: 1px dashed #334155;
          border-bottom: 1px dashed #334155;
        }
        .label {
          display: block;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .value {
          font-weight: 500;
          color: #e2e8f0;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .budget-label {
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .budget-amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #10b981;
        }
      `}</style>
    </div>
  );
}