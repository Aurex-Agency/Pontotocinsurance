'use client'

import { useState } from 'react'
import { BookOpen, Download, Send, CheckCircle } from 'lucide-react'

const AnnuitySelectionGuide = () => {
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
          source: 'Annuity Selection Guide',
          leadMagnet: 'Annuity Selection Guide',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setStep('download')
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
    const guideContent = `
THE COMPLETE GUIDE TO ANNUITY SELECTION
Pontotoc Insurance Agency

TABLE OF CONTENTS
1. Understanding Annuities
2. Types of Annuities
3. How to Choose the Right Annuity
4. Key Questions to Ask
5. Common Mistakes to Avoid
6. Annuity Comparison Checklist

CHAPTER 1: UNDERSTANDING ANNUITIES

What is an Annuity?
An annuity is a financial product designed to provide a steady stream of income, typically during retirement. You make payments (either a lump sum or periodic payments) to an insurance company, and in return, you receive regular payments back, either immediately or in the future.

Key Benefits:
• Guaranteed income for life
• Tax-deferred growth
• Protection from market volatility (certain types)
• Estate planning benefits
• No contribution limits

Key Considerations:
• Surrender charges may apply
• Limited liquidity in early years
• Fees and expenses vary
• Not FDIC insured
• Tax implications on withdrawals

CHAPTER 2: TYPES OF ANNUITIES

1. FIXED ANNUITY
How it works: Provides a guaranteed interest rate for a specific period.
Best for: Conservative investors seeking stability and principal protection.
Pros:
  • Guaranteed interest rate
  • Principal protection
  • Predictable returns
  • Low risk
Cons:
  • Lower potential returns
  • Limited growth potential
  • Inflation risk

2. VARIABLE ANNUITY
How it works: Allows investment in sub-accounts (similar to mutual funds).
Best for: Investors comfortable with market risk seeking growth potential.
Pros:
  • Growth potential
  • Tax-deferred growth
  • Investment options
  • Death benefit protection
Cons:
  • Market risk
  • Higher fees
  • No principal guarantee
  • Complex structure

3. INDEXED ANNUITY
How it works: Returns linked to a market index (like S&P 500) with downside protection.
Best for: Investors wanting market growth with principal protection.
Pros:
  • Market participation
  • Principal protection
  • Growth potential
  • Downside protection
Cons:
  • Caps on gains
  • Complex formulas
  • Limited liquidity
  • Surrender charges

4. IMMEDIATE ANNUITY
How it works: Begins payments immediately after a lump-sum purchase.
Best for: Retirees needing immediate, guaranteed income.
Pros:
  • Immediate income
  • Guaranteed payments
  • Lifetime income option
  • Simple structure
Cons:
  • No access to principal
  • Irreversible decision
  • Inflation risk
  • No inheritance value

5. DEFERRED ANNUITY
How it works: Accumulates value tax-deferred until you choose to start receiving payments.
Best for: Those planning for future retirement income needs.
Pros:
  • Tax-deferred growth
  • Flexible payout timing
  • Accumulation phase
  • Income later
Cons:
  • Surrender charges
  • Limited access
  • Tax on withdrawals
  • Complex rules

CHAPTER 3: HOW TO CHOOSE THE RIGHT ANNUITY

Step 1: Assess Your Goals
• Do you need guaranteed income?
• Are you seeking growth or protection?
• What is your time horizon?
• What is your risk tolerance?

Step 2: Evaluate Your Needs
• Current age and retirement timeline
• Existing retirement savings
• Income needs in retirement
• Other income sources (Social Security, pension)
• Estate planning goals

Step 3: Compare Options
• Review different annuity types
• Compare rates and features
• Understand fees and charges
• Consider tax implications
• Evaluate insurance company strength

Step 4: Consult a Professional
• Work with a licensed annuity specialist
• Get multiple quotes
• Ask detailed questions
• Review all documentation
• Understand surrender charges

CHAPTER 4: KEY QUESTIONS TO ASK

Before Purchasing an Annuity:
1. What type of annuity is best for my situation?
2. What are the fees and expenses?
3. Are there surrender charges? How long do they last?
4. What is the guaranteed interest rate or crediting method?
5. When can I start receiving payments?
6. What happens if I need to access my money early?
7. What is the death benefit?
8. How is the annuity taxed?
9. What is the financial strength of the insurance company?
10. Can I add riders or optional benefits?

CHAPTER 5: COMMON MISTAKES TO AVOID

Mistake #1: Not Understanding Surrender Charges
Solution: Know the surrender charge schedule and how long you must hold the annuity.

Mistake #2: Ignoring Fees
Solution: Understand all fees including mortality and expense charges, administrative fees, and rider costs.

Mistake #3: Not Shopping Around
Solution: Compare rates and features from multiple insurance companies.

Mistake #4: Choosing Based Only on Rate
Solution: Consider the overall package including company strength, features, and flexibility.

Mistake #5: Not Considering Tax Implications
Solution: Understand how annuity withdrawals are taxed and plan accordingly.

Mistake #6: Buying Without Professional Advice
Solution: Work with a qualified annuity specialist who can explain all options.

Mistake #7: Not Reading the Contract
Solution: Carefully review all documentation before signing.

CHAPTER 6: ANNUITY COMPARISON CHECKLIST

Use this checklist when comparing annuities:

ANNUITY TYPE
☐ Fixed Annuity
☐ Variable Annuity
☐ Indexed Annuity
☐ Immediate Annuity
☐ Deferred Annuity

FEATURES
☐ Interest rate or crediting method
☐ Guarantee period
☐ Surrender charge schedule
☐ Free withdrawal provisions
☐ Death benefit options
☐ Income rider availability
☐ Long-term care rider
☐ Inflation protection

FEES & CHARGES
☐ Annual fees
☐ Surrender charges
☐ Mortality and expense charges
☐ Administrative fees
☐ Rider fees
☐ Total cost of ownership

INSURANCE COMPANY
☐ Financial strength rating (A.M. Best, S&P, Moody's)
☐ Years in business
☐ Customer service reputation
☐ Claims-paying ability
☐ State licensing

TAX CONSIDERATIONS
☐ Tax-deferred growth
☐ Tax on withdrawals
☐ Required minimum distributions
☐ Estate tax implications
☐ State tax considerations

CONCLUSION

Choosing the right annuity requires careful consideration of your goals, needs, and financial situation. This guide provides a foundation for understanding annuities, but personalized advice from a qualified professional is essential.

NEXT STEPS

1. Review your retirement goals and income needs
2. Use the comparison checklist to evaluate options
3. Consult with a licensed annuity specialist
4. Get quotes from multiple insurance companies
5. Review all documentation carefully
6. Make an informed decision

RESOURCES

For personalized annuity guidance, contact:
Pontotoc Insurance Agency
Phone: (662) 200-2249
Email: info@pontotocinsuranceagency.com

© ${new Date().getFullYear()} Pontotoc Insurance Agency
This guide is for informational purposes only and does not constitute financial advice.
    `

    // Create a blob and download
    const blob = new Blob([guideContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Annuity-Selection-Guide.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                    <BookOpen size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Annuity Selection Guide</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Complete guide to choosing the right annuity for your retirement
                </p>
                <p className="text-gray-500">
                  Download your free comprehensive guide to understanding and selecting annuities
                </p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Understanding all 5 types of annuities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Step-by-step selection process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Key questions to ask before buying</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Common mistakes to avoid</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Annuity comparison checklist</span>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      <span>Download Free Guide</span>
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
      <section className="section-padding bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-indigo-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Guide Downloaded!</h2>
                <p className="text-xl text-gray-600">
                  Your annuity selection guide should be downloading now
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">Thank you! An annuity specialist will contact you within 24 hours.</p>
                </div>
              )}

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  Use this guide to understand your annuity options. A specialist will contact you to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Answer questions about the guide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Provide current annuity rates and quotes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Help you select the right annuity for your needs</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Again</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
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

export default AnnuitySelectionGuide


