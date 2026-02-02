import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TicketContext = createContext();

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialAgents = [
  { id: '1', name: 'John Smith', email: 'john@support.com', role: 'Senior Agent', department: 'Technical Support', status: 'active', avatar: null },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@support.com', role: 'Support Agent', department: 'Billing', status: 'active', avatar: null },
  { id: '3', name: 'Mike Chen', email: 'mike@support.com', role: 'Support Agent', department: 'General', status: 'active', avatar: null },
  { id: '4', name: 'Emily Brown', email: 'emily@support.com', role: 'Senior Agent', department: 'Technical Support', status: 'active', avatar: null },
  { id: '5', name: 'Jessica Taylor', email: 'jessica@support.com', role: 'Team Lead', department: 'Customer Success', status: 'active', avatar: null },
];

const initialTickets = [
  {
    id: '1',
    title: 'Unable to access account after password reset',
    description: 'I reset my password yesterday but now I cannot log in. The system says my credentials are invalid.',
    status: 'open',
    priority: 'high',
    assignee: 'John Smith',
    customer: 'Alice Johnson',
    email: 'alice@example.com',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    activity: [
      { id: '1', type: 'created', message: 'Ticket created', user: 'Alice Johnson', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: '2', type: 'assigned', message: 'Assigned to John Smith', user: 'System', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
  },
  {
    id: '2',
    title: 'Billing discrepancy on latest invoice',
    description: 'My latest invoice shows charges that I do not recognize. The amount is $299 instead of the expected $199.',
    status: 'pending',
    priority: 'medium',
    assignee: 'Sarah Wilson',
    customer: 'Bob Martinez',
    email: 'bob@example.com',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    activity: [
      { id: '1', type: 'created', message: 'Ticket created', user: 'Bob Martinez', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: '2', type: 'status_change', message: 'Status changed to pending', user: 'Sarah Wilson', timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: '3', type: 'comment', message: 'Looking into this issue with the billing department', user: 'Sarah Wilson', timestamp: new Date(Date.now() - 3600000).toISOString() },
    ],
  },
  {
    id: '3',
    title: 'Feature request: Dark mode support',
    description: 'It would be great to have a dark mode option in the application for better usability at night.',
    status: 'resolved',
    priority: 'low',
    assignee: 'Mike Chen',
    customer: 'Carol Davis',
    email: 'carol@example.com',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    activity: [
      { id: '1', type: 'created', message: 'Ticket created', user: 'Carol Davis', timestamp: new Date(Date.now() - 86400000 * 10).toISOString() },
      { id: '2', type: 'comment', message: 'Great suggestion! We will consider this for our next release', user: 'Mike Chen', timestamp: new Date(Date.now() - 86400000 * 8).toISOString() },
      { id: '3', type: 'status_change', message: 'Status changed to resolved', user: 'Mike Chen', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
    ],
  },
  {
    id: '4',
    title: 'API integration returning 500 errors',
    description: 'Our integration with your API started failing yesterday with 500 errors. This is affecting our production system.',
    status: 'open',
    priority: 'high',
    assignee: 'Emily Brown',
    customer: 'Tech Corp Inc.',
email: 'support@techcorp.com',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    activity: [
      { id: '1', type: 'created', message: 'Ticket created', user: 'Tech Corp Inc.', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
      { id: '2', type: 'assigned', message: 'Assigned to Emily Brown', user: 'System', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    ],
  },
  {
    id: '5',
    title: 'How to export data to CSV?',
    description: 'I need to export my project data to a CSV file for reporting purposes. Is this feature available?',
    status: 'resolved',
    priority: 'low',
    assignee: 'John Smith',
    customer: 'Diana Lee',
    email: 'diana@example.com',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    activity: [
      { id: '1', type: 'created', message: 'Ticket created', user: 'Diana Lee', timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: '2', type: 'comment', message: 'You can export data by going to Settings > Data > Export. I have closed this as it appears to be a how-to question.', user: 'John Smith', timestamp: new Date(Date.now() - 86400000 * 6).toISOString() },
      { id: '3', type: 'status_change', message: 'Status changed to resolved', user: 'John Smith', timestamp: new Date(Date.now() - 86400000 * 6).toISOString() },
    ],
  },
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : initialTickets;
  });

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('agents');
    return saved ? JSON.parse(saved) : initialAgents;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const addAgent = useCallback((agentData) => {
    const newAgent = {
      id: generateId(),
      ...agentData,
      status: 'active',
      avatar: null,
    };
    setAgents(prev => [...prev, newAgent]);
    return newAgent;
  }, []);

  const updateAgent = useCallback((id, updates) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === id ? { ...agent, ...updates } : agent
      )
    );
  }, []);

  const removeAgent = useCallback((id) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  }, []);

  const createTicket = useCallback((ticketData) => {
    const newTicket = {
      id: generateId(),
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activity: [
        {
          id: generateId(),
          type: 'created',
          message: 'Ticket created',
          user: ticketData.customer,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  }, []);

  const updateTicket = useCallback((id, updates) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === id) {
          const activityEntry = {
            id: generateId(),
            type: 'updated',
            message: 'Ticket updated',
            user: 'System',
            timestamp: new Date().toISOString(),
          };
          return {
            ...ticket,
            ...updates,
            updatedAt: new Date().toISOString(),
            activity: [...ticket.activity, activityEntry],
          };
        }
        return ticket;
      })
    );
  }, []);

  const updateTicketStatus = useCallback((id, status, user) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === id) {
          const activityEntry = {
            id: generateId(),
            type: 'status_change',
            message: `Status changed to ${status}`,
            user,
            timestamp: new Date().toISOString(),
          };
          return {
            ...ticket,
            status,
            updatedAt: new Date().toISOString(),
            activity: [...ticket.activity, activityEntry],
          };
        }
        return ticket;
      })
    );
  }, []);

  const deleteTicket = useCallback((id) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  }, []);

  const addActivity = useCallback((ticketId, message, user, type = 'comment') => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const activityEntry = {
            id: generateId(),
            type,
            message,
            user,
            timestamp: new Date().toISOString(),
          };
          return {
            ...ticket,
            updatedAt: new Date().toISOString(),
            activity: [...ticket.activity, activityEntry],
          };
        }
        return ticket;
      })
    );
  }, []);

  const getTicketById = useCallback((id) => {
    return tickets.find(ticket => ticket.id === id);
  }, [tickets]);

  const getAgentById = useCallback((id) => {
    return agents.find(agent => agent.id === id);
  }, [agents]);

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    high: tickets.filter(t => t.priority === 'high').length,
  };

  const agentNames = agents.map(a => a.name);

  const value = {
    tickets,
    agents,
    theme,
    toggleTheme,
    addAgent,
    updateAgent,
    removeAgent,
    createTicket,
    updateTicket,
    updateTicketStatus,
    deleteTicket,
    addActivity,
    getTicketById,
    getAgentById,
    stats,
    agentNames,
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
