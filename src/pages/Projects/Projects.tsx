import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import './Projects.css';

export const Projects: React.FC = () => {
  // Example projects - can be replaced with dynamic data
  const projects = [
    {
      id: 1,
      title: 'Project Name',
      description:
        'A comprehensive description of what this project does, the technologies used, and the problems it solves.',
      tags: ['React', 'TypeScript', 'Node.js'],
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Another Project',
      description:
        'Another exciting project showcasing different skills and technologies. This demonstrates versatility and range.',
      tags: ['Python', 'Machine Learning', 'API'],
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Third Project',
      description:
        'A third project that highlights additional capabilities and interests in different areas of development.',
      tags: ['Vue.js', 'Firebase', 'UI/UX'],
      link: '#',
      github: '#',
    },
  ];

  return (
    <div className="projects">
      <div className="container">
        <header className="projects__header">
          <h1 className="projects__title">Projects & Achievements</h1>
          <p className="projects__description">
            A showcase of my work, experiments, and contributions. Each project represents
            a unique challenge and learning opportunity.
          </p>
        </header>

        <div className="projects__grid">
          {projects.map((project) => (
            <Card key={project.id} variant="elevated" padding="lg">
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
                  <Button variant="primary" size="sm">
                    View Project
                  </Button>
                  <Button variant="outline" size="sm">
                    GitHub
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

