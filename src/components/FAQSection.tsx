import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is Aleo Credit?',
      answer: 'Aleo Credit is a privacy-preserving lending platform built on the Aleo blockchain. It allows users to build credit history and access loans without revealing their sensitive personal financial data.'
    },
    {
      question: 'How does privacy-preserving lending work?',
      answer: 'It uses Zero-Knowledge Proofs (ZKP) to verify your creditworthiness. You prove to the lender that you meet their requirements (like having a minimum score or being in a certain tier) without ever showing them your actual credit score or financial history.'
    },
    {
      question: 'What is a ZK Proof?',
      answer: 'A cryptographic method where one party can prove to another that a statement is true (e.g., "My credit score is above 700") without revealing any information beyond the statement\'s validity. All calculations happen privately in your wallet.'
    },
    {
      question: 'Is my credit score visible to anyone?',
      answer: 'No, your score is stored as a private record on-chain. Only the proof of meeting a specific threshold is shared with lenders. Your actual numeric score remains encrypted and private in your Leo Wallet.'
    },
    {
      question: 'How can I improve my credit tier?',
      answer: 'By successfully repaying loans on time. Each repayment increases your private credit score. As your score crosses certain thresholds (600 for Silver, 750 for Gold, 900 for Platinum), your public tier will upgrade automatically.'
    },
    {
      question: 'What happens if I default on a loan?',
      answer: 'Defaults are recorded privately and will decrease your credit score by 100 points. This may lead to a tier downgrade, which results in higher interest rates and lower loan limits for future borrowing.'
    },
    {
      question: 'How are interest rates determined?',
      answer: 'Interest rates are dynamically calculated based on your credit tier. Platinum members receive the lowest rates, while Bronze members start with standard rates as they build their reputation.'
    },
    {
      question: 'Can I use my own wallet?',
      answer: 'Yes, we fully support the Leo Wallet extension. All ZK proofs are generated locally within your wallet, ensuring that your private keys and sensitive data never leave your device.'
    },
    {
      question: 'Is the platform decentralized?',
      answer: 'Yes, all core logic is handled by Aleo programs (smart contracts) on the Aleo network. Loans, repayments, and credit score updates are governed by decentralized code rather than a central authority.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply connect your Leo Wallet and click "Initialize Credit Profile". You will receive a starting Bronze tier and 300 points to begin your journey in the Aleo Credit ecosystem.'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          <p className="text-sm text-gray-400">Learn about Aleo Credit</p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-hover rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 text-sm text-gray-400">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
