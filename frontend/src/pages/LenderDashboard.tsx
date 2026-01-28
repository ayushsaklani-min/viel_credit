import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useCreditStore } from '../store/creditStore'

export default function LenderDashboard() {
  const { creditThreshold, setCreditThreshold, pendingProofs } = useCreditStore()
  const [tempThreshold, setTempThreshold] = useState(creditThreshold)

  const handleUpdateThreshold = () => {
    setCreditThreshold(tempThreshold)
  }

  const handleApproveLoan = (proofIndex: number) => {
    const proof = pendingProofs[proofIndex]
    if (proof.is_eligible) {
      const loan = {
        owner: proof.owner,
        lender: 'mock_lender.aleo',
        amount: 200,
        loanId: `loan_${Date.now()}`,
        isActive: true,
      }
      // Loan approved
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Lender Dashboard</h1>
        <p className="text-gray-400">Set credit thresholds and verify borrower eligibility</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threshold settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Credit Threshold</h3>
              <p className="text-sm text-gray-400">Minimum score required</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Threshold Value
              </label>
              <input
                type="number"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-purple focus:outline-none transition-colors text-2xl font-bold text-center"
                min="300"
                max="900"
                step="50"
              />
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <p>• Bronze: 300-599</p>
              <p>• Silver: 600-749</p>
              <p>• Gold: 750-899</p>
              <p>• Platinum: 900+</p>
            </div>

            <motion.button
              onClick={handleUpdateThreshold}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-purple to-pink-500 text-white font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Update Threshold
            </motion.button>
          </div>
        </motion.div>

        {/* Pending proofs */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-cyan-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pending Proofs</h3>
                  <p className="text-sm text-gray-400">Verify borrower eligibility</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-sm font-semibold">
                {pendingProofs.length}
              </span>
            </div>

            <div className="space-y-3">
              {pendingProofs.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No pending proofs</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Borrowers will submit ZK proofs for verification
                  </p>
                </div>
              ) : (
                pendingProofs.map((proof, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-hover rounded-lg p-4 border ${proof.is_eligible
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-red-500/30 bg-red-500/5'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {proof.is_eligible ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400" />
                        )}
                        <div>
                          <p className={`font-semibold ${proof.is_eligible ? 'text-green-400' : 'text-red-400'
                            }`}>
                            {proof.is_eligible ? 'Eligible' : 'Not Eligible'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Threshold: {proof.threshold}
                          </p>
                        </div>
                      </div>

                      {proof.is_eligible && (
                        <motion.button
                          onClick={() => handleApproveLoan(index)}
                          className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Approve Loan
                        </motion.button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="glass rounded p-2">
                        <p className="text-gray-500">Borrower</p>
                        <p className="font-mono text-gray-300">
                          {proof.owner.slice(0, 12)}...
                        </p>
                      </div>
                      <div className="glass rounded p-2">
                        <p className="text-gray-500">Timestamp</p>
                        <p className="text-gray-300">
                          {new Date(proof.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: 'Active Threshold', value: creditThreshold, color: 'neon-purple' },
          { label: 'Pending Proofs', value: pendingProofs.length, color: 'neon-blue' },
          { label: 'Approved Loans', value: pendingProofs.filter(p => p.is_eligible).length, color: 'neon-green' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold text-${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
