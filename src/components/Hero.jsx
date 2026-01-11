import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
        >
          <span className="text-white">
            Digital{' '}
            <span className="bg-gradient-to-r from-electric-blue via-magenta to-violet bg-clip-text text-transparent">
              Revolution
            </span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-light-gray/80 mb-12 max-w-2xl mx-auto"
        >
          Own it digitally, use it physically.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-light-gray/70 mb-12 max-w-xl mx-auto"
        >
          Experience the future of digital commerce. Seamlessly blend the digital and physical worlds with cutting-edge blockchain technology.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector('#contact-us');
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-electric-blue to-magenta text-white font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer"
        >
          Join Waiting List
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </section>
  );
}
