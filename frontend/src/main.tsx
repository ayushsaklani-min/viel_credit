import React from 'react'
import ReactDOM from 'react-dom/client'
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react'
import { WalletModalProvider } from '@provablehq/aleo-wallet-adaptor-react-ui'
import { PuzzleWalletAdapter } from '@provablehq/aleo-wallet-adaptor-puzzle'
import { LeoWalletAdapter } from '@provablehq/aleo-wallet-adaptor-leo'
import { ShieldWalletAdapter } from '@provablehq/aleo-wallet-adaptor-shield'
import { FoxWalletAdapter } from '@provablehq/aleo-wallet-adaptor-fox'
import { Network } from '@provablehq/aleo-types'
import { DecryptPermission } from '@provablehq/aleo-wallet-adaptor-core'
import App from './App'
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css'
import './index.css'

const wallets = [
  new PuzzleWalletAdapter(),
  new LeoWalletAdapter(),
  new ShieldWalletAdapter(),
  new FoxWalletAdapter(),
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AleoWalletProvider
      wallets={wallets}
      autoConnect={true}
      network={Network.TESTNET3}
      decryptPermission={DecryptPermission.UponRequest}
      programs={['credit_engine.aleo', 'mock_lender.aleo']}
    >
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </AleoWalletProvider>
  </React.StrictMode>,
)
