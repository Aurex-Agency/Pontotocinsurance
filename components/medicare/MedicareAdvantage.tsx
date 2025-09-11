'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Shield, Heart, Users, Clock } from 'lucide-react';

export default function MedicareAdvantage() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Medicare Advantage Plans (Part C)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Medicare Advantage plans offer an all-in-one alternative to Original Medicare, 
            combining hospital, medical, and often prescription drug coverage into a single plan.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* What is Medicare Advantage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What is Medicare Advantage?</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Medicare Advantage plans are offered by private insurance companies approved by Medicare. 
                These plans provide all your Part A (hospital) and Part B (medical) coverage, and often 
                include additional benefits like prescription drugs, dental, vision, and hearing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Includes all Original Medicare benefits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Often includes prescription drug coverage (Part D)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">May include dental, vision, and hearing benefits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Out-of-pocket maximum limits</span>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Medicare Advantage Coverage</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Medical</div>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Hospital</div>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Prescription</div>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <Star className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Extra Benefits</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">$0</div>
                  <div className="text-sm text-gray-600">Premium Plans Available</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Types of Medicare Advantage Plans */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Types of Medicare Advantage Plans</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">HMO Plans</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use network providers</li>
                <li>• Lower out-of-pocket costs</li>
                <li>• Primary care physician required</li>
                <li>• Referrals needed for specialists</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">PPO Plans</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use any provider</li>
                <li>• Higher costs for out-of-network</li>
                <li>• No referrals needed</li>
                <li>• More flexibility</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">PFFS Plans</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Private Fee-for-Service</li>
                <li>• Can see any provider</li>
                <li>• Provider must accept plan</li>
                <li>• No network restrictions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-3">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">SNP Plans</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Special Needs Plans</li>
                <li>• For specific conditions</li>
                <li>• Coordinated care</li>
                <li>• Specialized benefits</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Advantages and Considerations */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 rounded-2xl p-8 border border-green-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Advantages
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Lower monthly premiums (some $0)</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Out-of-pocket maximum protection</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Additional benefits not in Original Medicare</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Coordinated care management</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Often includes prescription drug coverage</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-amber-50 rounded-2xl p-8 border border-amber-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 text-amber-600 mr-3" />
              Considerations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Network restrictions (HMO plans)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Referrals may be required for specialists</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Plans can change benefits annually</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">May have higher copays for certain services</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Limited to plan's service area</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
