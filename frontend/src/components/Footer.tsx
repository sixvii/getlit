import bitmot from '@/assets/bitmot.png';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300/30 py-16 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Avatar & Name */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={bitmot}
                alt="Timothy"
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="text-2xl font-semibold text-white">Timothy</span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-lg">
              I am not just here to make things pretty, I'm also here to solve real problems. Let's build, I use the editor like a playground experimenting. If you've got a vision and need a developer or a partner who gets it (and actually replies to messages), we will get along great. Let's build something users will actually enjoy.
            </p>
          </div>

          {/* Right - Location & Socials */}
          <div className="lg:text-right">
            <p className="text-white mb-4">Lagos, Nigeria</p>
            <p className="text-white/70 mb-2">Socials</p>
            <div className="flex lg:justify-end gap-6">
              <a
                href="https://twitter.com/kingdrake0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                Follow me on X
              </a>
              <a
                href="https://wa.me/2349032066315"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                Chat me up on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/50 pt-8 border-t border-gray-300/20">
          <p>© {new Date().getFullYear()} Design by Timothy Idowu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
