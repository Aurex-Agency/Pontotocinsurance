'use client'

import { useState } from 'react'
import { FileText, Download, Send, CheckCircle } from 'lucide-react'

const SocialSecurityGuide = () => {
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
          source: 'Social Security Optimization Guide',
          leadMagnet: 'Social Security Optimization Guide',
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
SOCIAL SECURITY OPTIMIZATION GUIDE
Pontotoc Insurance Agency

TABLE OF CONTENTS
1. Understanding Social Security Benefits
2. When to Claim Social Security
3. Maximizing Your Benefits
4. Spousal Benefits Strategy
5. Survivor Benefits
6. Tax Implications
7. Common Mistakes to Avoid
8. Action Plan

CHAPTER 1: UNDERSTANDING SOCIAL SECURITY BENEFITS

What is Social Security?
Social Security is a federal program that provides retirement, disability, and survivor benefits to eligible workers and their families. For most Americans, Social Security will be a significant source of retirement income.

Key Concepts:
• Full Retirement Age (FRA): The age at which you're entitled to 100% of your benefit
  - Born 1943-1954: Age 66
  - Born 1955-1959: Gradually increases to 67
  - Born 1960 or later: Age 67

• Primary Insurance Amount (PIA): Your benefit at full retirement age

• Early Retirement: Can claim as early as age 62 (reduced benefits)

• Delayed Retirement: Can delay up to age 70 (increased benefits)

How Benefits Are Calculated:
1. Average your 35 highest-earning years (adjusted for inflation)
2. Apply a formula to determine your Primary Insurance Amount
3. Adjust based on when you claim:
   - Early (age 62): Up to 30% reduction
   - Full Retirement Age: 100% of benefit
   - Delayed (age 70): Up to 32% increase (8% per year after FRA)

CHAPTER 2: WHEN TO CLAIM SOCIAL SECURITY

Early Claiming (Age 62)
Pros:
• Immediate income
• More total payments if you don't live long
• Can invest benefits

Cons:
• Permanent reduction in monthly benefit
• Lower lifetime benefits if you live long
• May affect spousal benefits

Full Retirement Age Claiming
Pros:
• 100% of your benefit
• No reduction
• Good balance for most people

Cons:
• Must wait until FRA
• Miss out on early payments

Delayed Claiming (Up to Age 70)
Pros:
• Maximum monthly benefit (up to 132% of FRA amount)
• Higher lifetime benefits if you live long
• Better for married couples

Cons:
• Must wait longer
• Risk of not living long enough to benefit

Decision Factors:
• Health and life expectancy
• Current financial needs
• Spousal situation
• Other retirement income
• Tax situation

CHAPTER 3: MAXIMIZING YOUR BENEFITS

Strategy 1: Work Longer
• Each additional year of work can replace a lower-earning year
• Benefits are based on your 35 highest-earning years
• Working past FRA can increase your benefit

Strategy 2: Delay Claiming
• Each year you delay past FRA increases benefit by 8%
• Maximum increase at age 70
• Can result in 32% higher monthly benefit

Strategy 3: Coordinate with Spouse
• Consider both spouses' benefits
• Higher earner should consider delaying
• Lower earner can claim earlier

Strategy 4: Minimize Taxes
• Up to 85% of benefits can be taxed
• Coordinate with other retirement income
• Consider Roth conversions

CHAPTER 4: SPOUSAL BENEFITS STRATEGY

Spousal Benefits
• Can claim up to 50% of spouse's benefit
• Available at age 62 (reduced) or FRA (full)
• Must be married at least 1 year

Divorced Spouse Benefits
• Can claim on ex-spouse's record if:
  - Married at least 10 years
  - Currently unmarried
  - Age 62 or older
  - Ex-spouse is eligible for benefits

Survivor Benefits
• Widow(er) can claim 100% of deceased spouse's benefit
• Can claim as early as age 60 (reduced)
• Can switch to own benefit later if higher

Coordinated Strategies:
1. Higher earner delays to age 70
2. Lower earner claims spousal benefit early
3. Higher earner's benefit grows
4. Survivor gets maximum benefit

CHAPTER 5: SURVIVOR BENEFITS

Who Qualifies:
• Widow(er) age 60 or older
• Widow(er) of any age caring for child under 16
• Dependent children under 18 (or 19 if in school)
• Dependent parents age 62 or older

Benefit Amounts:
• Widow(er) at FRA: 100% of deceased spouse's benefit
• Widow(er) age 60: 71.5% of deceased spouse's benefit
• Children: 75% of deceased parent's benefit

Claiming Strategy:
• Can claim survivor benefit first
• Switch to own benefit later if higher
• Maximizes total lifetime benefits

CHAPTER 6: TAX IMPLICATIONS

Taxation of Benefits:
• Up to 85% of benefits can be taxable
• Depends on "combined income":
  Combined Income = Adjusted Gross Income + 
                    Nontaxable Interest + 
                    50% of Social Security Benefits

Tax Thresholds (2024):
• Single filers:
  - $0-$25,000: 0% taxable
  - $25,000-$34,000: Up to 50% taxable
  - Over $34,000: Up to 85% taxable

• Married filing jointly:
  - $0-$32,000: 0% taxable
  - $32,000-$44,000: Up to 50% taxable
  - Over $44,000: Up to 85% taxable

Tax Planning Strategies:
• Coordinate with other retirement income
• Consider Roth IRA conversions before claiming
• Manage withdrawals from retirement accounts
• Time other income sources

CHAPTER 7: COMMON MISTAKES TO AVOID

Mistake #1: Claiming Too Early Without Planning
Solution: Calculate break-even point and consider life expectancy

Mistake #2: Not Coordinating with Spouse
Solution: Develop a coordinated claiming strategy

Mistake #3: Ignoring Tax Implications
Solution: Plan for taxes in retirement income strategy

Mistake #4: Not Understanding Survivor Benefits
Solution: Consider survivor needs when planning

Mistake #5: Not Checking Earnings Record
Solution: Review your Social Security statement annually

Mistake #6: Assuming Benefits Will Cover All Expenses
Solution: Social Security typically replaces 40% of pre-retirement income

Mistake #7: Not Factoring in Health
Solution: Consider life expectancy in claiming decision

CHAPTER 8: ACTION PLAN

Immediate Actions:
☐ Review your Social Security statement online
☐ Check your earnings record for accuracy
☐ Calculate your estimated benefits at different ages
☐ Discuss strategy with spouse
☐ Consider your health and life expectancy

Before Claiming:
☐ Understand your full retirement age
☐ Calculate break-even points
☐ Consider tax implications
☐ Coordinate with other retirement income
☐ Review spousal and survivor benefits

Ongoing:
☐ Monitor your earnings record
☐ Adjust strategy as circumstances change
☐ Stay informed about Social Security changes
☐ Work with a financial advisor
☐ Review strategy annually

CALCULATION EXAMPLES

Example 1: Early vs. Full Retirement Age
FRA Benefit: $2,000/month
Early (age 62): $1,400/month (30% reduction)
Delayed (age 70): $2,640/month (32% increase)

Example 2: Break-Even Analysis
If you claim at 62 vs. 67:
• Age 62: $1,400/month
• Age 67: $2,000/month
• Break-even: Around age 78
• If you live past 78, waiting pays off

Example 3: Spousal Coordination
Husband's benefit at 70: $3,000/month
Wife's benefit at FRA: $1,500/month
Wife's spousal benefit: $1,500/month (50% of husband's)
Total household: $4,500/month

