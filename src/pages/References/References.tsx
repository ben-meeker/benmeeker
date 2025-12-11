import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import './References.css';

type ReferenceType = 'professional' | 'personal';

interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  initials: string;
  accentColor: string;
}

const professionalReferences: Reference[] = [
  {
    id: 'prof-1',
    name: 'Oki Dorff',
    title: 'Director of IT',
    company: 'Aptive Environmental',
    relationship: 'Direct Manager',
    initials: 'OD',
    accentColor: 'var(--color-primary-main)',
  },
  {
    id: 'prof-2',
    name: 'Joseph Frost',
    title: 'Systems Engineer',
    company: 'Aptive Environmental / Namify',
    relationship: 'Peer / Colleague',
    initials: 'JF',
    accentColor: 'var(--color-secondary-main)',
  }
];

const personalReferences: Reference[] = [
  {
    id: 'pers-1',
    name: 'Jared Meeker',
    title: 'Manager, DevOps',
    company: 'Vivint',
    relationship: 'Father',
    initials: 'JM',
    accentColor: 'var(--color-primary-main)',
  },
  {
    id: 'pers-2',
    name: 'Mark Maynes',
    title: 'Finance Major',
    company: 'BYU',
    relationship: 'Long-term Friend',
    initials: 'MM',
    accentColor: 'var(--color-secondary-main)',
  },
  {
    id: 'pers-3',
    name: 'Emily Meeker',
    title: '3rd Grade Teacher',
    company: 'Mount Mahogany Elementary',
    relationship: 'Wife',
    initials: 'EM',
    accentColor: 'var(--color-info)',
  },
];

export const References: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReferenceType>('professional');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const currentReferences = activeTab === 'professional' ? professionalReferences : personalReferences;

  const handleRequestContact = () => {
    const refType = activeTab === 'professional' ? 'professional' : 'personal';
    const subject = encodeURIComponent(`Reference Contact Information Request - ${refType.charAt(0).toUpperCase() + refType.slice(1)}`);
    const body = encodeURIComponent(
      `Hi Ben,\n\nI'm interested in speaking with your ${refType} references as part of my evaluation process.\n\nPlease let me know the best way to proceed.\n\nThank you!`
    );
    window.location.href = `mailto:ben@meekers.org?subject=${subject}&body=${body}`;
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 3000);
  };

  return (
    <div className="references">
      <div className="references__background">
        <div className="references__gradient-orb references__gradient-orb--1" />
        <div className="references__gradient-orb references__gradient-orb--2" />
        <div className="references__grid-pattern" />
      </div>

      <div className="container">
        <header className="references__header">
          <h1 className="references__title">References</h1>
          <p className="references__subtitle">
            Trusted colleagues and leaders who can speak to my work, character, and impact.
          </p>
          
          {/* Toggle Tabs */}
          <div className="references__tabs">
            <button
              className={`references__tab ${activeTab === 'professional' ? 'references__tab--active' : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              Professional
            </button>
            <button
              className={`references__tab ${activeTab === 'personal' ? 'references__tab--active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal
            </button>
          </div>
        </header>

        <div className="references__grid">
          {currentReferences.map((ref) => (
            <div
              key={ref.id}
              className={`references__card-wrapper ${hoveredCard === ref.id ? 'references__card-wrapper--hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(ref.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card variant="elevated" padding="lg">
                <div className="references__card-content">
                  <div className="references__card-header">
                    <div 
                      className="references__avatar"
                      style={{ backgroundColor: ref.accentColor }}
                    >
                      <span className="references__avatar-initials">{ref.initials}</span>
                    </div>
                    
                    <div className="references__info">
                      <h3 className="references__name">{ref.name}</h3>
                      <p className="references__title-role">{ref.title}</p>
                      <p className="references__company">{ref.company}</p>
                    </div>
                  </div>

                  <div className="references__card-footer">
                    <div className="references__relationship-badge">
                      {ref.relationship}
                    </div>

                    <div className="references__privacy-notice">
                      <svg className="references__lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Contact info upon request</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <section className="references__request-section">
          <Card variant="elevated" padding="lg">
            <div className="references__request-content">
              <div className="references__request-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
              <div className="references__request-text">
                <h2>Request Contact Information</h2>
                <p>
                  Out of respect for my references' privacy, I don't publish their contact details publicly. 
                  If you'd like to speak with any of my references, please reach out and I'll be happy to provide you with their contact information!
                </p>
              </div>
              <div className="references__request-action">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleRequestContact}
                  className={requestSent ? 'references__button--sent' : ''}
                >
                  {requestSent ? (
                    <>
                      <svg className="references__check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Email Opened!
                    </>
                  ) : (
                    <>
                      <svg className="references__email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Request References
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <footer className="references__footer">
        </footer>
      </div>
    </div>
  );
};
