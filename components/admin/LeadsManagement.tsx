'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  service_type: string | null
  created_at: string
  status?: string
}

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string | null
  service_type: string
  additional_info: string | null
  status: string
  created_at: string
}

type Lead = ContactSubmission | QuoteRequest

const LeadsManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showLeadDetails, setShowLeadDetails] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    filterLeads()
  }, [leads, searchTerm, statusFilter, typeFilter])

  const fetchLeads = async () => {
    try {
      const [contactsResponse, quotesResponse] = await Promise.all([
        fetch('/api/contact-submissions'),
        fetch('/api/quote-requests')
      ])

      const contactsData = await contactsResponse.json()
      const quotesData = await quotesResponse.json()

      const allLeads: Lead[] = [
        ...(contactsData.data || []).map((lead: ContactSubmission) => ({
          ...lead,
          type: 'contact' as const
        })),
        ...(quotesData.data || []).map((lead: QuoteRequest) => ({
          ...lead,
          type: 'quote' as const
        }))
      ]

      // Sort by created_at descending (newest first)
      allLeads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setLeads(allLeads)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterLeads = () => {
    let filtered = leads

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.phone && lead.phone.includes(searchTerm)) ||
        ('service_type' in lead && lead.service_type && lead.service_type.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => {
        if ('status' in lead) {
          return lead.status === statusFilter
        }
        return statusFilter === 'new' // Contact submissions are considered 'new' by default
      })
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(lead => lead.service_type === typeFilter)
    }

    setFilteredLeads(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (lead: Lead) => {
    if ('status' in lead) {
      switch (lead.status) {
        case 'new': return 'bg-blue-100 text-blue-800'
        case 'contacted': return 'bg-yellow-100 text-yellow-800'
        case 'quoted': return 'bg-green-100 text-green-800'
        case 'closed': return 'bg-gray-100 text-gray-800'
        default: return 'bg-blue-100 text-blue-800'
      }
    }
    return 'bg-blue-100 text-blue-800'
  }

  const getStatusText = (lead: Lead) => {
    if ('status' in lead && lead.status) {
      return lead.status.charAt(0).toUpperCase() + lead.status.slice(1)
    }
    return 'New'
  }

  const getTypeIcon = (lead: Lead) => {
    return 'service_type' in lead ? Mail : FileText
  }

  const getTypeText = (lead: Lead) => {
    return 'service_type' in lead ? 'Contact Form' : 'Quote Request'
  }

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setShowLeadDetails(true)
  }

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      const endpoint = leads.find(l => l.id === leadId) && 'service_type' in leads.find(l => l.id === leadId)!
        ? '/api/contact-submissions' 
        : '/api/quote-requests'
      
      const response = await fetch(`${endpoint}/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update the lead in the local state
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead.id === leadId
              ? { ...lead, status: newStatus }
              : lead
          )
        )
        
        // Update selected lead if it's the one being updated
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus })
        }
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
            <p className="text-gray-600 mt-1">
              Manage contact form submissions and quote requests
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact Forms</option>
            <option value="quote">Quote Requests</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Clock size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Leads</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredLeads.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No leads found matching your criteria
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const TypeIcon = getTypeIcon(lead)
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleLeadClick(lead)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <TypeIcon size={20} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead)}`}>
                            {getStatusText(lead)}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                            {getTypeText(lead)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-sm text-gray-500">{lead.phone}</p>
                        )}
                        {'service_type' in lead && lead.service_type && (
                          <p className="text-sm text-primary-600 font-medium">
                            Service: {lead.service_type}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{formatDate(lead.created_at)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Eye size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500">View Details</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Lead Details</h3>
                <button
                  onClick={() => setShowLeadDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <EyeOff size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <a href={`mailto:${selectedLead.email}`} className="text-primary-600 hover:text-primary-700">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <a href={`tel:${selectedLead.phone}`} className="text-primary-600 hover:text-primary-700">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <p className="text-gray-900">{getTypeText(selectedLead)}</p>
                </div>
                {'service_type' in selectedLead && selectedLead.service_type && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <p className="text-gray-900">{selectedLead.service_type}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{formatDate(selectedLead.created_at)}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {'message' in selectedLead ? selectedLead.message : 
                     'additional_info' in selectedLead ? selectedLead.additional_info : 
                     'No message provided'}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <div className="flex space-x-2">
                  {['new', 'contacted', 'quoted', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedLead.id, status)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        ('status' in selectedLead && selectedLead.status === status)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowLeadDetails(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default LeadsManagement
