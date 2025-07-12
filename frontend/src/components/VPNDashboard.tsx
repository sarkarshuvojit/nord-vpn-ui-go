import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  BoltIcon,
  ChevronDownIcon,
  SignalIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  location: string;
}

interface VPNDashboardProps {
  user: { email: string };
  onLogout: () => void;
}

const servers: Server[] = [
  { id: '1', name: 'New York', country: 'United States', flag: '🇺🇸', ping: 25, load: 45, location: 'NYC' },
  { id: '2', name: 'London', country: 'United Kingdom', flag: '🇬🇧', ping: 42, load: 32, location: 'LON' },
  { id: '3', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 78, load: 28, location: 'TYO' },
  { id: '4', name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', ping: 35, load: 56, location: 'FRA' },
  { id: '5', name: 'Sydney', country: 'Australia', flag: '🇦🇺', ping: 165, load: 23, location: 'SYD' },
  { id: '6', name: 'Toronto', country: 'Canada', flag: '🇨🇦', ping: 38, load: 67, location: 'TOR' },
  { id: '7', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', ping: 95, load: 34, location: 'SIN' },
  { id: '8', name: 'Mumbai', country: 'India', flag: '🇮🇳', ping: 120, load: 41, location: 'BOM' },
];

export const VPNDashboard: React.FC<VPNDashboardProps> = ({ user, onLogout }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [showServerList, setShowServerList] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
        // Simulate network activity
        setDownloadSpeed(Math.random() * 50 + 10);
        setUploadSpeed(Math.random() * 20 + 5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      setConnectionTime(0);
    }
  };

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server);
    setShowServerList(false);
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return 'text-green-500';
    if (ping < 100) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLoadColor = (load: number) => {
    if (load < 30) return 'bg-green-500';
    if (load < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">SecureVPN</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-300">
              <UserCircleIcon className="w-5 h-5" />
              <span className="text-sm">{user.email}</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <PowerIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Connection Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              {/* Connection Status */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    scale: isConnected ? [1, 1.1, 1] : 1,
                    filter: isConnected ? 'drop-shadow(0 0 20px #22c55e)' : 'none'
                  }}
                  transition={{ duration: 2, repeat: isConnected ? Infinity : 0 }}
                  className="mx-auto w-32 h-32 mb-6 relative"
                >
                  <div className={clsx(
                    "w-full h-full rounded-full flex items-center justify-center transition-all duration-1000",
                    isConnected 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25" 
                      : "bg-gradient-to-r from-slate-600 to-slate-700"
                  )}>
                    {isConnected ? (
                      <ShieldCheckSolid className="w-16 h-16 text-white" />
                    ) : (
                      <ShieldCheckIcon className="w-16 h-16 text-white" />
                    )}
                  </div>
                </motion.div>
                
                <h2 className={clsx(
                  "text-2xl font-bold mb-2 transition-colors",
                  isConnected ? "text-green-400" : "text-slate-300"
                )}>
                  {isConnected ? 'Protected' : 'Disconnected'}
                </h2>
                
                <p className="text-slate-400 mb-6">
                  {isConnected 
                    ? `Connected to ${selectedServer.name}, ${selectedServer.country}` 
                    : 'Your connection is not secure'
                  }
                </p>

                {/* Connect Button */}
                <motion.button
                  onClick={handleConnect}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg",
                    isConnected
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-blue-500/25"
                  )}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </motion.button>
              </div>

              {/* Connection Stats */}
              <AnimatePresence>
                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
                  >
                    <div className="text-center">
                      <ClockIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Duration</p>
                      <p className="text-lg font-semibold text-white">{formatTime(connectionTime)}</p>
                    </div>
                    
                    <div className="text-center">
                      <ArrowDownTrayIcon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Download</p>
                      <p className="text-lg font-semibold text-white">{downloadSpeed.toFixed(1)} MB/s</p>
                    </div>
                    
                    <div className="text-center">
                      <ArrowUpTrayIcon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Upload</p>
                      <p className="text-lg font-semibold text-white">{uploadSpeed.toFixed(1)} MB/s</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Server Selection Panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                Server Selection
              </h3>

              {/* Current Server */}
              <button
                onClick={() => setShowServerList(!showServerList)}
                className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedServer.flag}</span>
                    <div className="text-left">
                      <p className="font-medium text-white">{selectedServer.name}</p>
                      <p className="text-sm text-slate-400">{selectedServer.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={clsx("text-sm font-medium", getPingColor(selectedServer.ping))}>
                      {selectedServer.ping}ms
                    </span>
                    <ChevronDownIcon className={clsx(
                      "w-4 h-4 text-slate-400 transition-transform",
                      showServerList && "rotate-180"
                    )} />
                  </div>
                </div>
              </button>

              {/* Server List */}
              <AnimatePresence>
                {showServerList && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 max-h-80 overflow-y-auto"
                  >
                    {servers.map((server) => (
                      <motion.button
                        key={server.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleServerSelect(server)}
                        className={clsx(
                          "w-full p-3 rounded-lg border transition-all text-left",
                          selectedServer.id === server.id
                            ? "bg-blue-500/20 border-blue-500/50"
                            : "bg-white/5 hover:bg-white/10 border-white/10"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{server.flag}</span>
                            <div>
                              <p className="font-medium text-white text-sm">{server.name}</p>
                              <p className="text-xs text-slate-400">{server.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <SignalIcon className="w-3 h-3 text-slate-400" />
                              <span className={clsx("text-xs font-medium", getPingColor(server.ping))}>
                                {server.ping}ms
                              </span>
                            </div>
                            
                            <div className="w-12 bg-slate-700 rounded-full h-1.5">
                              <div 
                                className={clsx("h-full rounded-full transition-all", getLoadColor(server.load))}
                                style={{ width: `${server.load}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <BoltIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-slate-300">Ultra-fast speeds</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-300">Military-grade encryption</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-300">No-logs policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};