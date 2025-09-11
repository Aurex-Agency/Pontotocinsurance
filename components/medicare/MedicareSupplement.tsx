'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Globe, AlertTriangle, CheckCircle, Star } from 'lucide-react';

export default function MedicareSupplement() {
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
            Medicare Supplement Plans (Medigap)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Medicare Supplement insurance, also known as Medigap, helps pay some of the health care costs 
            that Original Medicare doesn't cover, like copayments, coinsurance, and deductibles.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* What is Medigap */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What is Medigap?</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Medigap policies are sold by private companies and help fill the "gaps" in Original Medicare coverage. 
                These policies work alongside your Original Medicare to reduce your out-of-pocket healthcare costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Works with Original Medicare</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Covers out-of-pocket costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">No network restrictions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Travel coverage available</span>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cost Protection</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Part A Deductible</span>
                    <span className="text-green-600 font-semibold">Covered</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Part B Deductible</span>
                    <span className="text-green-600 font-semibold">Covered</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Coinsurance</span>
                    <span className="text-green-600 font-semibold">Covered</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Foreign Travel</span>
                    <span className="text-green-600 font-semibold">Covered</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Medigap Plan Types */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Standardized Medigap Plans</h3>
          
          <div className="overflow-x-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-primary-600 text-white p-6">
                <h4 className="text-xl font-bold text-center">Plan Comparison Chart</h4>
                <p className="text-primary-100 text-center mt-2">All plans are standardized by the federal government</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Part A Deductible</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Part B Deductible</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Coinsurance</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Foreign Travel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">Plan A</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">-</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">Plan F</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">Plan G</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">Plan N</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-50 p-6">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> Plan F is only available to those who were eligible for Medicare before January 1, 2020. 
                  Plan G is often considered the best alternative to Plan F.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Popular Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Plan G</h4>
              <p className="text-blue-600 font-semibold">Most Popular</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Covers Part A deductible</li>
              <li>• Covers Part B coinsurance</li>
              <li>• Covers foreign travel emergency</li>
              <li>• You pay Part B deductible</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Plan F</h4>
              <p className="text-green-600 font-semibold">Most Comprehensive</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Covers all deductibles</li>
              <li>• Covers all coinsurance</li>
              <li>• Covers foreign travel</li>
              <li>• No out-of-pocket costs</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Plan N</h4>
              <p className="text-purple-600 font-semibold">Cost-Effective</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Lower monthly premium</li>
              <li>• Small copays for visits</li>
              <li>• Covers foreign travel</li>
              <li>• Good value option</li>
            </ul>
          </motion.div>
        </div>

        {/* Important Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 rounded-2xl p-8 border border-green-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              Benefits
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Predictable healthcare costs</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">No network restrictions</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Guaranteed renewable</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Travel coverage available</span>
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
              <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
              Important Notes
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Best time to buy is during your 6-month open enrollment period</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">You cannot have both Medicare Advantage and Medigap</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Medigap doesn't include prescription drug coverage</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 text-center">•</div>
                <span className="text-gray-700">Plans are standardized - same benefits, different costs</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
