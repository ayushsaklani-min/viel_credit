import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Shield, Clock } from 'lucide-react'

interface CreditTipsProps {
  currentTier: number
}

export default function CreditTips({ currentTier }: CreditTipsProps) {
  const tips = [
    {
      icon: TrendingUp,
      title: 'Repay Loans On Time',
      description: 'Each repayment increases your score by 50% of loan amount',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Avoid Defaults',
      description: 'Defaulting decreases your score by 100 points',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Build History',
      description: 'More completed loans = higher creditworthiness',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Start Small',
      description: 'Begin with smaller loans to build trust',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const tierGoals = [
    { tier: 0, goal: 'Reach 600 score to unlock Silver tier', target: 600 },
    { tier: 1, goal: 'Reach 750 score to unlock Gold tier', target: 750 },
    { tier: 2, goal: 'Reach 900 score to unlock Platinum tier', target: 900 },
    { tier: 3, goal: 'Maintain excellent credit history', target: 1000 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 10px rgba(245, 158, 11, 0.3)',
              '0 0 20px rgba(245, 158, 11, 0.5)',
              '0 0 10px rgba(245, 158, 11, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Lightbulb className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold">Credit Building Tips</h3>
          <p className="text-sm text-gray-400">Improve your score privately</p>
        </div>
      </div>

      {/* Current tier goal */}
      <div className="glass-hover rounded-lg p-4 mb-4 border border-neon-blue/30">
        <p className="text-sm text-gray-400 mb-1">Your Next Goal</p>
        <p className="text-lg font-semibold text-neon-blue">{tierGoals[currentTier].goal}</p>
        <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${(currentTier / 3) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Tips grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-hover rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tip.color} flex items-center justify-center flex-shrink-0`}>
                <tip.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                <p className="text-xs text-gray-400">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
