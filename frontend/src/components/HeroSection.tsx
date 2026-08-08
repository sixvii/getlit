import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

const homeIconModules = import.meta.glob('../assets/homeicons/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const homeIcons = Object.entries(homeIconModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src]) => ({
    src,
    alt: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ?? 'home icon',
  }));

const orbitRadius = 112;

const HomeIconOrbit = () => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[360px] pause-on-hover">
      <div className="absolute inset-6 rounded-full border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(255,255,255,0.08)]" />
      <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />

      <div className="relative h-full w-full spin-slow">
        {homeIcons.map((icon, index) => {
          const angle = (360 / homeIcons.length) * index - 90;

          return (
            <div
              key={icon.src}
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 shadow-lg shadow-black/20 backdrop-blur-sm sm:h-28 sm:w-28"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${orbitRadius}px) rotate(${-angle}deg)`,
              }}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
            <HomeIconOrbit />
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
