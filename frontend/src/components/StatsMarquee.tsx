import { Star } from 'lucide-react';

const StatsMarquee = () => {
  const stats = [
    { highlight: '2+/', text: 'Years of experience' },
    { highlight: '15+/', text: 'Satisfied clients' },
    { highlight: '>95%/', text: 'Client retention rate' },
  ];

  // Double the stats for seamless loop
  const doubledStats = [...stats, ...stats, ...stats, ...stats];

  return (
    <section className="w-full bg-card py-8 overflow-hidden bg-[#1C1C1C]">
      <div className="relative">
        <div className="flex marquee">
          {doubledStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 px-8 whitespace-nowrap">
              <Star className="text-primary fill-primary" size={30} />
              <span className="text-xl md:text-[30px] font-semibold">
                <span className="text-primary">{stat.highlight}</span>
                <span className="text-white">{stat.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsMarquee;
