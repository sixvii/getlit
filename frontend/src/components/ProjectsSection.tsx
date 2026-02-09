import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import project1 from '@/assets/yello.png';
import project2 from '@/assets/aiseo.png';
import project3 from '@/assets/brite.png';
import project4 from '@/assets/fina.png';
import project5 from '@/assets/Vesper.png';
import project6 from '@/assets/Voyager.png';

const projects = [
  {
    id: 1,
    name: 'Yello Task Management',
    description: 'Yello Task Management is a full-stack web application for a photography/videography and training services business. It consists of a frontend and backend',
    image: project1,
    link: 'https://ye-llo.web.app/',
  },
  {
    id: 2,
    name: 'Aiseo Landing Page',
    description: 'Modern landing page for an AI SEO tool featuring gradient designs and smooth animations.',
    image: project2,
    link: 'https://aiseo-ng.web.app/',
  },
  {
    id: 3,
    name: 'Brite Events Website',
    description: 'An event management platform with ticketing and scheduling features.',
    image: project3,
    link: 'https://br-ite.web.app/',
  },
  {
    id: 4,
    name: 'Finafusion',
     description: 'Finafusion is a full-stack web application for a photography/videography and training services business. It consists of a frontend and backend',
    image: project4,
    link: '#',
  },
  {
    id: 5,
    name: 'Vesper Personal Blog',
    description: 'A concise, modern frontend app built with Vite + React + TypeScript, styled by Tailwind. It includes reusable UI components (cards, header/footer, newsletter), article data/pages, and utility hooks—set up as a clean, component-driven site scaffold.',
    image: project5,
    link: 'https://ves-per.web.app/',
  },
  {
    id: 6,
    name: 'Voyager',
    description: 'Voyager is a modern travel and lifestyle blog built with React, TypeScript, Vite, and Tailwind CSS, featuring elegant UI components, smooth scroll animations, and editorial-style articles about destinations and experiences.',
    image: project6,
    link: 'https://voya-ger.web.app/',
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="glass-card-3xl p-5 group"
    >
      <motion.div
        className="overflow-hidden rounded-2xl mb-5"
        animate={{
          scale: isInView ? 1 : 0.85,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-64 md:h-[27rem] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white/70 hover:text-primary transition-colors"
        >
          View site
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="text-white/60">{project.description}</p>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-20 px-10 bg-[#111111]">
      <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-16">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
