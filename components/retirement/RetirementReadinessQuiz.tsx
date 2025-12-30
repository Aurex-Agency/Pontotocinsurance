'use client'

import { useState } from 'react'
import { Calculator, CheckCircle, AlertCircle, TrendingUp, Download, Send } from 'lucide-react'

interface QuizAnswers {
  age: string
  retirementAge: string
  currentSavings: string
  monthlyContribution: string
  riskTolerance: string
  retirementGoals: string
  socialSecurity: string
  employerPlan: string
}

const RetirementReadinessQuiz = () => {
  const [step, setStep] = useState<'form' | 'quiz' | 'results'>('form')
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: ''
  })
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    riskTolerance: '',
    retirementGoals: '',
    socialSecurity: '',
    employerPlan: ''
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const questions = [
    {
      id: 'age',
      question: 'What is your current age?',
      type: 'select',
      options: ['Under 30', '30-39', '40-49', '50-59', '60-69', '70+']
    },
    {
      id: 'retirementAge',
      question: 'At what age do you plan to retire?',
      type: 'select',
      options: ['55-59', '60-64', '65', '66-70', '70+', 'Not sure']
    },
    {
      id: 'currentSavings',
      question: 'How much have you saved for retirement so far?',
      type: 'select',
      options: ['Less than $25,000', '$25,000 - $100,000', '$100,000 - $250,000', '$250,000 - $500,000', '$500,000 - $1M', 'More than $1M']
    },
    {
      id: 'monthlyContribution',
      question: 'How much are you currently saving per month for retirement?',
      type: 'select',
      options: ['Less than $200', '$200 - $500', '$500 - $1,000', '$1,000 - $2,000', 'More than $2,000', 'Not currently saving']
    },
    {
      id: 'riskTolerance',
      question: 'How would you describe your risk tolerance?',
      type: 'select',
      options: ['Very Conservative', 'Conservative', 'Moderate', 'Aggressive', 'Very Aggressive']
    },
    {
      id: 'retirementGoals',
      question: 'What is your primary retirement goal?',
      type: 'select',
      options: ['Maintain current lifestyle', 'Travel extensively', 'Start a business', 'Leave inheritance', 'Just survive financially']
    },
    {
      id: 'socialSecurity',
      question: 'Do you expect to receive Social Security benefits?',
      type: 'select',
      options: ['Yes, full benefits', 'Yes, reduced benefits', 'Not sure', 'No']
    },
    {
      id: 'employerPlan',
      question: 'Do you have access to an employer-sponsored retirement plan (401k, 403b, etc.)?',
      type: 'select',
      options: ['Yes, and I contribute', 'Yes, but I don\'t contribute', 'No', 'Not sure']
    }
  ]

  const calculateScore = () => {
    let score = 0
    const maxScore = 100

    // Age factor (younger = better)
    if (answers.age === 'Under 30') score += 20
    else if (answers.age === '30-39') score += 18
    else if (answers.age === '40-49') score += 15
    else if (answers.age === '50-59') score += 12
    else if (answers.age === '60-69') score += 8
    else score += 5

    // Savings factor
    if (answers.currentSavings === 'More than $1M') score += 25
    else if (answers.currentSavings === '$500,000 - $1M') score += 20
    else if (answers.currentSavings === '$250,000 - $500,000') score += 15
    else if (answers.currentSavings === '$100,000 - $250,000') score += 10
    else if (answers.currentSavings === '$25,000 - $100,000') score += 5
    else score += 2

    // Contribution factor
    if (answers.monthlyContribution === 'More than $2,000') score += 20
    else if (answers.monthlyContribution === '$1,000 - $2,000') score += 15
    else if (answers.monthlyContribution === '$500 - $1,000') score += 10
    else if (answers.monthlyContribution === '$200 - $500') score += 5
    else score += 2

    // Employer plan factor
    if (answers.employerPlan === 'Yes, and I contribute') score += 15
    else if (answers.employerPlan === 'Yes, but I don\'t contribute') score += 5
    else score += 0

    // Social Security factor
    if (answers.socialSecurity === 'Yes, full benefits') score += 10
    else if (answers.socialSecurity === 'Yes, reduced benefits') score += 7
    else score += 3

    // Risk tolerance (moderate is ideal)
    if (answers.riskTolerance === 'Moderate') score += 10
    else if (answers.riskTolerance === 'Conservative' || answers.riskTolerance === 'Aggressive') score += 7
    else score += 5

    return Math.min(score, maxScore)
  }

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'green', message: 'You\'re on track for a secure retirement!' }
    if (score >= 60) return { level: 'Good', color: 'yellow', message: 'You\'re doing well, but there\'s room for improvement.' }
    if (score >= 40) return { level: 'Fair', color: 'orange', message: 'You need to take action to improve your retirement readiness.' }
    return { level: 'Needs Attention', color: 'red', message: 'Immediate action is needed to secure your retirement future.' }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone) {
      return
    }
    setStep('quiz')
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmitResults()
    }
  }

  const handleSubmitResults = async () => {
    setIsSubmitting(true)
    const score = calculateScore()
    const readiness = getReadinessLevel(score)

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/3433cf41-731f-4a93-9074-2c37e3c9c0a2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          zipCode: leadData.zipCode,
          service: 'retirement',
          source: 'Retirement Readiness Quiz',
          leadMagnet: 'Retirement Readiness Quiz',
          quizScore: score,
          quizLevel: readiness.level,
          quizAnswers: answers,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setStep('results')
      } else {
        setSubmitStatus('error')
        setStep('results')
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      setSubmitStatus('error')
      setStep('results')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Calculator size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Retirement Readiness Quiz</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Discover if you're on track for retirement in just 2 minutes
                </p>
                <p className="text-gray-500">
                  Get your personalized retirement readiness score and action plan
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Get:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Your personalized retirement readiness score</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customized recommendations based on your answers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Free consultation with a retirement planning expert</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={leadData.firstName}
                      onChange={(e) => setLeadData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={leadData.lastName}
                      onChange={(e) => setLeadData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={leadData.email}
                    onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={leadData.phone}
                    onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={leadData.zipCode}
                    onChange={(e) => setLeadData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Quiz</span>
                  <TrendingUp size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'quiz') {
    const question = questions[currentQuestion]
    const answer = answers[question.id as keyof QuizAnswers]

    return (
      <section className="section-padding bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h2>

              <div className="space-y-3 mb-8">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answer === option
                        ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!answer || isSubmitting}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Calculating...' : currentQuestion === questions.length - 1 ? 'Get My Results' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'results') {
    const score = calculateScore()
    const readiness = getReadinessLevel(score)

    return (
      <section className="section-padding bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  {readiness.color === 'green' ? (
                    <CheckCircle size={64} className="text-green-600" />
                  ) : readiness.color === 'yellow' ? (
                    <AlertCircle size={64} className="text-yellow-600" />
                  ) : (
                    <AlertCircle size={64} className="text-red-600" />
                  )}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Retirement Readiness Score</h2>
                <div className="text-6xl font-bold text-yellow-600 mb-2">{score}/100</div>
                <div className={`text-2xl font-semibold mb-4 ${
                  readiness.color === 'green' ? 'text-green-600' :
                  readiness.color === 'yellow' ? 'text-yellow-600' :
                  readiness.color === 'orange' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {readiness.level}
                </div>
                <p className="text-xl text-gray-600">{readiness.message}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Personalized Recommendations:</h3>
                <ul className="space-y-3 text-gray-700">
                  {score < 60 && (
                    <>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Increase your monthly retirement contributions by at least 10%</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Consider maximizing your employer match if available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Explore annuities for guaranteed retirement income</span>
                      </li>
                    </>
                  )}
                  {score >= 60 && (
                    <>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Continue your current savings strategy</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Consider tax-advantaged retirement accounts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Review your investment allocation annually</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  A retirement planning specialist will contact you within 24 hours to discuss your personalized retirement strategy.
                </p>
                <p className="text-sm text-gray-600">
                  We'll help you create a comprehensive plan to maximize your retirement savings and ensure a secure financial future.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                  <p className="text-sm font-medium">Your results have been saved! We'll be in touch soon.</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Full Report</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Learn More About Retirement Planning
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return null
}

export default RetirementReadinessQuiz


