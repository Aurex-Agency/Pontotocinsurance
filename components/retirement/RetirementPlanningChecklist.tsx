'use client'

import { useState } from 'react'
import { FileCheck, Download, Send, CheckCircle } from 'lucide-react'

const RetirementPlanningChecklist = () => {
  const [step, setStep] = useState<'form' | 'download'>('form')
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

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
          source: 'Retirement Planning Checklist',
          leadMagnet: 'Retirement Planning Checklist',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setStep('download')
        // Generate and download PDF
        generatePDF()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatePDF = () => {
    const checklistContent = `
RETIREMENT PLANNING CHECKLIST
Pontotoc Insurance Agency

EARLY PLANNING (20s-30s)
☐ Start contributing to employer 401(k) plan
☐ Contribute enough to get full employer match
☐ Open and fund an IRA (Traditional or Roth)
☐ Establish emergency fund (3-6 months expenses)
☐ Review and update beneficiary designations
☐ Create a basic retirement savings goal
☐ Understand your risk tolerance
☐ Start tracking your net worth annually

MID-CAREER (40s-50s)
☐ Maximize 401(k) contributions ($22,500+ in 2023)
☐ Maximize IRA contributions ($6,500+ in 2023)
☐ Consider catch-up contributions (age 50+)
☐ Review and rebalance investment portfolio
☐ Calculate retirement income needs
☐ Estimate Social Security benefits
☐ Review pension options (if applicable)
☐ Consider long-term care insurance
☐ Update estate planning documents
☐ Review tax strategies
☐ Consider annuities for guaranteed income
☐ Meet with financial advisor annually

PRE-RETIREMENT (55-65)
☐ Review retirement timeline and goals
☐ Calculate total retirement savings needed
☐ Estimate healthcare costs in retirement
☐ Understand Medicare enrollment timing
☐ Review Social Security claiming strategies
☐ Consider Roth conversions
☐ Review required minimum distributions (RMDs)
☐ Plan for tax-efficient withdrawals
☐ Consider downsizing or relocating
☐ Create retirement budget
☐ Test retirement budget for 3-6 months
☐ Review and update estate plan
☐ Discuss retirement with spouse/partner
☐ Plan for Social Security optimization
☐ Consider annuities for income protection

RETIREMENT (65+)
☐ Enroll in Medicare (if applicable)
☐ Begin Social Security benefits (if ready)
☐ Set up systematic withdrawal plan
☐ Take required minimum distributions
☐ Review and adjust investment allocation
☐ Monitor retirement income vs. expenses
☐ Review healthcare coverage annually
☐ Update beneficiary designations
☐ Review estate plan every 3-5 years
☐ Consider charitable giving strategies
☐ Stay informed about tax law changes
☐ Review long-term care needs
☐ Plan for potential healthcare costs

ANNUAL REVIEW ITEMS
☐ Review retirement account balances
☐ Rebalance investment portfolio
☐ Update retirement goals and timeline
☐ Review insurance coverage
☐ Update beneficiary designations
☐ Review tax strategies
☐ Meet with financial advisor
☐ Review estate planning documents
☐ Calculate updated retirement projections
☐ Review and adjust budget

ANNUITY CONSIDERATIONS
☐ Understand different annuity types
☐ Evaluate need for guaranteed income
☐ Compare annuity rates and features
☐ Review surrender charges and fees
☐ Consider inflation protection options
☐ Review death benefit options
☐ Consult with annuity specialist
☐ Compare multiple annuity providers
☐ Understand tax implications
☐ Review annuity in overall retirement plan

IMPORTANT CONTACTS
Financial Advisor: _______________________
Accountant: _______________________
Estate Attorney: _______________________
Insurance Agent: _______________________

NOTES
_________________________________________
_________________________________________
_________________________________________

© ${new Date().getFullYear()} Pontotoc Insurance Agency
For personalized retirement planning assistance, contact us:
Phone: (662) 200-2249
Email: info@pontotocinsuranceagency.com
    `

    // Create a blob and download
    const blob = new Blob([checklistContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Retirement-Planning-Checklist.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-green-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                    <FileCheck size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Retirement Planning Checklist</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Comprehensive checklist to ensure you're on track for retirement
                </p>
                <p className="text-gray-500">
                  Download your free retirement planning checklist covering all stages of life
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Early planning steps (20s-30s)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Mid-career planning (40s-50s)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pre-retirement checklist (55-65)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Retirement maintenance items</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Annuity consideration guide</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      <span>Download Free Checklist</span>
                    </>
                  )}
                </button>

                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">Sorry, there was an error. Please try again or call us at (662) 200-2249.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'download') {
    return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-green-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-green-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Checklist Downloaded!</h2>
                <p className="text-xl text-gray-600">
                  Your retirement planning checklist should be downloading now
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">Thank you! A retirement planning specialist will contact you within 24 hours.</p>
                </div>
              )}

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  Use this checklist to track your retirement planning progress. A specialist will contact you to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Review your checklist progress</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Provide personalized recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Answer any questions about retirement planning</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Again</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
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

export default RetirementPlanningChecklist


