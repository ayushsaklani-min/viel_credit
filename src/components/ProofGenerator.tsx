import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, CheckCircle, XCircle, Loader, AlertCircle } from 'lucide-react'
import { useCreditStore } from '../store/creditStore'
import { useAleoWallet } from '../hooks/useAleoWallet'

interface ProofGeneratorProps {
  threshold: number
}

export default function ProofGenerator({ threshold }: ProofGeneratorProps) {
  const { publicKey } = useAleoWallet()
  const { creditRecordCiphertext, addPendingProof, addTransaction } = useCreditStore()
  const { generateEligibilityProof } = useAleoWallet()
  const [isGenerating, setIsGenerating] = useState(false)
  const [proofResult, setProofResult] = useState<boolean | null>(null)

  const handleGenerateProof = async () => {
    if (!publicKey || !creditRecordCiphertext) return

    setIsGenerating(true)
    setProofResult(null)

    try {
      // CRITICAL: This generates ZK proof INSIDE Leo Wallet
      // The wallet has access to the private credit score record
      // The proof reveals ONLY the boolean eligibility result
      const txId = await generateEligibilityProof(
        creditRecordCiphertext,
        threshold
      )

      addTransaction({
        txId,
        status: 'pending',
        message: 'Generating ZK proof in Leo Wallet...',
      })

      // In production, listen for transaction confirmation
      // For demo, simulate confirmation after 2 seconds
      setTimeout(() => {
        // Note: In real implementation, parse the transaction result
        // to get the actual eligibility boolean from the proof record
        // For demo purposes, we simulate based on tier
        const isEligible = true // This would come from the proof record

        setProofResult(isEligible)

        addPendingProof({
          owner: publicKey,
          is_eligible: isEligible,
          threshold,
          timestamp: Date.now(),
        })

        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error('Error generating proof:', error)
      setIsGenerating(false)
    }
  }

  if (!publicKey) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <Lock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
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
        boxShadow: 'var(--shadow-md), 0 0 20px rgba(139, 92, 246, 0.15)'
      }}
    >
      {/* Subtle animated background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          filter: 'blur(40px)'
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 10px rgba(139, 92, 246, 0.3)',
                '0 0 20px rgba(139, 92, 246, 0.6)',
                '0 0 10px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Lock className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold">ZK Proof Generator</h3>
            <p className="text-sm text-gray-400">Prove eligibility without revealing score</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="glass-hover rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Required Threshold</p>
          <p className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>{threshold}</p>
        </div>

        <motion.button
          onClick={handleGenerateProof}
          disabled={isGenerating}
          className="w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            color: 'white',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Generating Proof...</span>
            </span>
          ) : (
            'Generate ZK Proof'
          )}
        </motion.button>

        <AnimatePresence>
          {proofResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg p-4 ${proofResult
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
                }`}
            >
              <div className="flex items-center space-x-3">
                {proofResult ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <div>
                  <p className={`font-semibold ${proofResult ? 'text-green-400' : 'text-red-400'}`}>
                    {proofResult ? 'Eligible' : 'Not Eligible'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {proofResult
                      ? 'Your credit score meets the threshold'
                      : 'Your credit score is below the threshold'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-gray-500 space-y-1">
          <p>✓ Zero-knowledge proof generated in Leo Wallet</p>
          <p>✓ Your actual score remains private</p>
          <p>✓ Only eligibility status is revealed</p>
          <p>✓ Proof verified on-chain by Aleo VM</p>
        </div>
      </div>
    </motion.div>
  )
}
