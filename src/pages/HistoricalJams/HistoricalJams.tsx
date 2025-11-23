import React from 'react';
import './HistoricalJams.css';

export const HistoricalJams: React.FC = () => {
  return (
    <div className="historical-jams">
      <section className="historical-jams__hero">
        <div className="container">
          <h1 className="historical-jams__title">Historical Jams</h1>
          <p className="historical-jams__subtitle">
            A curated collection of music through the ages
          </p>
        </div>
      </section>

      <section className="historical-jams__content">
        <div className="container">
          <p>Content coming soon...</p>
        </div>
      </section>
    </div>
  );
};

