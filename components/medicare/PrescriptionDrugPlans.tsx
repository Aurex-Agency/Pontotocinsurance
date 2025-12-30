'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pill, DollarSign, Clock, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PrescriptionDrugPlans() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Medicare Prescription Drug Plans (Part D)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Medicare Part D provides prescription drug coverage through private insurance companies. 
            These plans help reduce the cost of your medications and protect you from high drug costs.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* What is Part D */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What is Medicare Part D?</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Medicare Part D is prescription drug coverage offered by private insurance companies 
                approved by Medicare. These plans help cover the cost of prescription medications 
                and provide protection against high drug costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Standalone prescription drug plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Included in most Medicare Advantage plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Formulary-based coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Catastrophic coverage protection</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Coverage Tiers</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Generic Drugs</span>
                    <span className="text-green-600 font-semibold">Lowest Cost</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Preferred Brand</span>
                    <span className="text-blue-600 font-semibold">Medium Cost</span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Non-Preferred Brand</span>
                    <span className="text-purple-600 font-semibold">Higher Cost</span>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Specialty Drugs</span>
                    <span className="text-red-600 font-semibold">Highest Cost</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Coverage Phases */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Part D Coverage Phases</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Deductible Phase</h4>
                <p className="text-sm text-gray-600">Varies by plan (2026)</p>
              </div>
              <p className="text-sm text-gray-600 text-center">
                You pay 100% of drug costs until you reach the deductible amount.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Initial Coverage</h4>
                <p className="text-sm text-gray-600">$0 - $5,030</p>
              </div>
              <p className="text-sm text-gray-600 text-center">
                You pay copays or coinsurance based on your plan's formulary tiers.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Coverage Gap</h4>
                <p className="text-sm text-gray-600">$5,030 - $8,000</p>
              </div>
              <p className="text-sm text-gray-600 text-center">
                You pay 25% of the cost for covered drugs (brand and generic).
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Catastrophic</h4>
                <p className="text-sm text-gray-600">Above $8,000</p>
              </div>
              <p className="text-sm text-gray-600 text-center">
                You pay small copays or 5% coinsurance for covered drugs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Plan Types */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900">Types of Part D Plans</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Standalone Part D Plans</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Work with Original Medicare</li>
                  <li>• Work with Medicare Supplement plans</li>
                  <li>• Separate monthly premium</li>
                  <li>• Choose your own pharmacy network</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Medicare Advantage with Part D</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Part D included in the plan</li>
                  <li>• One monthly premium</li>
                  <li>• Integrated coverage</li>
                  <li>• May have different pharmacy networks</li>
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
            <h3 className="text-2xl font-bold text-gray-900">Choosing a Part D Plan</h3>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Consider These Factors:</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Your current medications and their costs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Preferred pharmacy networks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Monthly premiums vs. out-of-pocket costs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mail-order pharmacy options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Plan's formulary and coverage rules</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Late Enrollment Penalty */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-amber-50 rounded-2xl p-8 border border-amber-200"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Late Enrollment Penalty</h3>
              <p className="text-gray-700 mb-4">
                If you don't enroll in Part D when you're first eligible and don't have other 
                creditable prescription drug coverage, you may have to pay a late enrollment penalty. 
                This penalty is added to your monthly premium and is permanent.
              </p>
              <div className="bg-white rounded-lg p-4 border border-amber-200">
                <h4 className="font-semibold text-gray-900 mb-2">How to Avoid the Penalty:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Enroll in Part D when you first become eligible</li>
                  <li>• Maintain creditable prescription drug coverage</li>
                  <li>• Enroll within 2 months of losing other coverage</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
