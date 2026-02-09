import { Star, Quote } from 'lucide-react';
import client1 from '@/assets/client-1.jpg';
import client2 from '@/assets/client-2.jpg';
import client3 from '@/assets/client-3.jpg';
import client4 from '@/assets/client-4.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: client1,
    text: 'Timothy delivered our MVP ahead of schedule and exceeded all expectations. His attention to detail and problem-solving skills are exceptional. Highly recommend for any startup looking for a reliable developer.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    image: client2,
    text: 'Working with Timothy was a game-changer for our business. He took our messy codebase and transformed it into something beautiful and maintainable. Communication was seamless throughout.',
  },
  {
    id: 3,
    name: 'Emily Nakamura',
    image: client3,
    text: 'Fantastic experience from start to finish. Timothy understood our vision immediately and brought it to life with precision. Our dashboard is now a joy to use.',
  },
  {
    id: 4,
    name: 'Raj Patel',
    image: client4,
    text: 'Timothy is not just a developer, he is a problem solver. He identified issues we did not even know we had and fixed them proactively. Our e-commerce platform has never performed better.',
  },
];

const TestimonialsSection = () => {
  const doubledTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="w-full py-20 bg-[#111111]">
      <div className="px-10 mb-16">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          WRITTEN TESTIMONIALS FROM MY CLIENTS
        </h2>
      </div>

      <div className="overflow-hidden fade-edges">
        <div className="flex gap-6 marquee">
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[28rem] glass-card p-8"
            >
              {/* Header: Stars & Quote */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold mr-2">5/5</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <Quote className="text-muted-foreground" size={32} />
              </div>

              {/* Testimonial Text */}
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <span className="text-white font-medium">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
