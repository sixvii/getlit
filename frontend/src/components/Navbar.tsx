import { useState, useEffect } from 'react';
import logoo from '../assets/logoo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/60' : 'bg-background'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 md:py-7">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo */}
            <img src={logoo} alt="Logo" className="h-10 w-auto" />

            {/* Center - Projects */}
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary text-[18px] transition-colors duration-300"
            >
              Projects
            </button>

            {/* Right - About & Download CV */}
            <div className="flex items-center gap-7">
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-foreground hover:text-primary transition-colors duration-300 text-[18px]"
              >
                Testimonials
              </button>
              <a
                href="https://docs.google.com/document/d/1Zb2J5I0qE_QqD0oDyKzrxQxCVofDt8cG2ChAaAXa0Xw?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-foreground hover:bg-muted transition-all duration-300"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-between">
            {/* Left - Menu button & Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-6 h-6 flex flex-col justify-center items-center"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-6 h-0.5 bg-foreground origin-center"
                />
                <motion.span
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-6 h-0.5 bg-foreground"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-6 h-0.5 bg-foreground origin-center"
                />
              </button>
              <img src={logoo} alt="Logo" className="h-8 w-auto" />
            </div>

            {/* Right - Download CV */}
            <a
              href="https://docs.google.com/document/d/1Zb2J5I0qE_QqD0oDyKzrxQxCVofDt8cG2ChAaAXa0Xw?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-foreground text-sm hover:bg-muted transition-all duration-300"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-background border-r border-border"
          >
            <div className="flex flex-col justify-center h-full px-10 pt-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-5xl font-bold text-foreground mb-8 block hover:text-primary transition-colors"
                >
                  Testimonials
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-5xl font-bold text-foreground block hover:text-primary transition-colors"
                >
                  Projects
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
