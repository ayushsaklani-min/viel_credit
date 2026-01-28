import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, User, Building2, Shield, TrendingUp, CheckCircle } from 'lucide-react'
import { useCreditStore } from '../store/creditStore'
import { useAleoWallet } from '../hooks/useAleoWallet'
import { WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui'
import CreditTierCard from '../components/CreditTierCard'
import LoanManager from '../components/LoanManager'
import ProofGenerator from '../components/ProofGenerator'
import CreditTips from '../components/CreditTips'
import CreditReportExport from '../components/CreditReportExport'
import LoadingSkeleton from '../components/LoadingSkeleton'
import FAQSection from '../components/FAQSection'

export default function BorrowerDashboard() {
  const { publicKey, connected } = useAleoWallet()
  const { currentTier, loanCount, creditThreshold, addTransaction } = useCreditStore()
  const { initializeUser, getCreditRecords } = useAleoWallet()
  const [isInitializing, setIsInitializing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Don't auto-load records on mount - wait for user action
  useEffect(() => {
    if (publicKey && connected) {
      console.log('Wallet connected:', publicKey)
    }
  }, [publicKey, connected])

  const loadCreditRecords = async () => {
    setIsLoading(true)
    try {
      console.log('Attempting to load credit records...')
      const records = await getCreditRecords()
      if (records && records.length > 0) {
        // @ts-ignore
        const latestRecord = records[0]
        // @ts-ignore
        const recordData = latestRecord.data || latestRecord.plaintext || {}
        const tier = recordData.tier || 0
        const count = recordData.loan_count || 0
        useCreditStore.getState().setTierInfo(tier, count)
        // @ts-ignore
        const ciphertext = latestRecord.ciphertext || latestRecord.id || ''
        useCreditStore.getState().setCreditRecordCiphertext(ciphertext)
      }
    } catch (error: any) {
      console.error('Error loading credit records:', error)
      if (!error.message?.includes('NOT_GRANTED')) {
        alert(`Error loading records: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInitialize = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsInitializing(true)
    try {
      const txId = await initializeUser()
      if (txId) {
        addTransaction({
          txId,
          status: 'pending',
          message: 'Initializing credit profile...',
        })
        alert(`✅ Success! Transaction submitted!\n\nYour credit profile is being created on-chain.\n\nStarting tier: Bronze (Tier 0)\nInitial score: 300 (private in wallet)`)
        setTimeout(() => {
          useCreditStore.getState().setTierInfo(0, 0)
          setIsInitializing(false)
        }, 2000)
      }
    } catch (error: any) {
      console.error('Error initializing user:', error)
      alert(`Error: ${error.message || 'Failed to initialize credit profile'}`)
      setIsInitializing(false)
    }
  }

  // Show welcome screen if wallet is not connected
  if (!connected) {
    return (
      <div className="space-y-6 borrower-dashboard">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text" style={{
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Borrower Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Connect your Leo Wallet to get started</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-12 text-center"
        >
          <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
            <div style={{
              padding: '2px',
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              clipPath: 'polygon(50% 0%, 90% 20%, 90% 70%, 50% 100%, 10% 70%, 10% 20%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
            }}>
              <div style={{
                background: 'var(--bg-primary)',
                clipPath: 'polygon(50% 0%, 90% 20%, 90% 70%, 50% 100%, 10% 70%, 10% 20%)',
                padding: '10px'
              }}>
                <img src="/logo image new.png" alt="Aleo Credit Logo" className="w-32 h-32" style={{
                  objectFit: 'contain'
                }} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3 gradient-text" style={{
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Welcome to Aleo Credit</h2>
          <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Connect your Leo Wallet to start building your private credit profile with zero-knowledge proofs.
          </p>

          <div className="flex justify-center">
            <WalletMultiButton />
          </div>

          <div className="mt-8 text-xs space-y-1" style={{ color: 'var(--text-tertiary)' }}>
            <p>✓ ZK proofs generated in Leo Wallet</p>
            <p>✓ Your credit score stays private</p>
            <p>✓ Only tier information displayed</p>
          </div>
        </motion.div>

        {/* System Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 overflow-hidden"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold gradient-text" style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>System Flow</h2>
            <p className="text-gray-400 mt-2">Privacy-preserving lending process</p>
          </div>

          <div className="relative">
            {/* Connection lines */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 opacity-20" />

            <div className="space-y-12">
              {[
                { icon: User, title: '1. Request', desc: 'Borrower initiates loan request', color: 'from-blue-500 to-cyan-500' },
                { icon: TrendingUp, title: '2. Repay', desc: 'Successful repayment increases score', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: '3. Privacy', desc: 'Credit score updated privately on-chain', color: 'from-purple-500 to-pink-500' },
                { icon: CheckCircle, title: '4. ZK-Proof', desc: 'Generate proof: score >= threshold', color: 'from-blue-400 to-indigo-500' },
                { icon: Building2, title: '5. Verify', desc: 'Lender verifies proof (result only)', color: 'from-orange-500 to-red-500' },
                { icon: CheckCircle, title: '6. Approval', desc: 'Eligible borrowers receive loan', color: 'from-green-500 to-teal-500' },
              ].map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center justify-between"
                  >
                    <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'order-last pl-8 text-left'}`}>
                      <div className="glass-hover rounded-xl p-4 inline-block max-w-xs">
                        <h4 className="font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-xs text-gray-400">{step.desc}</p>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="w-1/2" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>


        {/* Key Privacy Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Key Privacy Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Private Records',
                description: 'Credit scores stored as private records on Aleo blockchain',
                icon: '🔒',
              },
              {
                title: 'Zero-Knowledge Proofs',
                description: 'Prove eligibility without revealing actual credit score',
                icon: '✓',
              },
              {
                title: 'On-Chain Verification',
                description: 'All proofs verified by Aleo VM with cryptographic guarantees',
                icon: '🏢',
              },
            ].map((feature, i) => (
              <div key={i} className="glass-hover rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-4 text-gray-300">
            {[
              { title: '1. Credit Score Storage', desc: 'Credit scores are stored as private records on Aleo. Only the owner can access the actual score value.', color: 'text-neon-blue' },
              { title: '2. Score Updates', desc: 'When borrowers repay loans, their credit score increases privately on-chain. Defaults decrease the score.', color: 'text-neon-purple' },
              { title: '3. ZK Proof Generation', desc: 'Borrowers generate zero-knowledge proofs that their credit score meets the lender\'s threshold.', color: 'text-neon-green' },
              { title: '4. Lender Verification', desc: 'Lenders verify the ZK proof on-chain and receive only the eligibility status.', color: 'text-neon-pink' },
            ].map((step, i) => (
              <div key={i} className="glass-hover rounded-lg p-4">
                <h3 className={`font-semibold ${step.color} mb-2`}>{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    )
  }

  return (
    <div className="space-y-6 borrower-dashboard">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text" style={{
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Borrower Dashboard</h1>
        <p className="text-gray-400">Manage your private credit profile and generate ZK proofs</p>
      </motion.div>

      {isLoading ? (
        <LoadingSkeleton type="dashboard" />
      ) : currentTier !== null ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div />
                <CreditReportExport tier={currentTier} loanCount={loanCount} address={publicKey || ''} />
              </div>
              <CreditTierCard tier={currentTier} loanCount={loanCount} hideScore={true} />
            </div>

            <LoanManager onUpdate={loadCreditRecords} />
            <ProofGenerator threshold={creditThreshold} />

            <div className="lg:col-span-2">
              <CreditTips currentTier={currentTier} />
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink to-red-500 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <p className="text-sm text-gray-400">Your credit history (private)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {loanCount === 0 ? (
                    <p className="text-center text-gray-500 py-8">No activity yet. Take a loan to get started!</p>
                  ) : (
                    <div className="space-y-2">
                      {Array.from({ length: loanCount }).map((_, i) => (
                        <div key={i} className="glass-hover rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-neon-green" />
                            <div>
                              <p className="text-sm font-medium">Loan #{i + 1}</p>
                              <p className="text-xs text-gray-500">Completed</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(Date.now() - (loanCount - i) * 86400000).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold">System Flow Visualization</h3>
                  <p className="text-gray-400">How your privacy is secured through ZK-proofs</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { icon: User, title: 'Request', color: 'text-blue-500' },
                    { icon: TrendingUp, title: 'Repay', color: 'text-green-500' },
                    { icon: Shield, title: 'Privacy', color: 'text-purple-500' },
                    { icon: CheckCircle, title: 'ZK-Proof', color: 'text-cyan-500' },
                    { icon: Building2, title: 'Verify', color: 'text-orange-500' },
                    { icon: CheckCircle, title: 'Approval', color: 'text-emerald-500' },
                  ].map((step, i) => {
                    const Icon = step.icon
                    return (
                      <div key={i} className="flex flex-col items-center space-y-2 p-4 glass-hover rounded-xl">
                        <Icon className={`w-8 h-8 ${step.color}`} />
                        <span className="text-xs font-bold text-center">{step.title}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <FAQSection />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-12 text-center"
        >
          <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
            <div style={{
              padding: '2px',
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              clipPath: 'polygon(50% 0%, 90% 20%, 90% 70%, 50% 100%, 10% 70%, 10% 20%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
            }}>
              <div style={{
                background: 'var(--bg-primary)',
                clipPath: 'polygon(50% 0%, 90% 20%, 90% 70%, 50% 100%, 10% 70%, 10% 20%)',
                padding: '10px'
              }}>
                <img src="/logo image new.png" alt="Aleo Credit Logo" className="w-32 h-32" style={{
                  objectFit: 'contain'
                }} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3 gradient-text" style={{
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Welcome to Aleo Credit</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Initialize your private credit profile to start building your on-chain credit history with zero-knowledge proofs.
          </p>

          <motion.button
            onClick={handleInitialize}
            disabled={isInitializing}
            className="px-8 py-4 text-white font-bold text-lg disabled:opacity-50 relative group"
            style={{
              background: 'rgba(0, 255, 255, 0.05)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.1)',
              clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              scale: 1.05,
              background: 'rgba(0, 255, 255, 0.15)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 15px rgba(0, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isInitializing ? 'Initializing...' : 'Initialize Credit Profile'}
          </motion.button>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Starting Tier', value: 'Bronze' },
              { label: 'Initial Score', value: '300' },
              { label: 'Privacy', value: '100%' },
            ].map((item, i) => (
              <div key={i} className="glass-hover rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-neon-blue">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
