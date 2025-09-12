'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Save, X } from 'lucide-react'
import TeamMemberForm from './TeamMemberForm'
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  email: string
  phone: string
  specialties: string[]
  licenses: string[]
  yearsExperience: number
  displayOrder: number
  isActive: boolean
  socialMedia: {
    linkedin?: string
    facebook?: string
  }
}

interface TeamData {
  teamMembers: TeamMember[]
  settings: {
    showSocialMedia: boolean
    showContactInfo: boolean
    showSpecialties: boolean
    showExperience: boolean
    gridColumns: number
    enableDragDrop: boolean
  }
}

const TeamAdmin = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/team')
      const data = await response.json()
      setTeamData(data)
    } catch (error) {
      console.error('Error fetching team data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setIsFormOpen(true)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
    setIsFormOpen(true)
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!teamData) return

    if (confirm('Are you sure you want to delete this team member?')) {
      const updatedMembers = teamData.teamMembers.filter(member => member.id !== memberId)
      const updatedData = {
        ...teamData,
        teamMembers: updatedMembers
      }
      
      try {
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        })
        
        if (response.ok) {
          setTeamData(updatedData)
        } else {
          console.error('Failed to delete member')
        }
      } catch (error) {
        console.error('Error deleting member:', error)
      }
    }
  }

  const handleToggleActive = async (memberId: string) => {
    if (!teamData) return

    const updatedMembers = teamData.teamMembers.map(member =>
      member.id === memberId ? { ...member, isActive: !member.isActive } : member
    )
    const updatedData = {
      ...teamData,
      teamMembers: updatedMembers
    }
    
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      
      if (response.ok) {
        setTeamData(updatedData)
      } else {
        console.error('Failed to toggle member status')
      }
    } catch (error) {
      console.error('Error toggling member status:', error)
    }
  }

  // Drag and drop functionality temporarily disabled
  // const handleDragEnd = async (result: any) => {
  //   if (!teamData || !result.destination) return

  //   const items = Array.from(teamData.teamMembers)
  //   const [reorderedItem] = items.splice(result.source.index, 1)
  //   items.splice(result.destination.index, 0, reorderedItem)

  //   // Update display order
  //   const updatedMembers = items.map((member, index) => ({
  //     ...member,
  //     displayOrder: index + 1
  //   }))

  //   const updatedData = {
  //     ...teamData,
  //     teamMembers: updatedMembers
  //   }
    
  //   try {
  //     const response = await fetch('/api/team', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(updatedData)
  //     })
      
  //     if (response.ok) {
  //       setTeamData(updatedData)
  //     } else {
  //       console.error('Failed to update display order')
  //     }
  //   } catch (error) {
  //     console.error('Error updating display order:', error)
  //   }
  // }

  const handleFormSubmit = async (memberData: Partial<TeamMember>) => {
    if (!teamData) return

    let updatedMembers: TeamMember[]

    if (editingMember) {
      // Update existing member
      updatedMembers = teamData.teamMembers.map(member =>
        member.id === editingMember.id ? { ...member, ...memberData } : member
      )
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: memberData.name || '',
        title: memberData.title || '',
        bio: memberData.bio || '',
        image: memberData.image || '/team/default-avatar.jpg',
        email: memberData.email || '',
        phone: memberData.phone || '',
        specialties: memberData.specialties || [],
        licenses: memberData.licenses || [],
        yearsExperience: memberData.yearsExperience || 0,
        displayOrder: teamData.teamMembers.length + 1,
        isActive: true,
        socialMedia: memberData.socialMedia || {}
      }
      updatedMembers = [...teamData.teamMembers, newMember]
    }

    const updatedData = {
      ...teamData,
      teamMembers: updatedMembers
    }

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      
      if (response.ok) {
        setTeamData(updatedData)
        setIsFormOpen(false)
        setEditingMember(null)
      } else {
        console.error('Failed to save member')
      }
    } catch (error) {
      console.error('Error saving member:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!teamData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Error loading team data. Please try again.</p>
      </div>
    )
  }

  const sortedMembers = [...teamData.teamMembers].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="space-y-6">
      {/* Production Warning */}
      {process.env.NODE_ENV === 'production' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Production Mode Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Changes are saved in memory and will reset when the server restarts. For permanent storage, consider implementing a database solution.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-600">{teamData.teamMembers.length} total members</p>
        </div>
        <button
          onClick={handleAddMember}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {sortedMembers.map((member, index) => (
            <div
              key={member.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {/* Order Number */}
                <div className="text-gray-400 font-mono text-sm">
                  #{member.displayOrder}
                </div>

                {/* Member Info */}
                <div className="flex-1 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      {!member.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{member.title}</p>
                    <p className="text-sm text-gray-500">
                      {member.specialties.slice(0, 3).join(', ')}
                      {member.specialties.length > 3 && '...'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(member.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      member.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={member.isActive ? 'Hide from team page' : 'Show on team page'}
                  >
                    {member.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit member"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete member"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Member Form Modal */}
      <TeamMemberForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingMember(null)
        }}
        onSubmit={handleFormSubmit}
        member={editingMember}
      />
    </div>
  )
}

export default TeamAdmin
