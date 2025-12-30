'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calculator, TrendingUp, Info } from 'lucide-react';

export default function MedicareCosts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Understanding Medicare Costs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Medicare costs can vary based on your income, work history, and the type of coverage you choose. 
            Understanding these costs helps you plan for your healthcare expenses.
          </motion.p>
        </div>

        {/* 2026 Medicare Costs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">2026 Medicare Costs</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Part A Premium</h4>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-2xl font-bold text-blue-600">$0</div>
                <p className="text-sm text-gray-600">If you worked 40+ quarters</p>
                <div className="text-sm text-gray-700">
                  <p>30-39 quarters: $311/month</p>
                  <p>Fewer than 30: $565/month</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-3">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Part B Premium</h4>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-2xl font-bold text-green-600">$202.90</div>
                <p className="text-sm text-gray-600">Standard monthly premium</p>
                <div className="text-sm text-gray-700">
                  <p>Higher incomes pay more</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Part D Premium</h4>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-2xl font-bold text-purple-600">Varies</div>
                <p className="text-sm text-gray-600">By plan selection</p>
                <div className="text-sm text-gray-700">
                  <p>Plus IRMAA if applicable</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-3">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Medigap Premium</h4>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-2xl font-bold text-orange-600">$100+</div>
                <p className="text-sm text-gray-600">Monthly premium</p>
                <div className="text-sm text-gray-700">
                  <p>Varies by plan & age</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Deductibles and Copays */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Deductibles & Coinsurance (2026)</h3>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Part A (Hospital Insurance)</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Deductible: $1,736 per benefit period</li>
                  <li>• Days 1-60: $0 coinsurance</li>
                  <li>• Days 61-90: $434 per day</li>
                  <li>• Lifetime Reserve Days (91+): $868 per day</li>
                  <li>• Skilled Nursing (Days 21-100): $217 per day</li>
                </ul>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Part B (Medical Insurance)</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Deductible: $283 per year</li>
                  <li>• Coinsurance: 20% of Medicare-approved amount</li>
                  <li>• Preventive services: $0 (when provider accepts assignment)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Part D (Prescription Drugs)</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Deductible: Varies by plan (up to plan limit)</li>
                  <li>• Copays vary by plan and drug tier</li>
                  <li>• Coverage gap: 25% of drug costs</li>
                  <li>• Catastrophic: Small copays or 5% coinsurance</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Income-Related Monthly Adjustment Amount (IRMAA)</h3>
              
              <p className="text-gray-700 mb-4">
                If your income is above certain limits, you'll pay higher premiums for Part B and Part D.
              </p>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2026 Income Limits (Single/Joint)</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• ≤$109,000 / ≤$218,000: $202.90/month</li>
                    <li>• $109,001-$137,000 / $218,001-$274,000: $284.10/month</li>
                    <li>• $137,001-$171,000 / $274,001-$342,000: $405.80/month</li>
                    <li>• $171,001-$205,000 / $342,001-$410,000: $527.50/month</li>
                    <li>• $205,001-$499,999 / $410,001-$749,999: $649.20/month</li>
                    <li>• ≥$500,000 / ≥$750,000: $689.90/month</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2026 Part D IRMAA (Single/Joint)</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• ≤$109,000 / ≤$218,000: $0.00/month</li>
                    <li>• $109,001-$137,000 / $218,001-$274,000: +$14.50/month</li>
                    <li>• $137,001-$171,000 / $274,001-$342,000: +$37.50/month</li>
                    <li>• $171,001-$205,000 / $342,001-$410,000: +$60.40/month</li>
                    <li>• $205,001-$499,999 / $410,001-$749,999: +$83.30/month</li>
                    <li>• ≥$500,000 / ≥$750,000: +$91.00/month</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Saving Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Compare Medicare Advantage plans annually</li>
                <li>• Consider generic medications when available</li>
                <li>• Use preferred pharmacies in your plan's network</li>
                <li>• Take advantage of preventive services</li>
                <li>• Review your coverage needs annually</li>
                <li>• Consider Medigap for predictable costs</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Cost Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Cost Comparison Example</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Original Medicare</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Part A Premium:</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Part B Premium:</span>
                  <span className="font-semibold">$202.90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Part D Premium:</span>
                  <span className="font-semibold">$35+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Medigap Premium:</span>
                  <span className="font-semibold">$150</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Monthly Total:</span>
                    <span className="text-primary-600">$387.90+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Medicare Advantage</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Part B Premium:</span>
                  <span className="font-semibold">$202.90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">MA Premium:</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Copays/Coinsurance:</span>
                  <span className="font-semibold">$50-200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Max Out-of-Pocket:</span>
                  <span className="font-semibold">Varies by plan</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Monthly Total:</span>
                    <span className="text-primary-600">$202.90+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Low-Income Assistance</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Part A Premium:</span>
                  <span className="font-semibold text-green-600">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Part B Premium:</span>
                  <span className="font-semibold text-green-600">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Part D Premium:</span>
                  <span className="font-semibold text-green-600">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Copays:</span>
                  <span className="font-semibold text-green-600">$0-$8.50</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Monthly Total:</span>
                    <span className="text-green-600">$0-$8.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Costs vary significantly based on your specific needs, location, and plan choices. 
              These are examples only. Contact us for a personalized cost analysis.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              *2026 amounts based on official CMS data. Source: <a href="https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">CMS.gov</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
