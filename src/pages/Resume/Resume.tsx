import React from 'react';
import { Card } from '../../components/Card';
import './Resume.css';

export const Resume: React.FC = () => {
  return (
    <div className="resume">
      <div className="container">
        <div className="resume__header">
          <h1 className="resume__title">Ben Meeker</h1>
          <p className="resume__subtitle">Software Engineer · Platform Engineering · IT Operations</p>
        </div>

        {/* Experience Section */}
        <section className="resume__section">
          <h2 className="resume__section-title">Experience</h2>
          <Card variant="elevated" padding="lg">
            <div className="resume__entry">
              <h3 className="resume__entry-title">Your Current/Recent Role</h3>
              <p className="resume__entry-meta">Company Name · Date Range</p>
              <ul className="resume__entry-list">
                <li>Key achievement or responsibility</li>
                <li>Another important contribution</li>
                <li>Technical accomplishment</li>
              </ul>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="resume__entry">
              <h3 className="resume__entry-title">Previous Role</h3>
              <p className="resume__entry-meta">Company Name · Date Range</p>
              <ul className="resume__entry-list">
                <li>Key achievement or responsibility</li>
                <li>Another important contribution</li>
                <li>Technical accomplishment</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Education Section */}
        <section className="resume__section">
          <h2 className="resume__section-title">Education</h2>
          <Card variant="elevated" padding="lg">
            <div className="resume__entry">
              <h3 className="resume__entry-title">Degree & Field of Study</h3>
              <p className="resume__entry-meta">University Name · Graduation Year</p>
            </div>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="resume__section">
          <h2 className="resume__section-title">Skills</h2>
          <div className="resume__skills-grid">
            <Card variant="elevated" padding="md">
              <h3 className="resume__skills-category">Languages</h3>
              <div className="resume__skills-list">
                <span className="resume__skill-tag">JavaScript</span>
                <span className="resume__skill-tag">TypeScript</span>
                <span className="resume__skill-tag">Python</span>
                <span className="resume__skill-tag">Go</span>
              </div>
            </Card>

            <Card variant="elevated" padding="md">
              <h3 className="resume__skills-category">Frameworks</h3>
              <div className="resume__skills-list">
                <span className="resume__skill-tag">React</span>
                <span className="resume__skill-tag">Node.js</span>
                <span className="resume__skill-tag">Express</span>
                <span className="resume__skill-tag">Next.js</span>
              </div>
            </Card>

            <Card variant="elevated" padding="md">
              <h3 className="resume__skills-category">Tools & Platforms</h3>
              <div className="resume__skills-list">
                <span className="resume__skill-tag">Docker</span>
                <span className="resume__skill-tag">Kubernetes</span>
                <span className="resume__skill-tag">AWS</span>
                <span className="resume__skill-tag">Git</span>
              </div>
            </Card>
          </div>
        </section>

        {/* Certifications/Awards Section */}
        <section className="resume__section">
          <h2 className="resume__section-title">Certifications & Awards</h2>
          <Card variant="elevated" padding="lg">
            <div className="resume__entry">
              <h3 className="resume__entry-title">Certification Name</h3>
              <p className="resume__entry-meta">Issuing Organization · Year</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

