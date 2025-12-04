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

// Extended project details for showcase pages
const projectDetails: Record<string, {
  longDescription: string;
  features: string[];
  techStack: { category: string; items: string[] }[];
  images: { src: string; alt: string; caption: string }[];
  highlights?: string[];
}> = {
  'mancave-dashboard': {
    longDescription: `The Mancave Dashboard is an open-source, customizable smart home dashboard designed for displaying on a dedicated screen in your home. It has a great set of widgets for integrating tech with your home life, and was built modularly so that additional widgets are easily added.

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
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'CSS'] },
      { category: 'Backend', items: ['Go', 'Chi Router', 'Redis'] },
      { category: 'Infrastructure', items: ['Docker', 'Docker Compose', 'nginx'] },
    ],
    images: [
      { src: mancaveDashboard, alt: 'Mancave Dashboard Main View', caption: 'Main dashboard view with widgets' },
      { src: mancaveDashboardEdit, alt: 'Mancave Dashboard Edit Mode', caption: 'Edit mode with drag-and-drop' },
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
      { category: 'Integrations', items: ['OpenAI', 'Stripe', 'AdobeSign', 'Plaid'] },
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
