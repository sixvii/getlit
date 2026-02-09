import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import emojiImage from '../assets/bitmot.png';

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex items-center md:pt-12 pt-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute  rounded-3xl blur-3xl" />
              <img
                src={emojiImage}
                alt="Emoji Hero"
                className="relative rounded-3xl w-full max-w-xs mx-auto lg:max-w-[250px] object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Text & Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Timothy Idowu
            </h1>
            <p className="text-xl md:text-3xl text-white/80 mb-6">
              Web developer & software developer
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-6xl">
              I turn early ideas into sleek, I work with startups and founders who are building the next big thing (or fixing the last messy version of it). Whether it's your MVP, website, or dashboard. I bring structure, clarity.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:9sixvi@gmail.com"
                className="btn-white flex items-center gap-2"
              >
                <Mail size={18} />
                Hire on Gmail
              </a>
              <a
                href="https://wa.me/2349032066315"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Contact me
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
