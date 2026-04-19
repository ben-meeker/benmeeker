import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { projectsData } from './projectsData';
import './ProjectDetail.css';

// Import images for each project
import mancaveDashboard from '../../assets/projects/themancavedashboard/dashboard.png';
import mancaveDashboardEdit from '../../assets/projects/themancavedashboard/dashboardedit.png';
import mancaveSelectWidget from '../../assets/projects/themancavedashboard/selectwidget.png';

import dormyWebpage from '../../assets/projects/dormy/webpagehome.png';
import dormyMobileApp from '../../assets/projects/dormy/mobileappmockup.png';

import skyjoOnlineHome from '../../assets/projects/skyjoonline/home.png';
import skyjoOnlineLobby from '../../assets/projects/skyjoonline/lobby.png';
import skyjoOnlineAvatarSelect from '../../assets/projects/skyjoonline/avatarselection.png';
import skyjoOnlineGameplay from '../../assets/projects/skyjoonline/gameplay.png';

import gotraegerMain from '../../assets/projects/go-traeger/main.png'
import gotraegerCook from '../../assets/projects/go-traeger/grafana.png'

import keystoneIntegrationHome from '../../assets/projects/keystoneintegration/home.png';
import keystoneIntegrationScope from '../../assets/projects/keystoneintegration/scope.png';
import keystoneIntegrationAbout from '../../assets/projects/keystoneintegration/about.png';
import keystoneIntegrationLocality from '../../assets/projects/keystoneintegration/locality.png';
import keystoneIntegrationBlog from '../../assets/projects/keystoneintegration/blog.png';

