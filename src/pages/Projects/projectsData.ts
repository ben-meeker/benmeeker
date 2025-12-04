// Project data - shared between Projects list and ProjectDetail pages

// Import preview images
import mancaveDashboard from '../../assets/projects/themancavedashboard/dashboard.png';
import dormyWebpage from '../../assets/projects/dormy/webpagehome.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  website?: string;
  previewImage?: string;
}

// Add more projects here as needed
export const projectsData: Record<string, Project> = {
  'mancave-dashboard': {
    id: 'mancave-dashboard',
    title: 'The Mancave Dashboard',
    description:
      'A cool, customizable smart home dashboard built with React and Go. Displays all your important information in one place with a modular widget system. Perfect for wall-mounted displays, tablets, or any screen in your home.',
    tags: ['TypeScript', 'Go', 'CSS', 'Docker', 'React'],
    github: 'https://github.com/ben-meeker/themancavedashboard',
    previewImage: mancaveDashboard,
  },
  'dormy': {
    id: 'dormy',
    title: 'Dormy',
    description:
      'A property management and rental platform that modernized the rental process for landlords. Features AI-powered lease generation, digital signatures, maintenance management, rent collection, and tenant messaging. Later pivoted to a tenant-focused mobile app for property discovery.',
    tags: ['React', 'TypeScript', 'Go', 'Kubernetes', 'Swift'],
    previewImage: dormyWebpage,
  },
};
