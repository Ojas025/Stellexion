import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Zap, Gift, Users } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Lock,
      title: 'Maximum Security',
      description: 'Your assets are protected with encryption and blockchain verification.',
      button: 'More About Security',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Get your product delivered within 5-7 business days and start using immediately.',
      button: 'Order Now',
    },
    {
      icon: Gift,
      title: 'Exclusive Rewards',
      description: 'Earn cashback, points, and exclusive perks on every purchase.',
      button: 'See Rewards',
    },
    {
      icon: Users,
      title: 'Community Benefits',
      description: 'Join 100K+ users and get access to exclusive events and networking.',
      button: 'Join Community',
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
            <span className="text-white">Your </span>
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              Complete Benefits
            </span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Experience a new way to manage and grow your digital wealth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-lg border border-electric-blue/20 bg-electric-blue/5 hover:border-magenta/40 hover:bg-magenta/5 transition-all"
              >
                <Icon size={40} className="text-electric-blue mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-light-gray/70 mb-6">{benefit.description}</p>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to contact section for actions, or show info
                    if (benefit.button === 'Order Now' || benefit.button === 'Join Community') {
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
                    } else {
                      // For "More About Security" and "See Rewards", show info
                      alert(`Learn more about ${benefit.title} - Coming soon!`);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-electric-blue hover:text-magenta transition-colors font-semibold text-sm cursor-pointer"
                >
                  {benefit.button}
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
