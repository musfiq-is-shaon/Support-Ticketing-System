import React from 'react';
import { useTickets } from '../context/TicketContext';
import { Moon, Sun, Bell, Mail, Shield, Database, Download, Trash2 } from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTickets();

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your preferences and application settings.
        </p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {theme === 'light' ? (
                <Sun className="w-6 h-6 text-white" />
              ) : (
                <Moon className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Appearance</h2>
              <p className="text-purple-100 text-sm">Customize how the interface looks</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`} onClick={toggleTheme}>
                <div className={`w-7 h-7 rounded-full bg-white shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-7' : ''
                }`}>
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-lg">
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'dark' 
                    ? 'Easy on the eyes for low-light environments' 
                    : 'Clean and bright for daytime use'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:from-violet-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-600">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Data Management</h2>
              <p className="text-blue-100 text-sm">Export or clear your application data</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download all tickets as JSON</p>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-600 text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors shadow-lg">
              Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Clear All Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reset tickets to default state</p>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Info */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Notification Settings</h3>
            <p className="text-orange-100 text-sm mb-4">
              Email and browser notifications are handled by your browser settings. 
              SupportHub saves all ticket data locally in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-lg bg-white/20 text-sm">
                ✓ All data stored locally
              </span>
              <span className="px-4 py-2 rounded-lg bg-white/20 text-sm">
                ✓ No server required
              </span>
              <span className="px-4 py-2 rounded-lg bg-white/20 text-sm">
                ✓ Privacy focused
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8 text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">SupportHub Ticketing System</span> v1.0.0 
          • Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

