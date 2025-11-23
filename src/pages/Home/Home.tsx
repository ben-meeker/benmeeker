import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { LogoMarquee } from '../../components/LogoMarquee';
import benYoungImg from '../../assets/benyoung.png';
import marleysImg from '../../assets/marleys.png';
import jiffylubeImg from '../../assets/jiffylube.png';
import namifyImg from '../../assets/namify.png';
import axomoImg from '../../assets/axomo.png';
import waffleloveImg from '../../assets/wafflelove.png';
import aptiveImg from '../../assets/aptive.png';
import dormyImg from '../../assets/dormy.png';
import utahhomeelectricImg from '../../assets/utahhomeelectric.png';
import servicenowImg from '../../assets/servicenow.png';
import allamericangymnasticsImg from '../../assets/allamericangymnastics.png';
import wendysImg from '../../assets/wendys.png';
import upsImg from '../../assets/ups.png';
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
              IT Operations · Software Development · Platform Engineering
            </p>
            <p className="home__description">
              Welcome to my website! I love building innovative, scalable solutions to any and every problem! I am also passionate about technology and leadership, and building teams that elevate businesses.
            </p>
            
            <div className="home__cta">
              <Link to="/projects">
                <Button size="lg" variant="outline">
                  Explore Projects
                </Button>
              </Link>
              <Link to="/library">
                <Button size="lg" variant="outline">
                  My Library
                </Button>
              </Link>
              <Link to="/historical-jams">
                <Button size="lg" variant="outline">
                  Historical Jams
                </Button>
              </Link>
              <Link to="/resume">
                <Button size="lg" variant="outline">
                  View Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Company Logos Marquee */}
        <div className="home__companies">
          <div className="container">
            <p className="home__companies-label">Trusted by</p>
          </div>
          <LogoMarquee
            logos={[
              { src: marleysImg, alt: "Marley's Gourmet Sliders" },
              { src: jiffylubeImg, alt: "Jiffy Lube" },
              { src: allamericangymnasticsImg, alt: "All American Gymnastics" },
              { src: wendysImg, alt: "Wendy's" },
              { src: namifyImg, alt: "Namify" },
              { src: upsImg, alt: "UPS" },
              { src: axomoImg, alt: "Axomo" },
              { src: waffleloveImg, alt: "Waffle Love" },
              { src: aptiveImg, alt: "Aptive" },
              { src: dormyImg, alt: "Dormy" },
              { src: utahhomeelectricImg, alt: "Utah Home Electric" },
              { src: servicenowImg, alt: "ServiceNow" },
            ]}
          />
        </div>
      </section>

      <section className="home__about">
        <div className="container">
          <h2 className="home__section-title">About Me</h2>
          <div className="home__cards">
            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">💻 Builder</h3>
              <p className="home__card-text">
                I love bringing ideas to life, and coming up with creative and innovative solutions! The satisfaction that comes from building something that makes a real impact a high that I constantly chase!
              </p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">🚀 Doer</h3>
              <p className="home__card-text">
                I'm not limited to my technical skills, and I'm able to learn new products and processes extremely quickly! Whatever needs to get done, it will get handled!
              </p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="home__card-title">📚 Learner</h3>
              <p className="home__card-text">
                Much to my own dismay, I am unable to shake my interest in the world and all of it's amazing opportunities! I am literally interested in everything. Ask my wife!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Add your images with backgrounds here */}
      {/* Uncomment when you upload images to public/ folder */}
      {/* 
      <section className="home__gallery">
        <div className="container">
          <h2 className="home__section-title">Snapshots</h2>
          <div className="home__gallery-grid">
            <img src="/photo1.jpg" alt="Description" className="home__gallery-image" />
            <img src="/photo2.jpg" alt="Description" className="home__gallery-image" />
            <img src="/photo3.jpg" alt="Description" className="home__gallery-image" />
          </div>
        </div>
      </section>
      */}

      <section className="home__cta-section">
        <div className="container">
          <div className="home__cta-card-wrapper">
            <Card variant="elevated" padding="lg">
              <img 
                src={benYoungImg} 
                alt="" 
                className="home__cta-image"
                aria-hidden="true"
              />
              <div className="home__cta-content">
                <h2>Let's Work Together</h2>
                <p>
                  Want me to work for you? Want to work for me? Want to talk about life and all of it's amazing-ness?
                </p>
                <Button size="lg" variant="primary">
                  Contact Me!
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

