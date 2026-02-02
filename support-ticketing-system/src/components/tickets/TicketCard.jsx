import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Clock,
  User,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  CheckCircle,
  Clock3,
} from 'lucide-react';
import { useTickets } from '../../context/TicketContext';

export function TicketCard({ ticket }) {
  const { deleteTicket } = useTickets();

  const statusConfig = {
    open: {
      colors: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
      icon: Clock3,
      iconColor: 'text-blue-500',
      label: 'Open',
      glow: 'glow-blue',
    },
    pending: {
      colors: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
      icon: Clock,
      iconColor: 'text-amber-500',
      label: 'Pending',
      glow: 'glow-amber',
    },
    resolved: {
      colors: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      label: 'Resolved',
      glow: 'glow-green',
    },
  };

  const priorityConfig = {
    low: {
      colors: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      icon: null,
    },
    medium: {
      colors: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300',
      icon: null,
    },
    high: {
      colors: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
      icon: AlertCircle,
    },
  };

  const status = statusConfig[ticket.status] || statusConfig.open;
  const priority = priorityConfig[ticket.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;
  const PriorityIcon = priority.icon;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(ticket.id);
    }
  };

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className={`relative block bg-white dark:bg-gray-800 rounded-xl border-2 ${status.colors} p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden`}
    >
      {/* Status indicator bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
        ticket.status === 'open' ? 'bg-gradient-to-b from-blue-500 to-blue-600' :
        ticket.status === 'pending' ? 'bg-gradient-to-b from-amber-500 to-orange-500' :
        'bg-gradient-to-b from-green-500 to-emerald-500'
      }`} />

      {/* Header */}
      <div className="ml-3 flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.colors.replace('bg-', 'bg-opacity-80 ').replace('border-', '')}`}>
            <StatusIcon className={`w-3.5 h-3.5 ${status.iconColor}`} />
            {status.label}
          </span>
          {/* Priority badge */}
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${priority.colors}`}>
            {PriorityIcon && <PriorityIcon className="w-3.5 h-3.5" />}
            {ticket.priority}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
        {ticket.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
        {ticket.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
              {ticket.customer.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline">{ticket.customer}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{format(new Date(ticket.createdAt), 'MMM d')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>{ticket.activity.length}</span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="text-xs px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          Delete
        </button>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Link>
  );
}
