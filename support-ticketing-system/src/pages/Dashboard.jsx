import React from 'react';
import { Link } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import { format } from 'date-fns';
import {
  Ticket,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  ArrowRight,
  Zap,
  Target,
  Activity,
  BarChart3,
} from 'lucide-react';

export function Dashboard() {
  const { tickets, stats, agents } = useTickets();

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const priorityTickets = tickets.filter(t => t.priority === 'high' && t.status !== 'resolved');

  const statCards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      icon: Ticket,
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50 dark:bg-blue-900/30',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Open Tickets',
      value: stats.open,
      icon: Clock,
      gradient: 'from-blue-400 to-cyan-500',
      bgLight: 'bg-cyan-50 dark:bg-cyan-900/30',
      change: '-5%',
      trend: 'down',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: AlertCircle,
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50 dark:bg-amber-900/30',
      change: '+8%',
      trend: 'up',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgLight: 'bg-green-50 dark:bg-green-900/30',
      change: '+15%',
      trend: 'up',
    },
  ];

  const quickStats = [
    { label: 'Avg. Response Time', value: '2.4h', icon: Clock, color: 'purple' },
    { label: 'High Priority', value: stats.high, icon: Target, color: 'red' },
    { label: 'Active Agents', value: agents.filter(a => a.status === 'active').length, icon: Users, color: 'blue' },
    { label: 'Resolution Rate', value: '94%', icon: Zap, color: 'green' },
  ];

  const getQuickStatColor = (color) => {
    const colors = {
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-500',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-500',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-500',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-500',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your tickets.
          </p>
        </div>
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
        >
          <Ticket className="w-4 h-4" />
          View All Tickets
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden group hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
            
            {/* Icon background */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bgLight} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} style={{ stroke: 'url(#gradient)' }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const colorClass = getQuickStatColor(stat.color);
          return (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 flex items-center gap-3 animate-fade-in hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${(index + 4) * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              Recent Tickets
            </h2>
            <Link
              to="/tickets"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTickets.map((ticket, index) => (
              <Link
                key={ticket.id}
                to={`/tickets/${ticket.id}`}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group animate-slide-in border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  ticket.status === 'open' ? 'bg-blue-500' :
                  ticket.status === 'pending' ? 'bg-amber-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ticket.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {ticket.customer} • {format(new Date(ticket.createdAt), 'MMM d')}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.status === 'open' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                  ticket.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300' :
                  'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                }`}>
                  {ticket.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* High Priority Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              High Priority
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">
              {priorityTickets.length} pending
            </span>
          </div>

          {priorityTickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">All high priority tickets resolved!</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Great job team! 🎉</p>
            </div>
          ) : (
            <div className="space-y-3">
              {priorityTickets.map((ticket, index) => (
                <Link
                  key={ticket.id}
                  to={`/tickets/${ticket.id}`}
                  className="block p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 group animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {ticket.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {ticket.customer} • Assigned to {ticket.assignee}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                      ticket.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300' :
                      'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          Agent Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {agents.map((agent, index) => {
            const agentTickets = tickets.filter(t => t.assignee === agent.name);
            const resolvedTickets = agentTickets.filter(t => t.status === 'resolved');
            const completionRate = agentTickets.length > 0 
              ? Math.round((resolvedTickets.length / agentTickets.length) * 100) 
              : 0;

            return (
              <div
                key={agent.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{agentTickets.length} tickets</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Completion</span>
                    <span className="font-medium text-gray-900 dark:text-white">{completionRate}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

