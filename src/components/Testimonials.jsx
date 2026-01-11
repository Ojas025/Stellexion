import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Crypto Investor',
      image: '👨‍💼',
      text: 'Stellexion made managing my crypto assets incredibly easy. The card works everywhere!',
      rating: 5,
      button: 'Connect with Alex',
    },
    {
      name: 'Sarah Chen',
      role: 'Tech Entrepreneur',
      image: '👩‍💼',
      text: 'The security features are top-notch. I trust my assets completely on this platform.',
      rating: 5,
      button: 'Learn from Sarah',
    },
    {
      name: 'Marcus Davis',
      role: 'Blockchain Dev',
      image: '👨‍💻',
      text: 'Finally, a solution that bridges crypto and physical commerce seamlessly.',
      rating: 5,
      button: 'Join Developers',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">What Users </span>
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Join thousands of satisfied users worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg border border-electric-blue/20 bg-electric-blue/5 hover:border-magenta/40 hover:bg-magenta/5 transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-electric-blue text-electric-blue" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-light-gray/80 mb-6 italic">&quot;{testimonial.text}&quot;</p>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-electric-blue/10">
                <span className="text-3xl">{testimonial.image}</span>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-light-gray/60">{testimonial.role}</p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full px-4 py-2 text-sm bg-gradient-to-r from-electric-blue/20 to-magenta/20 border border-electric-blue/40 text-electric-blue rounded hover:bg-gradient-to-r hover:from-electric-blue/40 hover:to-magenta/40 transition-all flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                {testimonial.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
