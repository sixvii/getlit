import random1 from '@/assets/reels/pic.png';
import random2 from '@/assets/reels/pic1.png';
import random3 from '@/assets/reels/pic2.png';
import random4 from '@/assets/reels/pic3.png';
import random5 from '@/assets/reels/dread.png';
import random6 from '@/assets/reels/king.jpg';

const RandomsReel = () => {
  const row1Images = [random1, random2, random3, random4, random5, random6];
  const row2Images = [random6, random5, random4, random3, random2, random1];

  // Double for seamless loop
  const doubledRow1 = [...row1Images, ...row1Images];
  const doubledRow2 = [...row2Images, ...row2Images];

  return (
    <section className="w-full py-20 bg-[#111111]">
      <div className="px-10 mb-12">
        <h2 className="text-2xl md:text-6xl lg:text-7xl font-bold text-white">
          Randoms Reel
        </h2>
      </div>

      {/* Row 1 - Scrolling Left */}
      <div className="overflow-hidden mb-6 fade-edges">
        <div className="flex gap-6 marquee">
          {doubledRow1.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden"
            >
              <img
                src={img}
                alt={`Random ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="overflow-hidden fade-edges">
        <div className="flex gap-6 marquee-reverse">
          {doubledRow2.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden"
            >
              <img
                src={img}
                alt={`Random ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RandomsReel;
