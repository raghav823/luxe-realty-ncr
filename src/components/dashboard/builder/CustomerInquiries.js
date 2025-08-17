import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, User, MessageSquare, Search,
  ChevronDown, Clock, CheckCircle, XCircle, AlertCircle, Reply
} from 'lucide-react';

const CustomerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    property: 'all',
    dateRange: '7days',
    searchTerm: ''
  });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Fetch inquiries from API
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/inquiries'); // replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch inquiries');
        const data = await response.json();
        setInquiries(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  // Helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'replied': return <AlertCircle className="h-4 w-4 text-blue-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'closed': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'replied': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'resolved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'closed': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesStatus = filters.status === 'all' || inquiry.status === filters.status;
    const matchesProperty = filters.property === 'all' || inquiry.propertyName === filters.property;
    const matchesSearch =
      inquiry.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      inquiry.propertyName.toLowerCase().includes(filters.searchTerm.toLowerCase());

    let withinDateRange = true;
    if (filters.dateRange !== 'all') {
      const inquiryDate = new Date(inquiry.createdAt);
      const days = parseInt(filters.dateRange.replace('days', ''));
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      withinDateRange = inquiryDate >= cutoff;
    }

    return matchesStatus && matchesProperty && matchesSearch && withinDateRange;
  });

  // Update inquiry status
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');

      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  // Send reply
  const handleReply = async () => {
    if (selectedInquiry && replyText.trim()) {
      try {
        const response = await fetch(`/api/inquiries/${selectedInquiry.id}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reply: replyText })
        });
        if (!response.ok) throw new Error('Failed to send reply');

        handleStatusChange(selectedInquiry.id, 'replied');
        setShowModal(false);
        setReplyText('');
        setSelectedInquiry(null);
      } catch (err) {
        console.error(err);
        alert('Failed to send reply');
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Customer Inquiries</h1>
            <p className="text-gray-400">Manage and respond to customer inquiries</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Total:</span>
            <span className="text-lg font-semibold text-yellow-400">{filteredInquiries.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inquiries..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                value={filters.searchTerm}
                onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
              />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Property */}
            <div className="relative">
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                value={filters.property}
                onChange={(e) => setFilters({...filters, property: e.target.value})}
              >
                <option value="all">All Properties</option>
                {Array.from(new Set(inquiries.map(i => i.propertyName))).map((property, idx) => (
                  <option key={idx} value={property}>{property}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Range */}
            <div className="relative">
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No inquiries found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(inquiry.priority)}`}></div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-white">{inquiry.customerName}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(inquiry.status)}
                            <span className="capitalize">{inquiry.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{inquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{inquiry.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{inquiry.propertyName}</span>
                      </div>
                      {inquiry.budget && (
                        <div className="flex items-center space-x-1">
                          <span className="text-green-400 font-medium">{inquiry.budget}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{inquiry.message}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => { setSelectedInquiry(inquiry); setShowModal(true); }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>

                    <div className="relative">
                      <select
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none pr-8"
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-3 h-3 w-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reply Modal */}
        {showModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Reply to {selectedInquiry.customerName}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Original Inquiry:</h4>
                <p className="text-gray-300 text-sm">{selectedInquiry.message}</p>
                <div className="mt-2 text-xs text-gray-400">
                  Property: {selectedInquiry.propertyName} • Budget: {selectedInquiry.budget}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Reply</label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 rounded-lg font-medium transition-colors"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerInquiries;
