import { motion } from 'framer-motion'
import { Shield, TrendingUp, Award } from 'lucide-react'
import { getTierInfo } from '../utils/creditTiers'

interface CreditTierCardProps {
  tier: number
  loanCount: number
  hideScore?: boolean
}

export default function CreditTierCard({ tier, loanCount, hideScore = true }: CreditTierCardProps) {
  const tierInfo = getTierInfo(tier)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-lg), 0 0 30px rgba(59, 130, 246, 0.2)'
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: 'var(--shadow-xl), 0 0 40px rgba(59, 130, 246, 0.3)'
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: `linear-gradient(135deg, ${tierInfo.color}, transparent)`,
          filter: 'blur(20px)'
        }}
      />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tierInfo.gradient} opacity-5`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierInfo.gradient} flex items-center justify-center`}
              animate={{
                boxShadow: [
                  `0 0 10px ${tierInfo.color}40`,
                  `0 0 20px ${tierInfo.color}60`,
                  `0 0 10px ${tierInfo.color}40`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-400">Credit Tier</p>
              <h3 className="text-2xl font-bold" style={{
                color: tierInfo.color,
                textShadow: `0 0 10px ${tierInfo.color}40`
              }}>
                {tierInfo.name}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Tier Level</p>
            <motion.p
              className="text-3xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${tierInfo.color}, #fff)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {tier}
            </motion.p>
          </div>
        </div>

        {/* Score range indicator with shimmer */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{tierInfo.minScore}</span>
            <span className="text-gray-300 font-medium">
              {hideScore ? 'Score Hidden (Private)' : 'Score Range'}
            </span>
            <span>{tierInfo.maxScore}</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${tierInfo.gradient} relative`}
            >
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  backgroundSize: '200% 100%'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-hover rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-neon-blue" />
              <p className="text-xs text-gray-400">Total Loans</p>
            </div>
            <p className="text-xl font-bold">{loanCount}</p>
          </div>

          <div className="glass-hover rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-neon-purple" />
              <p className="text-xs text-gray-400">Privacy</p>
            </div>
            <p className="text-xl font-bold text-neon-green">Active</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
