import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact-us" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-light-gray/70 mb-12 text-lg max-w-2xl mx-auto">
            Join thousands of users revolutionizing the way they manage their digital assets.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              const emailInput = e.target.querySelector('input[type="email"]');
              const email = emailInput?.value;
              if (email) {
                alert(`Thank you for joining! We'll send updates to ${email}`);
                emailInput.value = '';
              } else {
                alert('Please enter a valid email address');
              }
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-6 py-4 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors w-full sm:w-64"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-electric-blue to-magenta text-white font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Get Early Access
              <ArrowRight size={20} />
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-light-gray/50 mt-8"
          >
            <Mail size={16} className="inline mr-2" />
            Questions? Email us at hello@stellexion.com
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
