import React from 'react';
import { Filter, ArrowUpDown, SlidersHorizontal } from 'lucide-react';

export function TicketFilters({ filters, onFilterChange }) {
  const statusOptions = ['all', 'open', 'pending', 'resolved'];
  const priorityOptions = ['all', 'low', 'medium', 'high'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">Filters</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer hover:border-blue-400"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer hover:border-blue-400"
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort filter */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer hover:border-blue-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Found</span>
          <span className="font-bold text-gray-900 dark:text-white text-lg">{filters.count}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">tickets</span>
        </div>
      </div>
    </div>
  );
}

