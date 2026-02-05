import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

const BACKEND_URL =import.meta.env.BACKEND_URL;

export default function AuthModal({ isOpen, onClose, onAuthSuccess, isLogin: initialIsLogin = true }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
          };

      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token if provided
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        onAuthSuccess(data.user);
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          password: '',
        });
      } else {
        setError(data.detail || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
    });
  };

  // Update isLogin when prop changes
  React.useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Container - Perfectly Centered in Viewport */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-deep-indigo border border-electric-blue/30 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          style={{ margin: '0 auto', marginTop: '560px' }}
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-electric-blue/20 to-magenta/20 border-b border-electric-blue/30 p-6"
          style={{height: '70px', padding: '10px'}}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={onClose}
                className="text-light-gray hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-light-gray/70 text-sm mt-2"
            style={{margin: '0px'}}
            >
              {isLogin
                ? 'Sign in to continue to Stellexion'
                : 'Join the phygital commerce revolution'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4" 
          style={{paddingBottom: '0px'}}
          >
            {error && (
              <motion.div 
              
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-light-gray/70 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-electric-blue"
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full pl-10 pr-4 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-light-gray/70 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-electric-blue"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full pl-10 pr-4 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-light-gray/70 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-electric-blue"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm text-light-gray/70 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-electric-blue"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-light-gray/70 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-electric-blue"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-white placeholder-light-gray/50 focus:outline-none focus:border-electric-blue transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-electric-blue hover:text-magenta transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-electric-blue to-magenta text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-[100px]"
              style={{marginTop: '10px'}}
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center"
            style={{margin: '10px'}}
            >
              <button
                type="button"
                onClick={switchMode}
                className="text-electric-blue hover:text-magenta transition-colors text-sm"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

