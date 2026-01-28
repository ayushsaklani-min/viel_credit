import { motion } from 'framer-motion'
import FAQSection from '../components/FAQSection'

export default function FrequentlyAskedQuestions() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-4 gradient-text" style={{
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>Frequently Asked Questions</h1>
                <p className="text-gray-400">Everything you need to know about Aleo Credit and ZK-privacy</p>
            </motion.div>

            <FAQSection />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center"
            >
                <p className="text-blue-400 text-sm">
                    Still have questions? Join our community on Discord or reach out to our support team.
                </p>
            </motion.div>
        </div>
    )
}
