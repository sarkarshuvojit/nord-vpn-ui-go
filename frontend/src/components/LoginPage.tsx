import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { IsNordVPNCLIAvailable } from '../../wailsjs/go/main/App';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNordVPNAvailable, setIsNordVPNAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkNordVPNAvailability = async () => {
      try {
        const available = await IsNordVPNCLIAvailable();
        setIsNordVPNAvailable(available);
      } catch (error) {
        console.error('Error checking NordVPN CLI availability:', error);
        setIsNordVPNAvailable(false);
      }
    };

    checkNordVPNAvailability();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6"
          >
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">SecureVPN</h1>
          <p className="text-slate-400">Your privacy is our priority</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="ml-2 text-sm text-slate-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-sm text-slate-400">or</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign up for free
              </a>
            </p>
          </div>
        </motion.div>

        {/* NordVPN CLI Status */}
        {isNordVPNAvailable !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`mt-4 p-4 rounded-xl border backdrop-blur-lg ${
              isNordVPNAvailable
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
            }`}
          >
            <div className="flex items-center">
              {isNordVPNAvailable ? (
                <ShieldCheckIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <div className="flex-1">
                {isNordVPNAvailable ? (
                  <p className="text-sm font-medium">NordVPN CLI is ready</p>
                ) : (
                  <div>
                    <p className="text-sm font-medium mb-1">NordVPN CLI not found</p>
                    <p className="text-xs text-orange-300">
                      Please install NordVPN CLI to use this application.{' '}
                      <a 
                        href="https://nordvpn.com/download/linux/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-orange-200 transition-colors"
                      >
                        Download here
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-slate-500 text-sm"
        >
          Protected by military-grade encryption
        </motion.div>
      </motion.div>
    </div>
  );
};