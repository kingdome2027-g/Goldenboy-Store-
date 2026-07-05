'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Code2, Palette, Zap } from 'lucide-react';

const projects = [
  {
    year: '2022',
    title: 'Dropped from UCT Computer Science',
    description: 'Started learning business fundamentals and branding while pursuing entrepreneurship.',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    year: '2022',
    title: 'Co-founded Online Barber',
    description: 'Built a grooming business with online booking and service management.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    year: '2023',
    title: 'Founded Goldenboy Media',
    description: 'Content creation studio focused on building personal brands.',
    icon: <Palette className="w-5 h-5" />,
  },
  {
    year: '2023',
    title: 'Launched Kingdome Brand',
    description: 'Personal brand and merchandise line focused on culture.',
    icon: <Palette className="w-5 h-5" />,
  },
  {
    year: '2023-2024',
    title: 'Web Development Services',
    description: 'Building websites and digital solutions for small businesses.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    year: '2024',
    title: 'Goldenboy Store',
    description: 'Unified platform for services and products.',
    icon: <Briefcase className="w-5 h-5" />,
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="projects-hero">
        <div>
          <h1>Work & Projects</h1>
          <p className="intro-copy">
            2022 to now—building multiple businesses, learning constantly.
          </p>
        </div>
      </section>

      <section className="projects-timeline">
        {projects.map((project, i) => (
          <div key={i} className="project-item">
            <div className="project-marker">
              <div className="project-icon">{project.icon}</div>
            </div>
            <div className="project-content">
              <div className="project-year">{project.year}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="projects-cta">
        <h2>Ready to work together?</h2>
        <div className="cta-actions">
          <Link href="/products" className="button button-primary">
            Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
