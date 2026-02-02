# Support Ticketing System

A modern, feature-rich Customer Support Ticketing System built with React, Vite, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Support+Ticketing+System)

## ✨ Features

### Core Functionality
- **Ticket Management**: Create, edit, and delete support tickets
- **Status Workflow**: Open → Pending → Resolved
- **Priority Levels**: Low, Medium, High
- **Agent Assignment**: Assign tickets to support agents
- **Search & Filter**: Find tickets by status, priority, or search terms
- **Activity Timeline**: Track all ticket activity with comments

### Dashboard
- **Stats Overview**: Total, Open, Pending, Resolved tickets
- **Recent Tickets**: Quick view of latest tickets
- **High Priority Alerts**: Highlight urgent tickets
- **Agent Performance**: Completion rates and ticket counts

### Technical Features
- **LocalStorage Persistence**: Data survives page refreshes
- **Dark/Light Mode**: Full theme support with system preference detection
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd support-ticketing-system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Vercel Deployment

1. Push your code to a Git repository
2. Import the project in Vercel
3. Vercel automatically detects the configuration
4. Deploy!

```bash
# Manual deploy
vercel --prod
```

## 📁 Project Structure

```
support-ticketing-system/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Sidebar
│   │   ├── tickets/         # Ticket components
│   │   ├── agents/          # Agent management
│   │   └── MainLayout.jsx   # Main layout wrapper
│   ├── context/
│   │   └── TicketContext.jsx # Global state management
│   ├── pages/
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── TicketsPage.jsx  # Tickets list
│   │   ├── AgentsPage.jsx   # Agent management
│   │   ├── SettingsPage.jsx # Settings
│   │   └── HelpPage.jsx     # Help page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',  // Hover state
  },
  // Add more custom colors...
}
```

### Dark Mode
The system automatically:
- Detects system preference
- Respects manual toggle in settings
- Persists preference in localStorage

## 📦 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 🔒 Data Persistence

All data is stored in LocalStorage:
- Tickets: `tickets` key
- Theme preference: `theme` key
- Agents: Managed in TicketContext

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for any purpose.

---

Built with ❤️ using React, Vite, and Tailwind CSS

