import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Key, Coins } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Layers,
      title: 'Asset Tokenization',
      description: 'Mint NFTs that represent physical products with verifiable metadata and unique identifiers',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Escrow',
      description: 'Smart contract-based escrow ensures safe transactions until delivery is verified',
    },
    {
      icon: Key,
      title: 'Ownership Transfer',
      description: 'Immutable blockchain proof of ownership with transparent transfer history',
    },
    {
      icon: Coins,
      title: 'Royalty Distribution',
      description: 'Automatic creator royalties from secondary sales, enforced by smart contracts',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              Stellexion
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <Icon size={40} className="text-electric-blue mb-4" />
                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-light-gray/70 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
