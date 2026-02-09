import htmlIcon from '@/assets/html-icon.svg';
import tailwindIcon from '@/assets/tailwind-icon.svg';
import jsIcon from '@/assets/javascript-icon.svg';
import tsIcon from '@/assets/typescript-icon.svg';
import reactIcon from '@/assets/react-icon.svg';

const CreativeToolbox = () => {
  const tools = [
    { icon: htmlIcon, name: 'Html', description: 'Building with Html' },
    { icon: tailwindIcon, name: 'Tailwindcss', description: 'Creating unique and dynamic styling' },
    { icon: jsIcon, name: 'JavaScript', description: 'Connecting every dots to functionality' },
    { icon: tsIcon, name: 'Typescript', description: 'Connecting every dots to functionality with Typescript' },
    { icon: reactIcon, name: 'React', description: 'Building with Next.js, Redux' },
  ];

  // Double the tools for seamless vertical loop
  const doubledTools = [...tools, ...tools];

  return (
    <section className="w-full py-20 px-10 bg-[#111111]">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left - Title */}
        <div className="lg:w-2/3">
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-[500] text-white leading-tight">
            My creative toolbox
          </h2>
        </div>

        {/* Right - Scrolling Boxes */}
        <div className="lg:w-2/3 overflow-hidden h-[500px] pause-on-hover">
          <div className="flex flex-col gap-4 marquee-vertical">
            {doubledTools.map((tool, index) => (
              <div
                key={index}
                className="glass-card p-6 flex flex-col justify-between min-h-[140px] hover:border-primary/50 transition-all duration-300"
              >
                <img src={tool.icon} alt={tool.name} className="w-12 h-12 mb-4" />
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-white font-semibold text-lg">{tool.name}</span>
                  <span className="text-white/60">{tool.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeToolbox;
