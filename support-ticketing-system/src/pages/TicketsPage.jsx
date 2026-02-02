import React from 'react';
import { TicketList } from '../components/tickets';

export function TicketsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track all support tickets in one place.
        </p>
      </div>
      <TicketList />
    </div>
  );
}

