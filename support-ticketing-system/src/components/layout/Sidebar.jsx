import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tickets', icon: Ticket, label: 'Tickets' },
  { to: '/agents', icon: Users, label: 'Agents' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 flex flex-col z-30 transition-all duration-300">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Ticket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">SupportHub</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ticketing System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
        
        {/* Help Link */}
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </NavLink>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@supporthub.com</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">5 open tickets</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium">
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

