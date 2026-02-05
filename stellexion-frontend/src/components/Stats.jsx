import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { number: '80K+', label: 'Active Users', button: 'Join Community' },
    { number: '$380M+', label: 'Assets Secured', button: 'View Wallets' },
    { number: '27+', label: 'Countries', button: 'View Details' },
    { number: '24/7', label: 'Support ', button: 'Get Help' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-electric-blue/5 border border-electric-blue/20 rounded-lg hover:border-magenta/40 hover:bg-magenta/5 transition-all"
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-light-gray/70 text-sm mb-4">{stat.label}</p>
              <button className="w-full px-4 py-2 text-sm bg-gradient-to-r from-electric-blue/20 to-magenta/20 border border-electric-blue/40 text-electric-blue rounded hover:bg-gradient-to-r hover:from-electric-blue/40 hover:to-magenta/40 transition-all">
                {stat.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
