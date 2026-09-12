// Portfolio data - single source of truth
// All content derived from verified information only

export const personal = {
  name: 'Asbin T S',
  nameShort: 'ASBIN.TS',
  role: 'Software Developer',
  email: 'asbinthomas15@gmail.com',
  github: 'https://github.com/asbin72',
  linkedin: 'https://www.linkedin.com/in/asbin-t-s',
  resume: '/resume.pdf',
  tagline: 'I build digital systems that feel as good as they function.',
  about: "I'm Asbin T S, a Software Developer focused on building modern web applications and solving problems through clean, structured technology.",
  aboutHeadline: "I DON'T JUST WRITE CODE. I BUILD SYSTEMS.",
};

export const stack = [
  {
    id: 'frontend',
    layer: 'FRONTEND',
    tech: ['React', 'TypeScript'],
    description: 'Building responsive and interactive user experiences.',
    icon: '⬡',
    color: '#61DAFB',
  },
  {
    id: 'backend',
    layer: 'BACKEND',
    tech: ['Spring Boot', 'Java'],
    description: 'Designing backend logic and scalable application services.',
    icon: '⬡',
    color: '#6DB33F',
  },
  {
    id: 'data',
    layer: 'DATA',
    tech: ['MySQL'],
    description: 'Structuring and managing relational application data.',
    icon: '⬡',
    color: '#4479A1',
  },
];

export const heroStack = ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL'];

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
  year: string;
  domain: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'kss-petshop',
    title: 'PAWFECTLY // KSS PET SHOP',
    subtitle: 'Modern E-Commerce & Pet Care Platform',
    description:
      'An interactive pet shop and care management web application featuring a rich product catalog, pet wellness services, and an engaging responsive user experience.',
    features: [
      'Comprehensive pet supplies & nutrition product catalog',
      'Pet adoption listings & veterinary appointment scheduling',
      'Interactive shopping cart, category filtering & instant search',
      'High-performance UI built with React & modern styling',
    ],
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://kss-petshop-official.vercel.app/',
    githubUrl: 'https://github.com/Kss-Official/KSS-PETSHOP-OFFICIAL',
    status: 'LIVE',
    year: '2026',
    domain: 'kss-petshop-official.vercel.app',
  },
  {
    id: 'college-management',
    title: 'COLLEGE MANAGEMENT SYSTEM',
    subtitle: 'Full-Stack Academic Platform',
    description:
      'A full-stack college management platform designed to bring academic and administrative workflows into one unified digital system.',
    features: [
      'Student & faculty administrative workflows',
      'Academic course & department administration interface',
      'Responsive multi-page React frontend with modern layouts',
      'Interactive dashboard analytics and management metrics',
    ],
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://college-management-lovat.vercel.app/',
    githubUrl: 'https://github.com/asbin72/College_Management',
    status: 'LIVE',
    year: '2026',
    domain: 'college-management-lovat.vercel.app',
  },
];

export const project = projects[0];

export const experience = [
  {
    id: 'kalpanaaa',
    company: 'KALPANAAA SOFTWARE SOLUTIONS',
    role: 'Software Developer',
    period: '27 July 2026 — Present',
    current: true,
    type: 'Full-time',
  },
  {
    id: 'tap',
    company: 'TAP ACADEMY',
    role: 'Software Developer Intern',
    period: '5 January 2026 — 5 September 2026',
    current: false,
    type: 'Internship',
  },
  {
    id: 'exlife',
    company: 'EXLIFE SOLUTIONS',
    role: 'Web Developer Intern',
    period: 'August 2024 — September 2024',
    current: false,
    type: 'Internship',
  },
];

export const skills = [
  { name: 'Java', category: 'backend', description: 'Object-oriented programming, core language for backend systems.' },
  { name: 'React', category: 'frontend', description: 'Component-based UI library for building modern web interfaces.' },
  { name: 'TypeScript', category: 'frontend', description: 'Typed superset of JavaScript for scalable, maintainable code.' },
  { name: 'Spring Boot', category: 'backend', description: 'Java framework for building production-ready backend services.' },
  { name: 'MySQL', category: 'data', description: 'Relational database for structured data storage and querying.' },
  { name: 'JavaScript', category: 'frontend', description: 'Core scripting language of the modern web.' },
  { name: 'HTML', category: 'frontend', description: 'Semantic markup for accessible, well-structured web pages.' },
  { name: 'CSS', category: 'frontend', description: 'Styling and layout for visual web interfaces.' },
  { name: 'OOP', category: 'concept', description: 'Encapsulation, inheritance, and polymorphism design principles.' },
  { name: 'Data Structures', category: 'concept', description: 'Efficient organization and manipulation of data.' },
  { name: 'Problem Solving', category: 'concept', description: 'Systematic approach to breaking down complex problems.' },
  { name: 'Technical Thinking', category: 'concept', description: 'Engineering mindset applied to architecture and design.' },
];

export const progression = [
  { step: 'WEB DEVELOPMENT', description: 'HTML, CSS, JavaScript foundations' },
  { step: 'JAVA BACKEND', description: 'Spring Boot, OOP, data structures' },
  { step: 'FULL-STACK DEVELOPMENT', description: 'React + TypeScript + MySQL' },
];

export const navLinks = [
  { label: 'WORK', href: '#project' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];
