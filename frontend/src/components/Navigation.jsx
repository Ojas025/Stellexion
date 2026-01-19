import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Twitter, Instagram, LogIn, User } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const openAuthModal = (loginMode = true) => {
    setIsLoginMode(loginMode);
    setAuthModalOpen(true);
  };

  // Navigation items with their target IDs
  const navItems = [
    { label: 'Home', target: '#home' },
    { label: 'Features', target: '#features' },
    { label: 'How It Works', target: '#how-it-works' },
    { label: 'Contact Us', target: '#contact-us' },
  ];

  return (
    <nav className="fixed w-full bg-deep-indigo/95 backdrop-blur-sm z-50 border-b border-electric-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - clickable to scroll to top */}
          <motion.a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer"
          >
            <span className="text-2xl font-bold text-white">©</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.target}
                onClick={(e) => handleSmoothScroll(e, item.target)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-light-gray text-sm hover:text-electric-blue transition-colors cursor-pointer"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons / User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-light-gray">
                  <User size={18} />
                  <span className="text-sm">{user.first_name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-light-gray hover:text-electric-blue transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal(true)}
                  className="px-4 py-2 text-sm text-light-gray hover:text-electric-blue transition-colors flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </button>
                <button
                  onClick={() => openAuthModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-electric-blue to-magenta text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
            <div className="flex items-center space-x-4 border-l border-electric-blue/30 pl-4 ml-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light-gray hover:text-electric-blue transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light-gray hover:text-electric-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light-gray hover:text-electric-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-electric-blue"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-4"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => handleSmoothScroll(e, item.target)}
                className="block text-light-gray hover:text-electric-blue transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            {user ? (
              <>
                <div className="pt-4 border-t border-electric-blue/30">
                  <div className="flex items-center space-x-2 text-light-gray mb-3">
                    <User size={18} />
                    <span>{user.first_name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-light-gray hover:text-electric-blue transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-electric-blue/30 space-y-2">
                <button
                  onClick={() => {
                    openAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-light-gray hover:text-electric-blue transition-colors flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </button>
                <button
                  onClick={() => {
                    openAuthModal(false);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-electric-blue to-magenta text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
          isLogin={isLoginMode}
        />
      )}
    </nav>
  );
}