// Extended project details for showcase pages
const projectDetails: Record<string, {
  longDescription: string;
  features: string[];
  techStack: { category: string; items: string[] }[];
  images: { src: string; alt: string; caption: string }[];
  highlights?: string[];
}> = {
  'mashboard': {
    longDescription: `Mashboard is an open-source, customizable smart home dashboard designed for displaying on a dedicated screen in your home. It has a great set of widgets for integrating tech with your home life, and was built modularly so that additional widgets are easily added.

The dashboard consists of a React/TypeScript frontend, a Go backend API server, and Redis for caching. The entire stack runs in Docker containers for easy deployment on any system.`,
    features: [
      'Modular widget system - easily add and remove widgets',
      'Drag-and-drop layout editor with grid snapping',
      'Google Calendar integration with event display',
      'Weather data',
      'Tesla vehicle status and controls',
      'Photo slideshow',
      'Plant sensor monitoring for your garden',
      'Traeger grill temperature and status',
      'Night mode with automatic dimming schedule',
      'Fully containerized with Docker Compose',
      'Configuration via simple JSON file',
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
      { category: 'Backend', items: ['Go', 'Redis'] },
      { category: 'Infrastructure', items: ['Docker'] },
    ],
    images: [
      { src: mancaveDashboard, alt: 'Mashboard Main View', caption: 'Main dashboard view with widgets' },
      { src: mancaveDashboardEdit, alt: 'Mashboard Edit Mode', caption: 'Edit mode with drag-and-drop' },
      { src: mancaveSelectWidget, alt: 'Widget Selection', caption: 'Add new widgets' },
    ],
  },
  'dormy': {
    longDescription: `Dormy was a property management and rental startup that I ran for about 8 months. The platform's goal was to modernize the rental process for landlords and provide a full end-to-end solution at an affordable cost compared to hands-on third-party property managers.

The platform allowed landlords to create custom lease clauses with AI, send agreements for digital signature, manage maintenance requests, collect rent online, message tenants, and more. We had real paying customers - landlords using the platform and tenants actually paying rent through Dormy.

Eventually, we pivoted to focus more on the tenant experience, specifically the discovery of properties to rent. This became a mobile app that was published to the iOS App Store.`,
    features: [
      'AI-powered custom lease clause generation',
      'Digital lease signing with e-signatures',
      'Identity verification for tenant screening',
      'Online rent collection and payment processing',
      'Maintenance request management',
      'In-app messaging between landlords and tenants',
      'Property listing and tenant applications',
      'Mobile app for property discovery (iOS)',
      'Tenant portal for payments and communication',
    ],
    techStack: [
      { category: 'Web', items: ['React', 'TypeScript'] },
      { category: 'Backend', items: ['Go', 'Docker', 'Kubernetes'] },
      { category: 'Mobile', items: ['Swift', 'iOS'] },
      { category: 'Integrations', items: ['OpenAI', 'Stripe', 'AdobeSign'] },
    ],
    images: [
      { src: dormyWebpage, alt: 'Dormy Web Platform', caption: 'Landlord dashboard and property management' },
      { src: dormyMobileApp, alt: 'Dormy Mobile App', caption: 'iOS app for property discovery' },
    ],
    highlights: [
      'Real paying customers during operation',
      'Published iOS app on the App Store',
      'AI-powered lease generation',
    ],
  },
  'skyjo-online': {
    longDescription: `Skyjo Online is a real-time multiplayer version of the card game that I made so that my wife and I could play with my in-laws who live in a different state! It has an interface almost like Kahoot, and allows you to create a room and have others join. There is also the option to host a display separately for a Jackbox-style experience!`,
    features: [
      'Websocket game state synchronization',
      'Headless or host-based gameplay',
      'Ability to kick inactive players',
      'Emoji reactions shown to all players in lobby',
      '8-bit style music generated with code',
    ],
    techStack: [
      { category: 'Web', items: ['React', 'TypeScript', `Node.js`] },
      { category: 'Hosting', items: ['Cloudflare', 'Incus', 'Docker'] },
    ],
    images: [
      { src: skyjoOnlineHome, alt: 'Skyjo Online Home', caption: 'Home screen where players can create or join a game' },
      { src: skyjoOnlineLobby, alt: 'Skyjo Online Lobby', caption: 'Game lobby where players wait to join a match' },
      { src: skyjoOnlineAvatarSelect, alt: 'Skyjo Online Avatar Selection', caption: 'Players can select an avatar before the game begins' },
      { src: skyjoOnlineGameplay, alt: 'Skyjo Online Gameplay', caption: 'Players can see the game state and take their turns in real-time' },
    ],
    highlights: [
      'Legitimately fun'
    ],
  },
  'go-traeger': {
    longDescription: `Go Traeger is a GoLang SDK for interacting with Traeger grills programmatically, allowing developers to integrate grill control and monitoring into their own applications. I built this by reverse-engineering the Traeger API by using Charles Proxy and the Traeger mobile app on my phone. Shoutout to the development team at Traeger who found me after I built this and invited me over for lunch and a tour of their office! P.S. Thanks for the pellets, I was almost out.`,
    features: [
      'Send controls to your grill like changing the temperature, enabling supersmoke, or shutting off',
      'Get basic grill info or subscribe to the MQTT channel for real-time updates during your cook!',
    ],
    techStack: [
      { category: 'Language', items: ['GoLang'] },
    ],
    images: [
      { src: gotraegerMain, alt: 'Go Traeger SDK', caption: 'Go Traeger SDK Readme' },
      { src: gotraegerCook, alt: 'Grafana Cook', caption: 'One of my Grafana dashboards using the Go SDK to track my cooks' },
    ],
  },
  'keystone-integration': {
    longDescription: `The Keystone Integration website included a landing page describing the services, company background, and experience. In addition to this, it included microsites for all the serviceable areas at paths like /provo, /west-valley-city, etc. Each microsite had localized content back-linked to the main site for SEO. I also maintained a blog on this site, also for SEO purposes, to bring customers looking for information or services in our niche to the site. The site was built with React and TypeScript, and deployed on Cloudflare.`,
    features: [
      'Custom smart home and security system integrations',
    ],
    techStack: [
      { category: 'Language', items: ['React', 'TypeScript', 'CSS'] },
    ],
    images: [
      { src: keystoneIntegrationHome, alt: 'Keystone Integration', caption: 'Keystone Integration Home' },
      { src: keystoneIntegrationScope, alt: 'Keystone Integration', caption: 'Keystone Integration Scope' },
      { src: keystoneIntegrationAbout, alt: 'Keystone Integration', caption: 'Keystone Integration About' },
      { src: keystoneIntegrationLocality, alt: 'Keystone Integration', caption: 'Keystone Integration Locality' },
      { src: keystoneIntegrationBlog, alt: 'Keystone Integration', caption: 'Keystone Integration Blog' },
    ],
  },
};

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId || !projectsData[projectId]) {
    return <Navigate to="/projects" replace />;
  }

  const project = projectsData[projectId];
  const details = projectDetails[projectId];

  return (
    <div className="project-detail">
      {/* Hero Section */}
      {details?.images?.[0] && (
        <div className="project-detail__hero">
          <img 
            src={details.images[0].src} 
            alt={details.images[0].alt}
            className="project-detail__hero-image"
          />
          <div className="project-detail__hero-overlay" />
        </div>
      )}

      <div className="container">
        <Link to="/projects" className="project-detail__back">
          ← Back to Projects
        </Link>

        <header className="project-detail__header">
          <h1 className="project-detail__title">{project.title}</h1>
          <div className="project-detail__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-detail__tag">
                {tag}
              </span>
            ))}
          </div>
          {(project.github || project.website) && (
            <div className="project-detail__actions">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg">
                    View on GitHub
                  </Button>
                </a>
              )}
              {project.website && (
                <a href={project.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    Visit Website
                  </Button>
                </a>
              )}
            </div>
          )}
        </header>

        <div className="project-detail__content">
          {/* Highlights */}
          {details?.highlights && (
            <section className="project-detail__section">
              <div className="project-detail__highlights">
                {details.highlights.map((highlight, i) => (
                  <span key={i} className="project-detail__highlight">{highlight}</span>
                ))}
              </div>
            </section>
          )}

          {/* Overview */}
          <section className="project-detail__section">
            <h2 className="project-detail__section-title">Overview</h2>
            <div className="project-detail__description">
              {details?.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Screenshots Gallery */}
          {details?.images && details.images.length > 0 && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">Screenshots</h2>
              <div className="project-detail__gallery">
                {/* Main image */}
                {details.images[0] && (
                  <figure className="project-detail__gallery-item project-detail__gallery-item--main">
                    <img src={details.images[0].src} alt={details.images[0].alt} />
                    <figcaption>{details.images[0].caption}</figcaption>
                  </figure>
                )}
                {/* Secondary images in a row */}
                {details.images.length > 1 && (
                  <div className="project-detail__gallery-secondary-row">
                    {details.images.slice(1).map((image, i) => (
                      <figure 
                        key={i} 
                        className="project-detail__gallery-item project-detail__gallery-item--secondary"
                      >
                        <img src={image.src} alt={image.alt} />
                        <figcaption>{image.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Features */}
          {details?.features && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">Features</h2>
              <ul className="project-detail__features">
                {details.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Tech Stack */}
          {details?.techStack && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">Tech Stack</h2>
              <div className="project-detail__tech-stack">
                {details.techStack.map((category, i) => (
                  <div key={i} className="project-detail__tech-category">
                    <h3>{category.category}</h3>
                    <div className="project-detail__tech-items">
                      {category.items.map((item, j) => (
                        <span key={j} className="project-detail__tech-item">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
