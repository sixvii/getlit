import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import project1 from '@/assets/yello.png';
import project2 from '@/assets/aiseo.png';
import project3 from '@/assets/brite.png';
import project4 from '@/assets/proj4.png';
import project5 from '@/assets/Vesper.png';
import project6 from '@/assets/Voyager.png';
import project7 from '@/assets/ahbit.png';
import project8 from '@/assets/shifttt.png';
import project9 from '@/assets/fmail.png';

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
    name: 'Insurance web platform',
     description: 'This is an insurance agency operations platform that combines CRM, sales pipeline, policy management, commissions tracking, messaging, documents, scheduling, and admin/security tooling in one dashboard. It supports role-based views (agent, manager, admin), centralizes client and carrier data, and connects to a backend API for real-time data and reporting. The frontend is a Vite + React app styled with shadcn/ui components, and the backend is a Node/Express API with MongoDB.',
    image: project4,
    link: 'https://insur-e.web.app/',
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
  {
    id: 7,
    name: 'Habit Tracker',
    description: 'This project is a full-stack Habit Tracker application. It consists of: A backend (Node.js/Express, MongoDB) that manages user authentication, habit data, and API endpoints. A frontend (React + Vite + Tailwind CSS) that provides a modern, responsive user interface for tracking habits, viewing progress, and managing user profiles. Features include user signup/login, habit creation and completion tracking, dark mode support, and a mobile-friendly design.',
    image: project7,
    link: 'https://ah-bit.web.app/',
  },
  {
    id: 8,
    name: 'Shift, time and expenses tracker',
    description: 'Shiftt is a full-stack shift, income, and expense tracking application built for workers who need a simple way to manage jobs, log shifts, track tips/premiums, record expenses, and review earnings insights across mobile and desktop. The backend is a Spring Boot 3.3.8 API built with Java 21 that powers authentication, jobs, shifts, expenses, user settings, and password reset features for the Shiftt app. It uses Spring Data MongoDB with MongoDB Atlas for persistence, JWT for access and refresh token authentication, BCrypt for password hashing, and Spring Mail for reset-email support. The service is containerized with Docker and deployed on Render, exposing REST endpoints consumed by the React frontend.',
    image: project8,
    link: ' https://shif-tt.web.app/',
  },

  {
    id: 9,
    name: 'Send a Future Mail, letter, Message',
    description: ' Letter App is a full-stack web project for sending future messages and personal letters with a clean mobile-first experience. The frontend is built with React, TypeScript, Tailwind CSS, and modern UI components, while the backend uses Node.js, Express, MongoDB, JWT authentication, and Cloudinary for media uploads. Users can sign up, sign in, manage profiles, follow other users, and create or receive letters in a timeline-style flow. The app is deployed with Firebase Hosting for the frontend and Render for the backend, giving a simple and scalable production setup.',
    image: project9,
    link: ' https://fm-ail.web.app/',
  }
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
        <h3 className="md:text-xl text-[14.5px] font-semibold text-foreground">{project.name}</h3>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[15px] gap-1 text-foreground/70 hover:text-primary transition-colors"
        >
          View site
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="text-foreground/70">{project.description}</p>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-20 px-10 bg-background">
      <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16">
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
