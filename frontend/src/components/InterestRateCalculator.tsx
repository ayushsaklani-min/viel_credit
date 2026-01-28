import { motion } from 'framer-motion'
import { Calculator, TrendingDown } from 'lucide-react'

interface InterestRateCalculatorProps {
  tier: number
  loanAmount: number
}

export default function InterestRateCalculator({ tier, loanAmount }: InterestRateCalculatorProps) {
  // Interest rates based on credit tier
  const interestRates = [
    { tier: 0, rate: 15, name: 'Bronze' },
    { tier: 1, rate: 10, name: 'Silver' },
    { tier: 2, rate: 6, name: 'Gold' },
    { tier: 3, rate: 3, name: 'Platinum' }
  ]

  const currentRate = interestRates[tier]
  const interest = (loanAmount * currentRate.rate) / 100
  const totalRepayment = loanAmount + interest

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-hover rounded-lg p-4 border border-neon-blue/20"
    >
      <div className="flex items-center space-x-2 mb-3">
        <Calculator className="w-4 h-4 text-neon-blue" />
        <h4 className="font-semibold text-sm">Estimated Interest</h4>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Your Tier Rate</span>
          <span className="text-lg font-bold text-neon-green">{currentRate.rate}% APR</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Loan Amount</span>
          <span className="text-sm font-semibold">{loanAmount} credits</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Interest</span>
          <span className="text-sm font-semibold text-yellow-400">+{interest.toFixed(2)} credits</span>
        </div>
        
        <div className="h-px bg-white/10 my-2" />
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">Total Repayment</span>
          <span className="text-lg font-bold text-neon-blue">{totalRepayment.toFixed(2)} credits</span>
        </div>
      </div>

      {tier < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
        >
          <div className="flex items-start space-x-2">
            <TrendingDown className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-400 font-semibold">Save {interestRates[tier].rate - interestRates[tier + 1].rate}% APR</p>
              <p className="text-xs text-gray-400">Upgrade to {interestRates[tier + 1].name} tier</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
