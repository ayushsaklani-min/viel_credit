import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  Calculator, 
  Lightbulb, 
  FileDown, 
  Sun, 
  CheckCircle,
  HelpCircle,
  Loader
} from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Loan Amount Limits',
      description: 'Tier-based loan limits enforced on-chain',
      details: 'Bronze: 50-200, Silver: 100-350, Gold: 200-500, Platinum: 300-1000 credits',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calculator,
      title: 'Interest Rate Calculator',
      description: 'See estimated interest before borrowing',
      details: 'Dynamic rates: Bronze 15%, Silver 10%, Gold 6%, Platinum 3% APR',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lightbulb,
      title: 'Credit Building Tips',
      description: 'Personalized advice to improve your score',
      details: 'Context-aware tips based on your current tier and goals',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: CheckCircle,
      title: 'Transaction Confirmations',
      description: 'Confirm actions before execution',
      details: 'Beautiful modals with clear warnings for defaults and repayments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Loader,
      title: 'Loading Skeletons',
      description: 'Smooth loading states',
      details: 'Animated shimmer effects instead of basic spinners',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Sun,
      title: 'Dark/Light Theme',
      description: 'Toggle between themes',
      details: 'Persistent theme preference with smooth transitions',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: FileDown,
      title: 'Export Credit Report',
      description: 'Download your credit report as PDF',
      details: 'Professional report showing tier, history, and privacy notice',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: HelpCircle,
      title: 'FAQ Section',
      description: 'Comprehensive help documentation',
      details: '10+ frequently asked questions with expandable answers',
      color: 'from-teal-500 to-cyan-500'
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">✨ New Features</h1>
        <p className="text-gray-400">Enhanced user experience and functionality</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{feature.description}</p>
                <p className="text-xs text-gray-500 glass-hover rounded-lg p-3">
                  {feature.details}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <Shield className="w-16 h-16 text-neon-blue mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">All Features Implemented!</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          These enhancements improve the user experience without requiring changes to the core Leo smart contracts. 
          Only the mock_lender program was updated to enforce tier-based loan limits on-chain.
        </p>
      </motion.div>
    </div>
  )
}
