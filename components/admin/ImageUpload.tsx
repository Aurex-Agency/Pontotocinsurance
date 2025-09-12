'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const ImageUpload = ({ value, onChange, placeholder = "Enter image URL or upload file" }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        // In a real app, you would upload the file to a server and get a URL
        // For now, we'll use the data URL
        onChange(result)
      }
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
    onChange(e.target.value)
    setPreview(null)
  }

  const clearImage = () => {
    onChange('')
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const displayImage = preview || value

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {displayImage && (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={clearImage}
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
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
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
            value={value}
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
