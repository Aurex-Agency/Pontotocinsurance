'use client'

import { useState } from 'react'
import { Scale, CheckCircle, Send, Download, Info } from 'lucide-react'

interface AnnuityType {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string
}

const AnnuityComparisonTool = () => {
  const [step, setStep] = useState<'form' | 'comparison' | 'results'>('form')
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: ''
  })
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const annuityTypes: AnnuityType[] = [
    {
      id: 'fixed',
      name: 'Fixed Annuity',
      description: 'Provides a guaranteed interest rate for a specific period, offering stability and predictability.',
      pros: [
        'Guaranteed interest rate',
        'Principal protection',
        'Predictable income',
        'Low risk'
      ],
      cons: [
        'Lower potential returns',
        'Limited growth potential',
        'Inflation risk over time'
      ],
      bestFor: 'Conservative investors seeking guaranteed returns and principal protection'
    },
    {
      id: 'variable',
      name: 'Variable Annuity',
      description: 'Allows investment in sub-accounts (similar to mutual funds) with potential for higher returns.',
      pros: [
        'Growth potential',
        'Tax-deferred growth',
        'Investment options',
        'Death benefit protection'
      ],
      cons: [
        'Market risk',
        'Higher fees',
        'No principal guarantee',
        'Complex structure'
      ],
      bestFor: 'Investors comfortable with market risk seeking growth potential'
    },
    {
      id: 'indexed',
      name: 'Indexed Annuity',
      description: 'Returns linked to a market index (like S&P 500) with downside protection.',
      pros: [
        'Market participation',
        'Principal protection',
        'Growth potential',
        'Downside protection'
      ],
      cons: [
        'Caps on gains',
        'Complex formulas',
        'Limited liquidity',
        'Surrender charges'
      ],
      bestFor: 'Investors wanting market growth with principal protection'
    },
    {
      id: 'immediate',
      name: 'Immediate Annuity',
      description: 'Begins payments immediately after a lump-sum purchase, providing instant income.',
      pros: [
        'Immediate income',
        'Guaranteed payments',
        'Lifetime income option',
        'Simple structure'
      ],
      cons: [
        'No access to principal',
        'Irreversible decision',
        'Inflation risk',
        'No inheritance value'
      ],
      bestFor: 'Retirees needing immediate, guaranteed income'
    },
    {
      id: 'deferred',
      name: 'Deferred Annuity',
      description: 'Accumulates value tax-deferred until you choose to start receiving payments.',
      pros: [
        'Tax-deferred growth',
        'Flexible payout timing',
        'Accumulation phase',
        'Income later'
      ],
      cons: [
        'Surrender charges',
        'Limited access',
        'Tax on withdrawals',
        'Complex rules'
      ],
      bestFor: 'Those planning for future retirement income needs'
    }
  ]

  const needsOptions = [
    'Guaranteed income for life',
    'Principal protection',
    'Growth potential',
    'Tax-deferred savings',
    'Immediate income',
    'Inflation protection',
    'Estate planning',
    'Long-term care benefits'
  ]

  const getRecommendedAnnuities = () => {
    const scores: { [key: string]: number } = {}
    
    annuityTypes.forEach(annuity => {
      let score = 0
      
      if (selectedNeeds.includes('Guaranteed income for life')) {
        if (annuity.id === 'immediate' || annuity.id === 'fixed') score += 3
        if (annuity.id === 'deferred') score += 2
      }
      if (selectedNeeds.includes('Principal protection')) {
        if (annuity.id === 'fixed' || annuity.id === 'indexed') score += 3
        if (annuity.id === 'immediate') score += 2
      }
      if (selectedNeeds.includes('Growth potential')) {
        if (annuity.id === 'variable' || annuity.id === 'indexed') score += 3
        if (annuity.id === 'deferred') score += 2
      }
      if (selectedNeeds.includes('Tax-deferred savings')) {
        if (annuity.id === 'deferred' || annuity.id === 'variable') score += 3
        if (annuity.id === 'indexed') score += 2
      }
      if (selectedNeeds.includes('Immediate income')) {
        if (annuity.id === 'immediate') score += 3
        if (annuity.id === 'fixed') score += 1
      }
      if (selectedNeeds.includes('Inflation protection')) {
        if (annuity.id === 'variable' || annuity.id === 'indexed') score += 2
      }
      
      scores[annuity.id] = score
    })

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id]) => annuityTypes.find(a => a.id === id)!)
      .filter(Boolean)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone) {
      return
    }
    setStep('comparison')
  }

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev => 
      prev.includes(need) 
        ? prev.filter(n => n !== need)
        : [...prev, need]
    )
  }

  const handleSubmitResults = async () => {
    setIsSubmitting(true)
    const recommendations = getRecommendedAnnuities()

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
          source: 'Annuity Comparison Tool',
          leadMagnet: 'Annuity Comparison Tool',
          selectedNeeds: selectedNeeds,
          recommendedAnnuities: recommendations.map(a => a.id),
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
      console.error('Error submitting comparison:', error)
      setSubmitStatus('error')
      setStep('results')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                    <Scale size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Annuity Comparison Tool</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Find the perfect annuity type for your retirement needs
                </p>
                <p className="text-gray-500">
                  Compare different annuity types and get personalized recommendations
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Get:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Scale size={20} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Side-by-side comparison of 5 annuity types</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Personalized recommendations based on your needs</span>
                  </li>
                  <li className="flex items-start">
                    <Info size={20} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Free consultation with an annuity specialist</span>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Comparison</span>
                  <Scale size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'comparison') {
    const recommendations = getRecommendedAnnuities()

    return (
      <section className="section-padding bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Annuity Comparison Tool</h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Retirement Needs:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {needsOptions.map((need) => (
                    <button
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedNeeds.includes(need)
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedNeeds.includes(need)
                            ? 'border-purple-600 bg-purple-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedNeeds.includes(need) && (
                            <CheckCircle size={16} className="text-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{need}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedNeeds.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Annuities for You:</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {recommendations.map((annuity, index) => (
                      <div key={annuity.id} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-900">{annuity.name}</h4>
                          <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            #{index + 1} Match
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-4">{annuity.description}</p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-gray-600">Best For:</span>
                            <p className="text-sm text-gray-700">{annuity.bestFor}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Complete Annuity Comparison:</h3>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {annuityTypes.map((annuity) => (
                      <div key={annuity.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">{annuity.name}</h4>
                        <p className="text-xs text-gray-600 mb-4">{annuity.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-green-700 mb-1">Pros:</div>
                          <ul className="space-y-1">
                            {annuity.pros.map((pro, i) => (
                              <li key={i} className="text-xs text-gray-700 flex items-start">
                                <span className="text-green-600 mr-1">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-red-700 mb-1">Cons:</div>
                          <ul className="space-y-1">
                            {annuity.cons.map((con, i) => (
                              <li key={i} className="text-xs text-gray-700 flex items-start">
                                <span className="text-red-600 mr-1">✗</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmitResults}
                disabled={selectedNeeds.length === 0 || isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving Results...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Get My Personalized Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'results') {
    const recommendations = getRecommendedAnnuities()

    return (
      <section className="section-padding bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-purple-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Annuity Recommendations</h2>
                <p className="text-xl text-gray-600">
                  Based on your needs, here are the best annuity options for you
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {recommendations.map((annuity, index) => (
                  <div key={annuity.id} className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{annuity.name}</h3>
                      <span className="bg-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                        #{index + 1} Recommendation
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{annuity.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {annuity.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Best For:</h4>
                        <p className="text-sm text-gray-700">{annuity.bestFor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">Your recommendations have been saved! An annuity specialist will contact you within 24 hours.</p>
                </div>
              )}

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  An annuity specialist will contact you to discuss:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Detailed comparison of recommended annuities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Current annuity rates and quotes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Customized strategy for your retirement goals</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Report</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Learn More About Annuities
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

export default AnnuityComparisonTool


