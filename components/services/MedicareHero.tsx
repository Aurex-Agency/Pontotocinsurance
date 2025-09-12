'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Users } from 'lucide-react';
import QuoteModal from '../QuoteModal';

export default function MedicareHero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <section 
      className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2A36D' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="absolute inset-0 bg-white/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Medicare Coverage Solutions
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Your Medicare
                <span className="text-primary-600 block">Made Simple</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Navigate Medicare with confidence. From Original Medicare to Advantage plans, 
                we'll help you find the coverage that protects your health and your wallet.
              </motion.p>
            </div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Coverage</h3>
                  <p className="text-sm text-gray-600">All Medicare parts explained</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                  <p className="text-sm text-gray-600">Personalized enrollment help</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ongoing Support</h3>
                  <p className="text-sm text-gray-600">Annual plan reviews</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cost Savings</h3>
                  <p className="text-sm text-gray-600">Find the best value plans</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Medicare Quote
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a
                href="#medicare-info"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                Learn About Medicare
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Heart className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Medicare Coverage</h3>
                  <p className="text-gray-600">Complete health coverage for seniors</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">65+</div>
                    <div className="text-sm text-gray-600">Eligibility Age</div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">4</div>
                    <div className="text-sm text-gray-600">Coverage Parts</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Part A - Hospital</span>
                    <span className="text-green-600 font-semibold">✓ Covered</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Part B - Medical</span>
                    <span className="text-green-600 font-semibold">✓ Covered</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Part C - Advantage</span>
                    <span className="text-green-600 font-semibold">✓ Covered</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Part D - Prescription</span>
                    <span className="text-green-600 font-semibold">✓ Covered</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-200 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        service="medicare"
        title="Get Your Medicare Quote"
        description="Get a personalized quote for Medicare coverage and supplement plans."
      />
    </section>
  );
}
