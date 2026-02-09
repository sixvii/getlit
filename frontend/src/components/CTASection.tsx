import { ArrowUpRight } from 'lucide-react';

const CTASection = () => {
  const handleBookCall = () => {
    window.open('/booking', '_blank');
  };

  return (
    <section className="w-full md:min-h-[70vh] py-32 md:py-50 px-10 bg-[#111111]">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
          Let's Create Something <br className="hidden md:block" />
          extraordinary together<span className="text-primary">.</span>
        </h2>
        <button
          onClick={handleBookCall}
          className="flex items-center gap-3 bg-white text-background px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          <span className="bg-background text-white p-2 rounded-full">
            <ArrowUpRight size={20} />
          </span>
          Book call
        </button>
      </div>
    </section>
  );
};

export default CTASection;
