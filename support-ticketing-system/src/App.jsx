import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import { MainLayout } from './components/MainLayout';
import {
  Dashboard,
  TicketsPage,
  AgentsPage,
  SettingsPage,
  HelpPage,
} from './pages';
import { TicketDetail } from './components/tickets';

function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TicketProvider>
  );
}

export default App;

