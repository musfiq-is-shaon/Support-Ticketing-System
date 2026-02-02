import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Clock,
  User,
  Mail,
  Tag,
  Edit2,
  Trash2,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Hourglass,
} from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { EditTicketModal } from './EditTicketModal';

export function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getTicketById,
    deleteTicket,
    updateTicketStatus,
    addActivity,
    agents,
  } = useTickets();

  const ticket = getTicketById(id);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || 'open');

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ticket Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The ticket you're looking for doesn't exist.</p>
          <Link to="/tickets" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(ticket.id);
      navigate('/tickets');
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateTicketStatus(ticket.id, status, 'Admin');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addActivity(ticket.id, newComment, 'Admin', 'comment');
      setNewComment('');
    }
  };

  const statusIcons = {
    open: <AlertCircle className="w-5 h-5 text-blue-500" />,
    pending: <Hourglass className="w-5 h-5 text-amber-500" />,
    resolved: <CheckCircle className="w-5 h-5 text-green-500" />,
  };

  const statusColors = {
    open: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    pending: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300',
    resolved: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
  };

  const priorityColors = {
    low: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    medium: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300',
    high: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{ticket.title}</h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                {statusIcons[ticket.status]}
                {ticket.status}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[ticket.priority]}`}>
                {ticket.priority}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Ticket #{ticket.id} • Created {format(new Date(ticket.createdAt), 'MMM d, yyyy \'at\' h:mm a')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Activity Timeline
            </h2>

            <div className="space-y-1">
              {[...ticket.activity].reverse().map((activity, index) => (
                <div
                  key={activity.id}
                  className="relative pl-8 pb-8 last:pb-0 animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'created' ? 'bg-blue-500' :
                      activity.type === 'status_change' ? 'bg-amber-500' :
                      activity.type === 'comment' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`} />
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(activity.timestamp), 'MMM d, yyyy \'at\' h:mm a')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{activity.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Comment</h2>
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none mb-4"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send Comment
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ticket Details</h2>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <User className="w-4 h-4" />
                  Customer
                </label>
                <p className="font-medium text-gray-900 dark:text-white">{ticket.customer}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="font-medium text-gray-900 dark:text-white">{ticket.email}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <User className="w-4 h-4" />
                  Assigned To
                </label>
                <p className="font-medium text-gray-900 dark:text-white">{ticket.assignee}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Tag className="w-4 h-4" />
                  Priority
                </label>
                <select
                  value={ticket.priority}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  Last Updated
                </label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(ticket.updatedAt), 'MMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTicketModal
          ticket={ticket}
          agents={agents}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => {
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}

