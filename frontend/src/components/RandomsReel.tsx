import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import random1 from '@/assets/reels/pic.png';
import random2 from '@/assets/reels/pic1.png';
import random3 from '@/assets/reels/pic2.png';
import random4 from '@/assets/reels/pic3.png';
import random5 from '@/assets/reels/dread.png';
import random6 from '@/assets/reels/king.jpg';

const AUTO_SCROLL_SPEED = 0.45;

type ReelRowProps = {
  images: string[];
  direction: 1 | -1;
};

const ReelRow = ({ images, direction }: ReelRowProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const loopedImages = [...images, ...images, ...images];

  useEffect(() => {
    const element = scrollerRef.current;
    if (!element) {
      return;
    }

    const loopWidth = element.scrollWidth / 3;
    if (loopWidth > 0) {
      element.scrollLeft = loopWidth;
    }

    const animate = () => {
      if (!isDraggingRef.current && !isPaused) {
        const nextScrollLeft = element.scrollLeft + AUTO_SCROLL_SPEED * direction;
        const currentLoopWidth = element.scrollWidth / 3;

        if (nextScrollLeft >= currentLoopWidth * 2) {
          element.scrollLeft = nextScrollLeft - currentLoopWidth;
        } else if (nextScrollLeft <= 0) {
          element.scrollLeft = nextScrollLeft + currentLoopWidth;
        } else {
          element.scrollLeft = nextScrollLeft;
        }
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    const handleResize = () => {
      const resizedLoopWidth = element.scrollWidth / 3;
      if (resizedLoopWidth > 0) {
        element.scrollLeft = resizedLoopWidth;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, isPaused, images.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    pointerStartXRef.current = event.clientX;
    scrollStartRef.current = element.scrollLeft;
    element.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element || !isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - pointerStartXRef.current;
    const loopWidth = element.scrollWidth / 3;
    let nextScrollLeft = scrollStartRef.current - deltaX;

    if (nextScrollLeft < loopWidth) {
      nextScrollLeft += loopWidth;
      pointerStartXRef.current = event.clientX;
      scrollStartRef.current = nextScrollLeft;
    } else if (nextScrollLeft > loopWidth * 2) {
      nextScrollLeft -= loopWidth;
      pointerStartXRef.current = event.clientX;
      scrollStartRef.current = nextScrollLeft;
    }

    element.scrollLeft = nextScrollLeft;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    stopDragging();
    setIsPaused(false);
  };

  return (
    <div
      ref={scrollerRef}
      className={`overflow-x-hidden overflow-y-hidden fade-edges touch-pan-y select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onPointerEnter={() => setIsPaused(true)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={handlePointerLeave}
    >
      <div className="flex gap-6 w-max py-1">
        {loopedImages.map((img, index) => (
          <div
            key={`${img}-${index}`}
            className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden"
          >
            <img
              src={img}
              alt={`Random reel image ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const RandomsReel = () => {
  const row1Images = [random1, random2, random3, random4, random5, random6];
  const row2Images = [random6, random5, random4, random3, random2, random1];

  return (
    <section className="w-full py-20 bg-background">
      <div className="px-10 mb-12">
        <h2 className="text-2xl md:text-6xl lg:text-7xl font-bold text-foreground">
          Randoms Reel
        </h2>
      </div>

      <div className="mb-6">
        <ReelRow images={row1Images} direction={1} />
      </div>

      <ReelRow images={row2Images} direction={-1} />
    </section>
  );
};

export default RandomsReel;
