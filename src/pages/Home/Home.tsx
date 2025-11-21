import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <h1 className="home__title">
              Hi, I'm <span className="home__title-highlight">Ben Meeker</span>
            </h1>
            <p className="home__subtitle">
              Software Engineer, Builder, and Lifelong Learner
            </p>
            <p className="home__description">
              Welcome to my personal website. I build innovative solutions, explore new
              technologies, and share my journey through code and ideas.
            </p>
            
            <div className="home__cta">
              <Link to="/projects">
                <Button size="lg" variant="primary">
                  View My Projects
                </Button>
              </Link>
              <Link to="/library">
                <Button size="lg" variant="outline">
                  Explore Library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home__about">
        <div className="container">
          <h2 className="home__section-title">About Me</h2>
          <div className="home__cards">
            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">💻 Developer</h3>
              <p className="home__card-text">
                Passionate about creating elegant solutions to complex problems.
                Experienced in modern web technologies and always learning.
              </p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">🚀 Builder</h3>
              <p className="home__card-text">
                I love bringing ideas to life. From concept to deployment, I enjoy
                every step of the creative process.
              </p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">📚 Learner</h3>
              <p className="home__card-text">
                Continuously exploring new technologies and approaches. Knowledge
                sharing and documentation are key to growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="home__cta-section">
        <div className="container">
          <Card variant="elevated" padding="lg">
            <div className="home__cta-content">
              <h2>Let's Work Together</h2>
              <p>
                Interested in collaborating or have a project in mind? I'd love to hear
                from you.
              </p>
              <Button size="lg" variant="primary">
                Get In Touch
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

