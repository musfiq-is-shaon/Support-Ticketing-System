import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TicketCard } from './TicketCard';
import { TicketFilters } from './TicketFilters';
import { useTickets } from '../../context/TicketContext';
import { Search, Ticket, Plus, Inbox } from 'lucide-react';

export function TicketList() {
  const { tickets } = useTickets();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || 'all',
    priority: searchParams.get('priority') || 'all',
    sortBy: 'newest',
    count: 0,
  });

  useEffect(() => {
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');
    setFilters(prev => ({
      ...prev,
      status: status || 'all',
      priority: priority || 'all',
      search: search || '',
    }));
  }, [searchParams]);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(t => t.status === filters.status);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter(t => t.priority === filters.priority);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.customer.toLowerCase().includes(searchLower) ||
        t.email.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'status':
        const statusOrder = { open: 0, pending: 1, resolved: 2 };
        result.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [tickets, filters]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, count: filteredTickets.length }));
  }, [filteredTickets.length]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.status !== 'all') params.set('status', newFilters.status);
    if (newFilters.priority !== 'all') params.set('priority', newFilters.priority);
    if (newFilters.search) params.set('search', newFilters.search);
    setSearchParams(params);
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center animate-float">
            <Inbox className="w-12 h-12 text-gray-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tickets yet</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          Create your first ticket to get started with the support ticketing system.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30">
          Create Your First Ticket
        </button>
      </div>
    );
  }

  if (filteredTickets.length === 0) {
    return (
      <div className="animate-fade-in">
        <TicketFilters filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tickets found</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            Try adjusting your filters or search terms.
          </p>
          <button 
            onClick={() => handleFilterChange({ ...filters, status: 'all', priority: 'all', search: '' })}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <TicketFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{filteredTickets.length}</span> tickets
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredTickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>
    </div>
  );
}

