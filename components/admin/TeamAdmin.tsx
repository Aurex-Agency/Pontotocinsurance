'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Save, X } from 'lucide-react'
import TeamMemberForm from './TeamMemberForm'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

// Sortable Team Member Card Component
function SortableTeamMemberCard({ 
  member, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  member: TeamMember
  onEdit: (member: TeamMember) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md p-6 border-2 ${
        member.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50'
      } ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
            >
              <GripVertical size={16} />
            </div>
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                member.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {member.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-gray-600">{member.title}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{member.bio}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {member.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {member.specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{member.specialties.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleActive(member.id)}
            className={`p-2 rounded-lg transition-colors ${
              member.isActive
                ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                : 'text-red-400 hover:text-red-600 hover:bg-red-100'
            }`}
            title={member.isActive ? 'Hide from team page' : 'Show on team page'}
          >
            {member.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button
            onClick={() => onEdit(member)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit team member"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete team member"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

const TeamAdmin = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
      try {
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete',
            memberId: memberId
          })
        })
        
        if (response.ok) {
          // Refresh team data from database
          await fetchTeamData()
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

    const member = teamData.teamMembers.find(m => m.id === memberId)
    if (!member) return

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          memberId: memberId,
          member: { ...member, isActive: !member.isActive }
        })
      })
      
      if (response.ok) {
        // Refresh team data from database
        await fetchTeamData()
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

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (active.id !== over.id && teamData) {
      const oldIndex = teamData.teamMembers.findIndex(member => member.id === active.id)
      const newIndex = teamData.teamMembers.findIndex(member => member.id === over.id)

      const newMembers = arrayMove(teamData.teamMembers, oldIndex, newIndex)
      
      // Update display order for all members
      const updatedMembers = newMembers.map((member, index) => ({
        ...member,
        displayOrder: index + 1
      }))

      // Update local state immediately for better UX
      setTeamData({
        ...teamData,
        teamMembers: updatedMembers
      })

      // Update display order in database
      try {
        for (const member of updatedMembers) {
          await fetch('/api/team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'update',
              memberId: member.id,
              member: { ...member, displayOrder: member.displayOrder }
            })
          })
        }
      } catch (error) {
        console.error('Error updating display order:', error)
        // Revert on error
        fetchTeamData()
      }
    }
  }

  const handleFormSubmit = async (memberData: Partial<TeamMember>) => {
    try {
      const isEditing = !!editingMember
      const action = isEditing ? 'update' : 'create'
      
      const memberPayload = {
        name: memberData.name || '',
        title: memberData.title || '',
        bio: memberData.bio || '',
        image: memberData.image || '/team/default-avatar.jpg',
        email: memberData.email || '',
        phone: memberData.phone || '',
        specialties: memberData.specialties || [],
        licenses: memberData.licenses || [],
        yearsExperience: memberData.yearsExperience || 0,
        displayOrder: teamData?.teamMembers.length || 0,
        isActive: true,
        socialMedia: memberData.socialMedia || {}
      }

      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          memberId: editingMember?.id,
          member: memberPayload
        })
      })
      
      if (response.ok) {
        // Refresh team data from database
        await fetchTeamData()
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedMembers.map(member => member.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-gray-200">
              {sortedMembers.map((member) => (
                <SortableTeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
