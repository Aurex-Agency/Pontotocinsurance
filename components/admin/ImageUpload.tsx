'use client'

import { useState, useRef } from 'react'
import { safeImageSource, validImageUpload } from '@/lib/image-source'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const ImageUpload = ({ value, onChange, placeholder = "Enter image URL or upload file" }: ImageUploadProps) => {
  const [error, setError] = useState('')
  const [urlDraft, setUrlDraft] = useState(value)
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError('')
    if (!validImageUpload(file)) {
      setError('Choose a PNG, JPEG, GIF or WebP image no larger than 10MB.')
      return
    }
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = typeof e.target?.result === 'string' ? safeImageSource(e.target.result) : null
        if (!result) { setError('This image could not be previewed.'); return }
        setPreview(result)
        setUrlDraft(result)
        // In a real app, you would upload the file to a server and get a URL
        // For now, we'll use the data URL
        onChange(result)
      }
      reader.onerror = () => setError('This image could not be read. Please try another file.')
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const safe = safeImageSource(raw)
    setUrlDraft(raw)
    setError(raw && !safe ? 'Use an HTTPS image URL or a local image path.' : '')
    onChange(safe || '')
    setPreview(null)
  }

  const clearImage = () => {
    setError('')
    onChange('')
    setUrlDraft('')
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const displayImage = safeImageSource(preview || value)

  return (
    <div className="space-y-4">
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {/* Image Preview */}
      {displayImage && (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={encodeURI(displayImage).replace(/%25([0-9a-f]{2})/gi, '%$1')}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove image"
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <ImageIcon size={24} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Drop an image here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary-600 hover:text-primary-700"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF or WebP up to 10MB</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or enter image URL
        </label>
        <div className="relative">
          <input
            type="url"
            value={urlDraft}
            onChange={handleUrlChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Upload size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Recommended size: 400x400px. For best results, use a square image with a professional headshot.
      </p>
    </div>
  )
}

export default ImageUpload
