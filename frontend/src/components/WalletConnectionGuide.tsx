import { motion } from 'framer-motion'
import { AlertCircle, Download, ExternalLink } from 'lucide-react'

export default function WalletConnectionGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border-2 border-yellow-500/30"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Leo Wallet Not Detected
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            To use this application, you need to install the Leo Wallet browser extension.
          </p>
          
          <div className="space-y-3">
            <div className="glass-hover rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white mb-1">Step 1: Install Leo Wallet</p>
                  <p className="text-xs text-gray-400">Download the browser extension</p>
                </div>
                <a
                  href="https://leo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div className="glass-hover rounded-lg p-4">
              <p className="font-semibold text-white mb-1">Step 2: Create Wallet</p>
              <p className="text-xs text-gray-400">Set up your Aleo wallet account</p>
            </div>
            
            <div className="glass-hover rounded-lg p-4">
              <p className="font-semibold text-white mb-1">Step 3: Get Testnet Tokens</p>
              <p className="text-xs text-gray-400 mb-2">Visit the Aleo faucet to get test tokens</p>
              <a
                href="https://faucet.aleo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:text-neon-purple text-xs flex items-center space-x-1"
              >
                <span>faucet.aleo.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="glass-hover rounded-lg p-4">
              <p className="font-semibold text-white mb-1">Step 4: Refresh Page</p>
              <p className="text-xs text-gray-400">After installing, refresh this page and click "Select Wallet"</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-xs text-blue-300">
              <strong>Note:</strong> Make sure to switch your Leo Wallet to <strong>Testnet</strong> network in the wallet settings.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
