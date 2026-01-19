import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Lock, Zap, Globe } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: 'Connect Wallet',
      description: 'Link your blockchain wallet securely',
      number: '01',
    },
    {
      icon: Lock,
      title: 'Verify Identity',
      description: 'Complete secure identity verification',
      number: '02',
    },
    {
      icon: Zap,
      title: 'Order Card',
      description: 'Select and customize your physical card',
      number: '03',
    },
    {
      icon: Globe,
      title: 'Use Anywhere',
      description: 'Use your card globally with crypto backing',
      number: '04',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">How </span>
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-lg border border-electric-blue/20 bg-electric-blue/5 hover:border-magenta/40 hover:bg-magenta/5 transition-all"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-electric-blue to-magenta rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step.number}
                </div>

                <Icon size={32} className="text-electric-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-light-gray/70">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