RESOURCES

Social Security Administration:
• Website: ssa.gov
• Phone: 1-800-772-1213
• Local office: Find at ssa.gov/locator

Online Tools:
• Social Security Benefit Calculator
• My Social Security Account
• Retirement Estimator

For Personalized Guidance:
Pontotoc Insurance Agency
Phone: (662) 200-2249
Email: info@pontotocinsuranceagency.com

CONCLUSION

Optimizing your Social Security benefits requires careful planning and consideration of multiple factors. This guide provides a foundation, but personalized advice from a qualified financial professional is essential.

Key Takeaways:
1. Timing matters - when you claim affects your benefit for life
2. Coordinate with spouse - maximize household benefits
3. Consider taxes - plan for tax implications
4. Think long-term - consider survivor benefits
5. Get professional help - work with an advisor

NEXT STEPS

1. Review your Social Security statement
2. Calculate your benefits at different ages
3. Develop a claiming strategy
4. Consult with a retirement planning specialist
5. Implement your strategy

© ${new Date().getFullYear()} Pontotoc Insurance Agency
This guide is for informational purposes only and does not constitute financial advice.
    `

    // Create a blob and download
    const blob = new Blob([guideContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Social-Security-Optimization-Guide.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (step === 'form') {
    return (
      <section className="section-padding bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                    <FileText size={40} className="text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Social Security Optimization Guide</h2>
                <p className="text-xl text-gray-600 mb-2">
                  Complete guide to maximizing your Social Security benefits
                </p>
                <p className="text-gray-500">
                  Learn when to claim, how to coordinate with your spouse, and strategies to maximize your lifetime benefits
                </p>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-8 rounded">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>When to claim Social Security for maximum benefits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Spousal and survivor benefits strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tax implications and planning strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Common mistakes to avoid</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Action plan and calculation examples</span>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
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
      <section className="section-padding bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-teal-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Guide Downloaded!</h2>
                <p className="text-xl text-gray-600">
                  Your Social Security Optimization Guide should be downloading now
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">Thank you! A Social Security specialist will contact you within 24 hours.</p>
                </div>
              )}

              <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
                <p className="text-gray-700 mb-4">
                  Use this guide to understand your Social Security options. A specialist will contact you to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <span>Review your Social Security statement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <span>Calculate your optimal claiming strategy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <span>Develop a coordinated spousal strategy</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Again</span>
                </button>
                <a
                  href="/retirement"
                  className="flex-1 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
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

export default SocialSecurityGuide

