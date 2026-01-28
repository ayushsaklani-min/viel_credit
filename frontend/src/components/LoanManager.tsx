import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react'
import { useCreditStore } from '../store/creditStore'
import { useAleoWallet } from '../hooks/useAleoWallet'
import { calculateScoreIncrease, calculateScoreDecrease } from '../utils/creditTiers'
import { getLoanLimit, isLoanAmountValid, getLoanAmountError } from '../utils/loanLimits'
import InterestRateCalculator from './InterestRateCalculator'
import ConfirmationModal from './ConfirmationModal'

interface LoanManagerProps {
  onUpdate?: () => void
}

export default function LoanManager({ onUpdate }: LoanManagerProps) {
  const { publicKey } = useAleoWallet()
  const { creditRecordCiphertext, currentLoanCiphertext, setCurrentLoanCiphertext, addTransaction, currentTier } = useCreditStore()
  const { issueLoan, repayLoan, defaultLoan, updateScoreRepayment, updateScoreDefault } = useAleoWallet()
  const [loanAmount, setLoanAmount] = useState(100)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRepayModal, setShowRepayModal] = useState(false)
  const [showDefaultModal, setShowDefaultModal] = useState(false)
  const [showIssueLoanModal, setShowIssueLoanModal] = useState(false)

  const tier = currentTier ?? 0
  const loanLimit = getLoanLimit(tier)
  const loanError = getLoanAmountError(tier, loanAmount)

  const handleIssueLoan = async () => {
    if (!publicKey || !creditRecordCiphertext) return
    if (!isLoanAmountValid(tier, loanAmount)) return

    setIsProcessing(true)
    setShowIssueLoanModal(false)
    try {
      const txId = await issueLoan(publicKey, loanAmount)

      addTransaction({
        txId,
        status: 'pending',
        message: 'Issuing mock loan...',
      })

      // Simulate loan issuance
      setTimeout(() => {
        setCurrentLoanCiphertext('loan_ciphertext_' + Date.now())
        setIsProcessing(false)
      }, 2000)
    } catch (error) {
      console.error('Error issuing loan:', error)
      setIsProcessing(false)
    }
  }

  const handleRepayLoan = async () => {
    if (!publicKey || !currentLoanCiphertext || !creditRecordCiphertext) return

    setIsProcessing(true)
    setShowRepayModal(false)
    try {
      // First, mark loan as repaid
      const repayTxId = await repayLoan(currentLoanCiphertext)

      addTransaction({
        txId: repayTxId,
        status: 'pending',
        message: 'Repaying loan...',
      })

      // Then update credit score (happens in Leo Wallet with private record)
      setTimeout(async () => {
        const updateTxId = await updateScoreRepayment(creditRecordCiphertext, loanAmount)

        addTransaction({
          txId: updateTxId,
          status: 'pending',
          message: 'Updating credit score privately...',
        })

        setTimeout(() => {
          setCurrentLoanCiphertext(null)
          if (onUpdate) onUpdate() // Reload credit records
          setIsProcessing(false)
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error('Error repaying loan:', error)
      setIsProcessing(false)
    }
  }

  const handleDefaultLoan = async () => {
    if (!publicKey || !currentLoanCiphertext || !creditRecordCiphertext) return

    setIsProcessing(true)
    setShowDefaultModal(false)
    try {
      // First, mark loan as defaulted
      const defaultTxId = await defaultLoan(currentLoanCiphertext)

      addTransaction({
        txId: defaultTxId,
        status: 'pending',
        message: 'Marking loan as defaulted...',
      })

      // Then update credit score (happens in Leo Wallet with private record)
      setTimeout(async () => {
        const updateTxId = await updateScoreDefault(creditRecordCiphertext, loanAmount)

        addTransaction({
          txId: updateTxId,
          status: 'pending',
          message: 'Updating credit score privately...',
        })

        setTimeout(() => {
          setCurrentLoanCiphertext(null)
          if (onUpdate) onUpdate() // Reload credit records
          setIsProcessing(false)
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error('Error defaulting loan:', error)
      setIsProcessing(false)
    }
  }

  if (!publicKey) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">Connect Leo Wallet first</p>
      </div>
    )
  }

  if (!creditRecordCiphertext) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">Initialize credit profile first</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-md), 0 0 20px rgba(16, 185, 129, 0.15)'
      }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(135deg, #10b981, #06b6d4)',
          filter: 'blur(40px)'
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 10px rgba(16, 185, 129, 0.3)',
                '0 0 20px rgba(16, 185, 129, 0.6)',
                '0 0 10px rgba(16, 185, 129, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <DollarSign className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold">Mock Loan Manager</h3>
            <p className="text-sm text-gray-400">Demo lending operations</p>
          </div>
        </div>
      </div>

      {!currentLoanCiphertext ? (
        <div className="space-y-4">
          {/* Loan limit info */}
          <div className="glass-hover rounded-lg p-3 border border-neon-blue/20">
            <p className="text-xs text-gray-400 mb-1">Your {loanLimit.name} Tier Limits</p>
            <p className="text-sm font-semibold">
              {loanLimit.minAmount} - {loanLimit.maxAmount} credits
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className={`w-full px-4 py-3 rounded-lg glass border ${loanError ? 'border-red-500/50' : 'border-white/10'
                } focus:border-neon-blue focus:outline-none transition-colors`}
              min={loanLimit.minAmount}
              max={loanLimit.maxAmount}
              step="50"
              disabled={isProcessing}
            />
            {loanError && (
              <p className="text-xs text-red-400 mt-1">{loanError}</p>
            )}
          </div>

          {/* Interest rate calculator */}
          <InterestRateCalculator tier={tier} loanAmount={loanAmount} />

          <motion.button
            onClick={() => setShowIssueLoanModal(true)}
            disabled={isProcessing || !!loanError}
            className="w-full py-3 rounded-lg font-semibold disabled:opacity-50 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              color: 'white',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center space-x-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              'Issue Mock Loan'
            )}
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-hover rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Active Loan</p>
            <p className="text-3xl font-bold text-neon-green">{loanAmount}</p>
            <p className="text-xs text-gray-500 mt-1">Loan managed in Leo Wallet</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => setShowRepayModal(true)}
              disabled={isProcessing}
              className="py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Repay</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={() => setShowDefaultModal(true)}
              disabled={isProcessing}
              className="py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Default</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>✓ Repay: +{calculateScoreIncrease(loanAmount)} score (private)</p>
            <p>✓ Default: -{calculateScoreDecrease(loanAmount)} score (private)</p>
            <p>✓ Score updates happen in Leo Wallet</p>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showIssueLoanModal}
        onClose={() => setShowIssueLoanModal(false)}
        onConfirm={handleIssueLoan}
        title="Issue Loan"
        message={`Are you sure you want to issue a loan of ${loanAmount} credits? This will create an active loan that you'll need to repay or default.`}
        confirmText="Issue Loan"
        type="info"
      />

      <ConfirmationModal
        isOpen={showRepayModal}
        onClose={() => setShowRepayModal(false)}
        onConfirm={handleRepayLoan}
        title="Repay Loan"
        message={`Repaying this loan will increase your credit score by +${calculateScoreIncrease(loanAmount)} points privately in your Leo Wallet. Continue?`}
        confirmText="Repay Loan"
        type="info"
      />

      <ConfirmationModal
        isOpen={showDefaultModal}
        onClose={() => setShowDefaultModal(false)}
        onConfirm={handleDefaultLoan}
        title="Default on Loan"
        message={`⚠️ Warning: Defaulting will decrease your credit score by -${calculateScoreDecrease(loanAmount)} points. This may downgrade your tier and affect future borrowing. Are you sure?`}
        confirmText="Default Loan"
        type="danger"
      />
    </motion.div>
  )
}
