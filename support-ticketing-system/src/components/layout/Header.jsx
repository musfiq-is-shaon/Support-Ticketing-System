import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Plus,
  Menu,
  X,
} from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { CreateTicketModal } from '../tickets/CreateTicketModal';

export function Header({ onMenuClick }) {
  const { theme, toggleTheme, createTicket } = useTickets();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tickets?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCreateTicket = (data) => {
    createTicket(data);
    setShowCreateModal(false);
  };

  return (
    <>
      <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 transition-all duration-300">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Mobile search toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {showMobileSearch ? <X className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
          </button>

          {/* Search bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center gap-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl px-4 py-2.5 w-80 transition-all duration-300 focus-within:bg-white dark:focus-within:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile search bar */}
          {showMobileSearch && (
            <form
              onSubmit={handleSearch}
              className="absolute top-16 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:hidden animate-slide-up shadow-lg"
            >
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 rounded-xl px-4 py-2.5">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                />
              </div>
            </form>
          )}

          {/* Create ticket button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            <Plus className="w-4 h-4" />
            <span>New Ticket</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* User menu */}
          <button className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm shadow-lg">
              A
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin
            </span>
          </button>
        </div>
      </header>

      {/* Create ticket modal */}
      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </>
  );
}
