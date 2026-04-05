// Project data - shared between Projects list and ProjectDetail pages

// Import preview images
import mancaveDashboard from '../../assets/projects/themancavedashboard/dashboard.png';
import dormyWebpage from '../../assets/projects/dormy/webpagehome.png';
import skyjoOnline from '../../assets/projects/skyjoonline/home.png';

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
  'mashboard': {
    id: 'mashboard',
    title: 'Mashboard',
    description:
      'A customizable smart home dashboard built with React and Go. Displays all your important information in one place with a modular widget system. Perfect for wall-mounted displays, tablets, or any screen in your home.',
    tags: ['TypeScript', 'Go', 'CSS', 'Docker', 'React'],
    github: 'https://github.com/bemeek-io/mashboard',
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
  'skyjo-online': {
    id: 'skyjo-online',
    title: 'Skyjo Online',
    description:
      'An online version of the popular card game Skyjo, allowing players to compete against friends or random opponents in real-time! Play it at https://skyjo.bemeek.io!',
    tags: ['React', 'TypeScript', 'Node.js', 'Cloudflare'],
    github: 'https://github.com/bemeek-io/skyjo-online',
    website: 'https://skyjo.bemeek.io',
    previewImage: skyjoOnline,
  },
};
