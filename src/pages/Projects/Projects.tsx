import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { projectsData } from './projectsData';
import './Projects.css';

export const Projects: React.FC = () => {
  const projects = Object.values(projectsData);

  return (
    <div className="projects">
      <div className="container">
        <header className="projects__header">
          <h1 className="projects__title">Projects</h1>
          <p className="projects__description">
            A showcase of my work, experiments, and contributions. Each project represents
            a unique challenge and learning opportunity.
          </p>
        </header>

        <div className="projects__grid">
          {projects.map((project) => (
            <Card key={project.id} variant="elevated" padding="lg" className="projects__card">
              <div className="projects__item">
                <h3 className="projects__item-title">{project.title}</h3>
                <p className="projects__item-description">{project.description}</p>
                
                <div className="projects__item-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects__item-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="projects__item-actions">
                  <Link to={`/projects/${project.id}`}>
                    <Button variant="primary" size="sm">
                      View Project
                    </Button>
                  </Link>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              {project.previewImage && (
                <div className="projects__item-preview">
                  <img src={project.previewImage} alt="" aria-hidden="true" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

