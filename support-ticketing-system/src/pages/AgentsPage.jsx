import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { format } from 'date-fns';
import { 
  User, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Plus,
  Edit2,
  Trash2,
  Building,
  Briefcase,
  MoreVertical,
  TrendingUp,
} from 'lucide-react';
import { AddAgentModal, EditAgentModal } from '../components/agents';

export function AgentsPage() {
  const { tickets, agents, removeAgent } = useTickets();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleDeleteAgent = (agent) => {
    setShowDeleteConfirm(agent);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      removeAgent(showDeleteConfirm.id);
      setShowDeleteConfirm(null);
      setOpenMenu(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    return status === 'active' 
      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const getTicketStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300';
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusDotClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-amber-500';
      case 'resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const agentGradients = [
    'from-blue-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-purple-600',
    'from-cyan-500 to-blue-600',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your support team members
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
        >
          <Plus className="w-4 h-4" />
          Add Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{agents.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Agents</p>
            </div>
          </div>
        </div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {agents.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            </div>
          </div>
        </div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {agents.filter(a => a.status === 'inactive').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => {
          const agentTickets = tickets.filter(t => t.assignee === agent.name);
          const openTickets = agentTickets.filter(t => t.status === 'open');
          const pendingTickets = agentTickets.filter(t => t.status === 'pending');
          const resolvedTickets = agentTickets.filter(t => t.status === 'resolved');
          const completionRate = agentTickets.length > 0 
            ? Math.round((resolvedTickets.length / agentTickets.length) * 100) 
            : 0;

          const gradient = agentGradients[index % agentGradients.length];

          return (
            <div
              key={agent.id}
              className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden group hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
              
              {/* Background decoration */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />

              {/* Header */}
              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, '--tw-gradient-from': gradient.split(' ')[1], '--tw-gradient-to': gradient.split(' ')[3] }}>
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{agent.email}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === agent.id ? null : agent.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                  {openMenu === agent.id && (
                    <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10 animate-scale-in origin-top-right">
                      <button
                        onClick={() => {
                          setEditingAgent(agent);
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteAgent(agent);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Role & Department */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-4 h-4" />
                  <span>{agent.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <Building className="w-4 h-4" />
                  <span>{agent.department}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                {agent.status === 'active' ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <XCircle className="w-4 h-4" />
                    Inactive
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {agentTickets.length}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Total</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {pendingTickets.length}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">Pending</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {resolvedTickets.length}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Resolved</p>
                </div>
              </div>

              {/* Completion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                  <span className="font-medium text-gray-900 dark:text-white">{completionRate}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* Recent Tickets */}
              {agentTickets.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Recent Tickets
                  </h4>
                  <div className="space-y-2">
                    {agentTickets
                      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                      .slice(0, 2)
                      .map(ticket => (
                        <div
                          key={ticket.id}
                          className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusDotClass(ticket.status)}`} />
                          <p className="flex-1 text-sm text-gray-900 dark:text-white truncate">
                            {ticket.title}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTicketStatusClass(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Agent Modal */}
      {showAddModal && (
        <AddAgentModal
          onClose={() => setShowAddModal(false)}
          onSubmit={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Agent Modal */}
      {editingAgent && (
        <EditAgentModal
          agent={editingAgent}
          onClose={() => setEditingAgent(null)}
          onSubmit={() => setEditingAgent(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div 
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Delete Agent
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

