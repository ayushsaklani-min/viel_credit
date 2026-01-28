import { motion } from 'framer-motion'
import { ArrowRight, User, Building2, Shield, TrendingUp, CheckCircle } from 'lucide-react'

export default function SystemFlow() {
  const steps = [
    {
      icon: User,
      title: 'Borrower Requests Loan',
      description: 'User initiates loan request with desired amount',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Repayment Updates Score',
      description: 'Successful repayment increases credit score privately',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Private Score Update',
      description: 'Credit score updated on-chain without revealing value',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: CheckCircle,
      title: 'ZK Proof Generation',
      description: 'Borrower generates proof: score >= threshold',
      color: 'from-neon-blue to-neon-purple',
    },
    {
      icon: Building2,
      title: 'Lender Verification',
      description: 'Lender verifies proof and receives boolean result',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: CheckCircle,
      title: 'Loan Approval',
      description: 'Eligible borrowers receive loan approval',
      color: 'from-green-500 to-teal-500',
    },
  ]
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-3 gradient-text">System Flow</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          End-to-end privacy-preserving credit scoring and lending process using zero-knowledge proofs on Aleo
        </p>
      </motion.div>
      
      {/* Flow diagram */}
      <div className="relative">
        {/* Connection lines */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green opacity-30" />
        
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                  {/* Content card */}
                  <div className="flex-1">
                    <div className={`glass rounded-2xl p-6 ${isEven ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step number */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
                
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="flex justify-center my-4"
                  >
                    <ArrowRight className="w-6 h-6 text-neon-blue rotate-90" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Key features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Key Privacy Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Private Records',
              description: 'Credit scores stored as private records on Aleo blockchain',
              icon: Shield,
            },
            {
              title: 'Zero-Knowledge Proofs',
              description: 'Prove eligibility without revealing actual credit score',
              icon: CheckCircle,
            },
            {
              title: 'On-Chain Verification',
              description: 'All proofs verified by Aleo VM with cryptographic guarantees',
              icon: Building2,
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="glass-hover rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
      
      {/* Technical details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        
        <div className="space-y-4 text-gray-300">
          <div className="glass-hover rounded-lg p-4">
            <h3 className="font-semibold text-neon-blue mb-2">1. Credit Score Storage</h3>
            <p className="text-sm text-gray-400">
              Credit scores are stored as private records on Aleo. Only the owner can access the actual score value.
              The system uses a tier-based display (Bronze, Silver, Gold, Platinum) for UI purposes.
            </p>
          </div>
          
          <div className="glass-hover rounded-lg p-4">
            <h3 className="font-semibold text-neon-purple mb-2">2. Score Updates</h3>
            <p className="text-sm text-gray-400">
              When borrowers repay loans, their credit score increases privately on-chain. Defaults decrease the score.
              All updates happen within private transitions, maintaining confidentiality.
            </p>
          </div>
          
          <div className="glass-hover rounded-lg p-4">
            <h3 className="font-semibold text-neon-green mb-2">3. ZK Proof Generation</h3>
            <p className="text-sm text-gray-400">
              Borrowers generate zero-knowledge proofs that their credit score meets the lender's threshold.
              The proof reveals only a boolean (eligible/not eligible), never the actual score.
            </p>
          </div>
          
          <div className="glass-hover rounded-lg p-4">
            <h3 className="font-semibold text-neon-pink mb-2">4. Lender Verification</h3>
            <p className="text-sm text-gray-400">
              Lenders verify the ZK proof on-chain and receive only the eligibility status.
              This enables undercollateralized lending based on creditworthiness without compromising privacy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
