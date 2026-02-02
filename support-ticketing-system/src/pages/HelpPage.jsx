import React from 'react';
import {
  MessageCircle,
  Book,
  Mail,
  Video,
  FileText,
  ChevronRight,
  Search,
  ExternalLink,
  Users,
  Zap,
  Shield,
} from 'lucide-react';

const helpTopics = [
  {
    icon: FileText,
    title: 'Getting Started',
    description: 'Learn the basics of using SupportHub',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 dark:bg-blue-900/30',
    articles: ['Quick Start Guide', 'Understanding Tickets', 'Dashboard Overview']
  },
  {
    icon: MessageCircle,
    title: 'Managing Tickets',
    description: 'Create, edit, and organize support tickets',
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50 dark:bg-purple-900/30',
    articles: ['Creating Tickets', 'Ticket Status Workflow', 'Priority Levels', 'Assigning Tickets']
  },
  {
    icon: Users,
    title: 'Agent Management',
    description: 'Work effectively with your team',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-900/30',
    articles: ['Agent Roles', 'Performance Tracking', 'Team Collaboration']
  },
  {
    icon: Book,
    title: 'Best Practices',
    description: 'Tips for efficient support operations',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-900/30',
    articles: ['Response Templates', 'SLA Guidelines', 'Customer Communication']
  }
];

const faqs = [
  {
    question: 'How do I create a new ticket?',
    answer: 'Click the "New Ticket" button in the header or navigate to the Tickets page and use the "Create Ticket" button.'
  },
  {
    question: 'Can I change ticket priority?',
    answer: 'Yes, you can edit any ticket to change its priority level (Low, Medium, or High) at any time.'
  },
  {
    question: 'How does the status workflow work?',
    answer: 'Tickets flow through three stages: Open → Pending → Resolved. You can change status from the ticket detail view.'
  },
  {
    question: 'Is my data saved?',
    answer: 'Yes! All data is stored locally in your browser using LocalStorage. It persists across page refreshes.'
  }
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30 animate-float">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Search our knowledge base or browse topics below to find answers to your questions.
        </p>
        
        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg transition-all duration-200"
          />
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {helpTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl ${topic.bgLight} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <topic.icon className={`w-7 h-7 bg-gradient-to-r ${topic.color} bg-clip-text text-transparent`} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {topic.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {topic.description}
                </p>
                <ul className="space-y-2">
                  {topic.articles.map((article, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                      {article}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-12 shadow-sm">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-emerald-100 text-sm">Quick answers to common questions</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Still need help?</h3>
              <p className="text-gray-300 text-sm">
                Our support team is here to assist you 24/7
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
            <Mail className="w-5 h-5" />
            Contact Support
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">SupportHub Documentation</span> v1.0 • Last updated February 2024
        </p>
      </div>
    </div>
  );
}

