import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { LogoMarquee } from '../../components/LogoMarquee';
// import { AiChat } from '../../components/AiChat';
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
import wifeAndDogImg from '../../assets/wifeanddog.jpg';
import houseImg from '../../assets/house.jpeg';
import peopleImg from '../../assets/people.jpeg';
import './Home.css';

export const Home: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = 3;

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    }
  };

  const goToPrev = () => {
    const newIndex = activeSlide === 0 ? totalSlides - 1 : activeSlide - 1;
    scrollToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;
    scrollToSlide(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const slideWidth = carousel.offsetWidth;
      const newIndex = Math.round(carousel.scrollLeft / slideWidth);
      setActiveSlide(newIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

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
              Welcome to my website! Take a look around and get to know me a little better!
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

      {/* AI Chat Section - Commented out for now */}
      {/*
      <section className="home__chat">
        <div className="container">
          <h2 className="home__section-title">Chat with my AI twin!</h2>
          <p className="home__chat-intro">
            Hi, I run entirely in your browser!
          </p>
          <div className="home__chat-wrapper">
            <AiChat />
          </div>
        </div>
      </section>
      */}

      <section className="home__about">
        <div className="container">
          <h2 className="home__section-title">A Little About Me</h2>
          <div className="home__carousel-wrapper">
            {/* Arrow buttons - desktop only */}
            <button 
              className="home__carousel-arrow home__carousel-arrow--prev" 
              onClick={goToPrev}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button 
              className="home__carousel-arrow home__carousel-arrow--next" 
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>

            <div className="home__carousel" ref={carouselRef}>
              {/* Card 1: Family */}
              <div className="home__carousel-slide">
                <Card variant="elevated" padding="lg" className="home__about-card">
                  <img 
                    src={wifeAndDogImg} 
                    alt="My wife and dog" 
                    className="home__about-photo"
                  />
                  <div className="home__about-text">
                    <p>
                      I love my wife Emily and our dog Rex. They keep me happy and always remind me of what really matters in life
                      <br/>
                      <br/>
                      Honorable mention: My motorcycle Selina
                    </p>
                  </div>
                </Card>
              </div>

              {/* Card 2: Building */}
              <div className="home__carousel-slide">
                <Card variant="elevated" padding="lg" className="home__about-card">
                  <img 
                    src={houseImg} 
                    alt="Building projects" 
                    className="home__about-photo"
                  />
                  <div className="home__about-text">
                    <p>
                      I'm passionate about <Link to="/projects">building things</Link>. Literally anything, as long as I get to help create it
                      <br/>
                      <br/>
                      Ft. my house after insurance said they didn't like the siding
                    </p>
                  </div>
                </Card>
              </div>

              {/* Card 3: People */}
              <div className="home__carousel-slide">
                <Card variant="elevated" padding="lg" className="home__about-card">
                  <img 
                    src={peopleImg} 
                    alt="Connecting with people" 
                    className="home__about-photo"
                  />
                  <div className="home__about-text">
                    <p>
                      I thrive on <Link to="/references">connecting with others</Link>—meeting new people, 
                      learning from their experiences, and finding ways to help and serve
                      <br/>
                      <br/>
                      Here's the founding team of <strong>this is good.</strong> ask me about it!
                    </p>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="home__carousel-dots">
              <button 
                className={`home__carousel-dot ${activeSlide === 0 ? 'active' : ''}`} 
                aria-label="Slide 1" 
                onClick={() => scrollToSlide(0)}
              />
              <button 
                className={`home__carousel-dot ${activeSlide === 1 ? 'active' : ''}`} 
                aria-label="Slide 2" 
                onClick={() => scrollToSlide(1)}
              />
              <button 
                className={`home__carousel-dot ${activeSlide === 2 ? 'active' : ''}`} 
                aria-label="Slide 3" 
                onClick={() => scrollToSlide(2)}
              />
            </div>
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
                  Want me to work for you? Want to work for me? Just need someone to talk to?
                </p>
                <a href="mailto:ben@meekers.org">
                  <Button size="lg" variant="primary">
                    Contact Me!
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
