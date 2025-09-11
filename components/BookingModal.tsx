'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  useEffect(() => {
    // Load the booking widget script
    const script = document.createElement('script')
    script.src = 'https://link.pontotocinsuranceagency.com/js/form_embed.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://link.pontotocinsuranceagency.com/js/form_embed.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[90vw] h-[80vh] max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Your Consultation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
        
        {/* Content */}
        <div className="h-[calc(100%-80px)] p-4">
          <iframe 
            src="https://link.pontotocinsuranceagency.com/widget/booking/vRy5UohrL9FaBlItzKcI" 
            style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }} 
            scrolling="no" 
            id="vRy5UohrL9FaBlItzKcI_1757630277700"
            title="Schedule Consultation"
          />
        </div>
      </div>
    </div>
  )
}

export default BookingModal
