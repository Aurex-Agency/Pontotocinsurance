'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function MedicareFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "When should I enroll in Medicare?",
      answer: "You should enroll during your Initial Enrollment Period (IEP), which is a 7-month period: 3 months before your 65th birthday, the month of your birthday, and 3 months after. If you miss this period, you may face late enrollment penalties. However, if you're still working and have employer coverage, you may be able to delay enrollment without penalty."
    },
    {
      question: "What's the difference between Original Medicare and Medicare Advantage?",
      answer: "Original Medicare (Parts A & B) is provided by the federal government and allows you to see any doctor who accepts Medicare. Medicare Advantage (Part C) is provided by private insurance companies and often includes additional benefits like prescription drugs, dental, and vision, but may have network restrictions. Both have different cost structures and coverage options."
    },
    {
      question: "Do I need a Medicare Supplement (Medigap) plan?",
      answer: "Medigap plans help pay for out-of-pocket costs that Original Medicare doesn't cover, like deductibles, coinsurance, and copayments. Whether you need one depends on your healthcare usage, budget, and preference for predictable costs. The best time to buy a Medigap plan is during your 6-month open enrollment period when you first get Part B."
    },
    {
      question: "What is the Medicare Part D late enrollment penalty?",
      answer: "If you don't enroll in Part D when you're first eligible and don't have other creditable prescription drug coverage, you may pay a late enrollment penalty. This penalty is calculated as 1% of the national base beneficiary premium for each month you were eligible but didn't enroll, and it's added to your monthly premium permanently."
    },
    {
      question: "Can I change my Medicare plan after I enroll?",
      answer: "Yes, you can change plans during the Annual Enrollment Period (October 15 - December 7). You can also change plans during a Special Enrollment Period if you have a qualifying life event, such as moving to a new service area or losing other coverage. Some plans also allow changes during the Medicare Advantage Open Enrollment Period (January 1 - March 31)."
    },
    {
      question: "What is IRMAA and how does it affect my Medicare costs?",
      answer: "IRMAA (Income-Related Monthly Adjustment Amount) is an additional charge added to your Part B and Part D premiums if your income is above certain limits. For 2024, single filers with modified adjusted gross income above $103,000 pay higher premiums. The amount increases with higher income levels. IRMAA is based on your tax return from two years prior."
    },
    {
      question: "What's the difference between Medicare Supplement Plan F and Plan G?",
      answer: "Plan F was the most comprehensive Medigap plan, covering all deductibles and coinsurance. However, it's only available to those who were eligible for Medicare before January 1, 2020. Plan G is now considered the most comprehensive plan for new Medicare beneficiaries - it covers everything Plan F did except the Part B deductible ($240 in 2024). Plan G often offers better value than Plan F."
    },
    {
      question: "How do I know if my doctor accepts Medicare?",
      answer: "Most doctors accept Medicare, but it's important to verify this before enrolling. You can ask your doctor directly, check Medicare's provider directory at Medicare.gov, or call 1-800-MEDICARE. Keep in mind that some doctors may accept Medicare but not accept new Medicare patients, so it's best to confirm availability."
    },
    {
      question: "What happens if I'm still working at 65?",
      answer: "If you're still working and have employer coverage, you may be able to delay Medicare enrollment without penalty. This depends on the size of your employer (20+ employees) and whether your coverage is considered creditable. You'll have a Special Enrollment Period to enroll when you retire or lose employer coverage. It's important to coordinate with your employer's HR department."
    },
    {
      question: "Can I have both Medicare and Medicaid?",
      answer: "Yes, if you qualify for both Medicare and Medicaid, you're considered 'dual eligible.' This means Medicaid will help pay for Medicare premiums, deductibles, and coinsurance. You may also qualify for additional benefits through Medicare Savings Programs or Extra Help for prescription drug costs."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Get answers to common Medicare questions and learn more about your coverage options.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItem === index ? (
                    <ChevronUp className="w-6 h-6 text-primary-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our Medicare experts are here to help you understand your options and find the right coverage for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Personalized Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
