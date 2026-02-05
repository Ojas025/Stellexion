import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does it take to get my card?",
      answer:
        "Your physical card will be delivered within 5-7 business days after verification. You can start using it immediately upon arrival.",
      button: "Track Order",
    },
    {
      question: "Is my cryptocurrency safe with Stellexion?",
      answer:
        "Yes! We use military-grade encryption, cold storage, and blockchain verification to ensure maximum security of your assets.",
      button: "Learn Security",
    },
    {
      question: "What countries do you support?",
      answer:
        "We currently support 150+ countries worldwide. You can use your Stellexion card anywhere Visa or Mastercard is accepted.",
      button: "View Supported Countries",
    },
    {
      question: "What are the transaction fees?",
      answer:
        "Our fees are transparent and competitive. Standard transfers: 0.5%, withdrawals: 1%, with no hidden charges ever.",
      button: "View Pricing",
    },
    {
      question: "How do I activate my digital wallet?",
      answer:
        "After signing up and verifying your identity, you can activate your wallet in just 3 steps through our mobile app or website.",
      button: "Start Activation",
    },
    {
      question: "Can I use the card offline?",
      answer:
        "Yes! Your Stellexion card works offline at any merchant. Transactions are settled instantly once connection is restored.",
      button: "See Features",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-electric-blue/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Frequently </span>
            <span className="bg-gradient-to-r from-electric-blue to-magenta bg-clip-text text-transparent">
              Asked Questions
            </span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Have questions? We have answers. Check out our FAQ or contact our
            support team.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-electric-blue/20 rounded-lg overflow-hidden hover:border-magenta/40 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 bg-electric-blue/5 hover:bg-electric-blue/10 flex items-center justify-between transition-all"
              >
                <span className="flex items-center gap-3 text-left">
                  <HelpCircle
                    size={20}
                    className="text-electric-blue flex-shrink-0"
                  />
                  <span className="font-semibold text-white text-sm md:text-base">
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  className={`text-electric-blue flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "top" }}
                    className="px-6 py-4 bg-electric-blue/5 border-t border-electric-blue/20"
                  >
                    <p className="text-light-gray/80 mb-4 text-sm">
                      {faq.answer}
                    </p>
                    <button className="inline-flex items-center gap-2 text-electric-blue hover:text-magenta transition-colors font-semibold text-xs md:text-sm px-3 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded hover:bg-electric-blue/20">
                      {faq.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-lg border border-electric-blue/20 bg-electric-blue/5"
        >
          <Mail size={32} className="text-electric-blue mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-light-gray/70 mb-6">
            Our support team is here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-electric-blue to-magenta text-white font-semibold rounded hover:opacity-90 transition-all">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-electric-blue/40 text-electric-blue rounded hover:bg-electric-blue/10 transition-all">
              Schedule Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
