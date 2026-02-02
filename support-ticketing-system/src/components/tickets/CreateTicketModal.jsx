import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';

export function CreateTicketModal({ onClose, onSubmit }) {
  const { agentNames } = useTickets();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    customer: '',
    email: '',
    assignee: agentNames[0] || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.customer.trim()) newErrors.customer = 'Customer name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 w-full h-full bg-black/50"
        onClick={handleBackdropClick}
      />
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Create New Ticket
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the issue"
              className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed description of the issue..."
              className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map(priority => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                  className={`py-2.5 px-4 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                    formData.priority === priority
                      ? priority === 'high'
                        ? 'bg-red-500 text-white'
                        : priority === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Customer Name *
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.customer ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.customer && (
              <p className="mt-1 text-sm text-red-500">{errors.customer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@example.com"
              className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Assign To
            </label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {agentNames.length > 0 ? (
                agentNames.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))
              ) : (
                <option value="">No agents available</option>
              )}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

