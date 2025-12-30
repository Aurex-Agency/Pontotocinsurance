'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Send, Download } from 'lucide-react'

const RetirementIncomeCalculator = () => {
  const [step, setStep] = useState<'form' | 'calculator' | 'results'>('form')
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: ''
  })
  const [inputs, setInputs] = useState({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    expectedReturn: '7',
    socialSecurity: '',
    pension: '',
    desiredIncome: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone) {
      return
    }
    setStep('calculator')
  }

  const calculateRetirement = () => {
    const currentAge = parseInt(inputs.currentAge) || 0
    const retirementAge = parseInt(inputs.retirementAge) || 65
    const currentSavings = parseFloat(inputs.currentSavings.replace(/[^0-9.]/g, '')) || 0
    const monthlyContribution = parseFloat(inputs.monthlyContribution.replace(/[^0-9.]/g, '')) || 0
    const annualReturn = parseFloat(inputs.expectedReturn) / 100 || 0.07
    const monthlyReturn = annualReturn / 12
    const yearsToRetirement = Math.max(0, retirementAge - currentAge)
    const monthsToRetirement = yearsToRetirement * 12

    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement)

    // Calculate future value of monthly contributions (annuity)
    let futureValueOfContributions = 0
    if (monthlyContribution > 0 && monthsToRetirement > 0) {
      futureValueOfContributions = monthlyContribution * 
        ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn)
    }

    const totalRetirementSavings = futureValueOfCurrentSavings + futureValueOfContributions

    // Calculate annual income from savings (4% rule)
    const annualIncomeFromSavings = totalRetirementSavings * 0.04
    const monthlyIncomeFromSavings = annualIncomeFromSavings / 12

    // Add other income sources
    const socialSecurity = parseFloat(inputs.socialSecurity.replace(/[^0-9.]/g, '')) || 0
    const pension = parseFloat(inputs.pension.replace(/[^0-9.]/g, '')) || 0
    const totalMonthlyIncome = monthlyIncomeFromSavings + (socialSecurity / 12) + (pension / 12)
    const totalAnnualIncome = totalMonthlyIncome * 12

    const desiredIncome = parseFloat(inputs.desiredIncome.replace(/[^0-9.]/g, '')) || 0
    const incomeGap = desiredIncome > 0 ? desiredIncome - totalAnnualIncome : 0

    return {
      totalRetirementSavings,
      annualIncomeFromSavings,
      monthlyIncomeFromSavings,
      totalAnnualIncome,
      totalMonthlyIncome,
      incomeGap,
      yearsToRetirement
    }
  }

  const handleCalculate = async () => {
    setIsSubmitting(true)
    const results = calculateRetirement()

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
          source: 'Retirement Income Calculator',
          leadMagnet: 'Retirement Income Calculator',
          calculatorInputs: inputs,
          calculatorResults: results,
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
      console.error('Error submitting calculator:', error)
      setSubmitStatus('error')
      setStep('results')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <Calculator size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Retirement Income Calculator</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Calculate how much income you'll have in retirement
                </p>
                <p className="text-gray-500">
                  Get a personalized projection of your retirement income based on your current savings and contributions
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Get:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <DollarSign size={20} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Projected retirement savings at your target age</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp size={20} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Estimated monthly and annual retirement income</span>
                  </li>
                  <li className="flex items-start">
                    <Calculator size={20} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Income gap analysis and recommendations</span>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Access Calculator</span>
                  <Calculator size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'calculator') {
    const results = calculateRetirement()

    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Retirement Income Calculator</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Your Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Age
                    </label>
                    <input
                      type="number"
                      value={inputs.currentAge}
                      onChange={(e) => setInputs(prev => ({ ...prev, currentAge: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retirement Age
                    </label>
                    <input
                      type="number"
                      value={inputs.retirementAge}
                      onChange={(e) => setInputs(prev => ({ ...prev, retirementAge: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Retirement Savings
                    </label>
                    <input
                      type="text"
                      value={inputs.currentSavings}
                      onChange={(e) => setInputs(prev => ({ ...prev, currentSavings: e.target.value }))}
                      placeholder="$0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution
                    </label>
                    <input
                      type="text"
                      value={inputs.monthlyContribution}
                      onChange={(e) => setInputs(prev => ({ ...prev, monthlyContribution: e.target.value }))}
                      placeholder="$0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.expectedReturn}
                      onChange={(e) => setInputs(prev => ({ ...prev, expectedReturn: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Default: 7% (historical average)</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Additional Income Sources</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Social Security
                    </label>
                    <input
                      type="text"
                      value={inputs.socialSecurity}
                      onChange={(e) => setInputs(prev => ({ ...prev, socialSecurity: e.target.value }))}
                      placeholder="$0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Pension Income
                    </label>
                    <input
                      type="text"
                      value={inputs.pension}
                      onChange={(e) => setInputs(prev => ({ ...prev, pension: e.target.value }))}
                      placeholder="$0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Annual Retirement Income
                    </label>
                    <input
                      type="text"
                      value={inputs.desiredIncome}
                      onChange={(e) => setInputs(prev => ({ ...prev, desiredIncome: e.target.value }))}
                      placeholder="$0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Projected Results</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Years to Retirement:</span>
                        <span className="font-semibold">{results.yearsToRetirement} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Savings at Retirement:</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(results.totalRetirementSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Income from Savings:</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(results.monthlyIncomeFromSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Monthly Income:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.totalMonthlyIncome)}</span>
                      </div>
                      {results.incomeGap !== 0 && (
                        <div className={`flex justify-between pt-2 border-t ${results.incomeGap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          <span className="font-semibold">Income Gap:</span>
                          <span className="font-bold">{formatCurrency(Math.abs(results.incomeGap))} {results.incomeGap > 0 ? 'shortfall' : 'surplus'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving Results...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Get My Detailed Report</span>
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
    const results = calculateRetirement()

    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <DollarSign size={64} className="text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Retirement Income Projection</h2>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-8">
                <div className="text-center">
                  <div className="text-sm text-blue-100 mb-2">Projected Monthly Retirement Income</div>
                  <div className="text-5xl font-bold mb-2">{formatCurrency(results.totalMonthlyIncome)}</div>
                  <div className="text-blue-100">or {formatCurrency(results.totalAnnualIncome)} annually</div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Breakdown:</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Savings at Retirement:</span>
                      <span className="font-semibold">{formatCurrency(results.totalRetirementSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Income from Savings (4% rule):</span>
                      <span className="font-semibold">{formatCurrency(results.monthlyIncomeFromSavings)}</span>
                    </div>
                    {parseFloat(inputs.socialSecurity.replace(/[^0-9.]/g, '')) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Social Security:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(inputs.socialSecurity.replace(/[^0-9.]/g, '')) / 12)}/month</span>
                      </div>
                    )}
                    {parseFloat(inputs.pension.replace(/[^0-9.]/g, '')) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pension:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(inputs.pension.replace(/[^0-9.]/g, '')) / 12)}/month</span>
                      </div>
                    )}
                  </div>
                </div>

                {results.incomeGap > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
                    <h3 className="font-semibold text-red-900 mb-2">Income Gap Detected</h3>
                    <p className="text-red-700 mb-4">
                      You have a projected shortfall of {formatCurrency(results.incomeGap)} per year. 
                      We can help you close this gap with strategic planning and annuities.
                    </p>
                  </div>
                )}

                {results.incomeGap <= 0 && (
                  <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
                    <h3 className="font-semibold text-green-900 mb-2">Great News!</h3>
                    <p className="text-green-700">
                      Your projected income exceeds your desired retirement income. 
                      Let's optimize your strategy to maximize your wealth.
                    </p>
                  </div>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">Your detailed report has been saved! A retirement specialist will contact you within 24 hours.</p>
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  A retirement planning expert will contact you to discuss:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Ways to increase your retirement savings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Annuity options for guaranteed income</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Tax-optimization strategies</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Report</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Learn More
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

export default RetirementIncomeCalculator


