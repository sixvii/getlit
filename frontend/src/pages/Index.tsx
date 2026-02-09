import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsMarquee from '@/components/StatsMarquee';
import CreativeToolbox from '@/components/CreativeToolbox';
import ProjectsSection from '@/components/ProjectsSection';
import RandomsReel from '@/components/RandomsReel';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsMarquee />
      <CreativeToolbox />
      <ProjectsSection />
      <RandomsReel />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
