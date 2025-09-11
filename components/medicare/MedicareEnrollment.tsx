'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle, FileText, Phone } from 'lucide-react';

export default function MedicareEnrollment() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Medicare Enrollment Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Understanding when and how to enroll in Medicare is crucial for avoiding penalties 
            and ensuring you have the coverage you need when you need it.
          </motion.p>
        </div>

        {/* Enrollment Periods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Medicare Enrollment Periods</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Initial Enrollment Period (IEP)</h4>
                <p className="text-primary-600 font-semibold">Most Important</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <strong>When:</strong> 7-month period around your 65th birthday
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Timeline:</strong> 3 months before, month of, and 3 months after birthday
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What:</strong> Enroll in Parts A, B, C, and D
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Penalty:</strong> Late enrollment penalties may apply
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">General Enrollment Period (GEP)</h4>
                <p className="text-green-600 font-semibold">Annual Opportunity</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <strong>When:</strong> January 1 - March 31 each year
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Who:</strong> If you missed your IEP
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>What:</strong> Enroll in Parts A and B
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Coverage:</strong> Begins July 1
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Special Enrollment Period (SEP)</h4>
                <p className="text-blue-600 font-semibold">Life Events</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  <strong>When:</strong> Triggered by qualifying events
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Examples:</strong> Losing employer coverage, moving, etc.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Timeline:</strong> Usually 2 months after event
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Penalty:</strong> Usually no late enrollment penalty
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enrollment Steps */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900">How to Enroll</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Check Your Eligibility</h4>
                  <p className="text-gray-600 text-sm">
                    Verify you're eligible for Medicare based on age, disability, or specific conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Choose Your Coverage</h4>
                  <p className="text-gray-600 text-sm">
                    Decide between Original Medicare vs. Medicare Advantage, and whether you need Part D.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compare Plans</h4>
                  <p className="text-gray-600 text-sm">
                    Review costs, benefits, provider networks, and formularies to find the best fit.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Enroll</h4>
                  <p className="text-gray-600 text-sm">
                    Complete enrollment through Medicare.gov, the plan directly, or with our assistance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Confirm Coverage</h4>
                  <p className="text-gray-600 text-sm">
                    Verify your enrollment and understand when your coverage begins.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900">Enrollment Methods</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Online Enrollment</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Enroll directly through Medicare.gov or the plan's website.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Fast and convenient</li>
                  <li>• Immediate confirmation</li>
                  <li>• Can be done 24/7</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Phone Enrollment</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Call Medicare or the insurance company directly.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Speak with a representative</li>
                  <li>• Get help with questions</li>
                  <li>• Immediate assistance</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Agent Assistance</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Work with a licensed insurance agent for personalized help.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Expert guidance</li>
                  <li>• Plan comparison</li>
                  <li>• Ongoing support</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Important Considerations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
              Important Considerations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Medicare enrollment is not automatic for everyone</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">If you're still working, you may want to delay enrollment</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Late enrollment penalties are permanent</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">You can change plans during Annual Enrollment Period</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Consider your healthcare needs and budget</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              How We Can Help
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Determine your enrollment timeline</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Compare all available plans in your area</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Help you enroll in the best plan for your needs</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Provide ongoing support and plan reviews</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Answer questions about coverage and costs</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
