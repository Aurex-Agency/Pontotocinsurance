'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, AlertCircle } from 'lucide-react';

export default function MedicareEligibility() {
  return (
    <section id="medicare-info" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Medicare Eligibility Requirements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Understanding when and how you qualify for Medicare coverage is the first step 
            toward securing your health insurance. Here's what you need to know about eligibility.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Primary Eligibility */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Primary Eligibility</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Age 65 or Older</h4>
                    <p className="text-gray-600">Most people qualify for Medicare at age 65, regardless of income or health status.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">U.S. Citizen or Legal Resident</h4>
                    <p className="text-gray-600">You must be a U.S. citizen or have been a legal permanent resident for at least 5 years.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Work History</h4>
                    <p className="text-gray-600">You or your spouse must have worked and paid Medicare taxes for at least 10 years (40 quarters).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Circumstances */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border border-secondary-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Special Circumstances</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Under 65 with Disabilities</h4>
                    <p className="text-gray-600">If you receive Social Security Disability Insurance (SSDI) for 24 months, you qualify for Medicare.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">End-Stage Renal Disease (ESRD)</h4>
                    <p className="text-gray-600">People with permanent kidney failure requiring dialysis or a kidney transplant qualify immediately.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Amyotrophic Lateral Sclerosis (ALS)</h4>
                    <p className="text-gray-600">Also known as Lou Gehrig's disease, ALS qualifies you for Medicare immediately upon SSDI approval.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enrollment Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Enrollment Timeline</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Initial Enrollment Period (IEP)</h4>
                    <p className="text-gray-600 text-sm">7-month period: 3 months before, the month of, and 3 months after your 65th birthday.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">General Enrollment Period (GEP)</h4>
                    <p className="text-gray-600 text-sm">January 1 - March 31 each year if you missed your IEP.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Special Enrollment Period (SEP)</h4>
                    <p className="text-gray-600 text-sm">Available if you have qualifying life events like losing employer coverage.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Considerations */}
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-amber-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Important Considerations</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Late enrollment penalties may apply if you don't sign up during your initial enrollment period</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>If you're still working and have employer coverage, you may want to delay Medicare enrollment</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Medicare enrollment is not automatic for everyone - you may need to actively enroll</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Consider your healthcare needs and budget when choosing between Original Medicare and Medicare Advantage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
