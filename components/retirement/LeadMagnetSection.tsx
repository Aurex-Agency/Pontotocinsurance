'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Scale, FileCheck, BookOpen, ArrowRight } from 'lucide-react'
import RetirementReadinessQuiz from './RetirementReadinessQuiz'
import RetirementIncomeCalculator from './RetirementIncomeCalculator'
import AnnuityComparisonTool from './AnnuityComparisonTool'
import RetirementPlanningChecklist from './RetirementPlanningChecklist'
import AnnuitySelectionGuide from './AnnuitySelectionGuide'

type LeadMagnetType = 'quiz' | 'calculator' | 'comparison' | 'checklist' | 'guide' | null

const LeadMagnetSection = () => {
  const [activeMagnet, setActiveMagnet] = useState<LeadMagnetType>(null)

  const leadMagnets = [
    {
      id: 'quiz' as const,
      title: 'Retirement Readiness Quiz',
      description: 'Discover if you\'re on track for retirement in just 2 minutes. Get your personalized score and action plan.',
      icon: Calculator,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-700',
      bgGradient: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-600',
      textColor: 'text-yellow-600',
      hoverColor: 'hover:bg-yellow-50'
    },
    {
      id: 'calculator' as const,
      title: 'Retirement Income Calculator',
      description: 'Calculate how much income you\'ll have in retirement. Get personalized projections based on your savings.',
      icon: TrendingUp,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-600',
      textColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      id: 'comparison' as const,
      title: 'Annuity Comparison Tool',
      description: 'Find the perfect annuity type for your retirement needs. Compare 5 different annuity types side-by-side.',
      icon: Scale,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-600',
      textColor: 'text-purple-600',
      hoverColor: 'hover:bg-purple-50'
    },
    {
      id: 'checklist' as const,
      title: 'Retirement Planning Checklist',
      description: 'Comprehensive checklist covering all stages of life. Ensure you\'re on track for a secure retirement.',
      icon: FileCheck,
      color: 'green',
      gradient: 'from-green-500 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-600',
      textColor: 'text-green-600',
      hoverColor: 'hover:bg-green-50'
    },
    {
      id: 'guide' as const,
      title: 'Annuity Selection Guide',
      description: 'Complete guide to choosing the right annuity. Learn about all 5 types and how to select the best one.',
      icon: BookOpen,
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-700',
      bgGradient: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-600',
      textColor: 'text-indigo-600',
      hoverColor: 'hover:bg-indigo-50'
    }
  ]

  if (activeMagnet === 'quiz') {
    return <RetirementReadinessQuiz />
  }

  if (activeMagnet === 'calculator') {
    return <RetirementIncomeCalculator />
  }

  if (activeMagnet === 'comparison') {
    return <AnnuityComparisonTool />
  }

  if (activeMagnet === 'checklist') {
    return <RetirementPlanningChecklist />
  }

  if (activeMagnet === 'guide') {
    return <AnnuitySelectionGuide />
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Retirement Planning Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our expert-created tools and guides to help you plan for a secure retirement. 
            All resources are completely free - just provide your contact information to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {leadMagnets.map((magnet) => {
            const Icon = magnet.icon
            return (
              <div
                key={magnet.id}
                onClick={() => setActiveMagnet(magnet.id)}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 ${magnet.borderColor} cursor-pointer transition-all duration-200 ${magnet.hoverColor} hover:shadow-xl`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${magnet.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{magnet.title}</h3>
                <p className="text-gray-600 mb-4">{magnet.description}</p>
                <div className={`flex items-center ${magnet.textColor} font-semibold`}>
                  <span>Get Started</span>
                  <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Plan Your Retirement?</h3>
          <p className="text-xl text-yellow-100 mb-6 max-w-2xl mx-auto">
            Our retirement planning specialists are here to help you create a comprehensive strategy 
            for a secure financial future. Get started with one of our free resources above, or 
            schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote-form"
              className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Schedule Free Consultation
            </a>
            <a
              href="tel:6622002249"
              className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Call (662) 200-2249
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadMagnetSection


