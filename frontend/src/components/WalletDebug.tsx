import { useEffect, useState } from 'react'
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react'

export default function WalletDebug() {
  const wallet = useWallet()
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const log = (msg: string) => {
      console.log(msg)
      setLogs(prev => [...prev.slice(-8), msg])
    }

    log('=== WALLET DEBUG ===')
    log(`Connected: ${wallet.connected}`)
    log(`Connecting: ${wallet.connecting}`)
    log(`Address: ${wallet.address || 'null'}`)
    log(`Wallet: ${wallet.wallet?.adapter?.name || 'null'}`)
    log(`Network: ${wallet.network || 'null'}`)
    log(`Execute TX: ${typeof wallet.executeTransaction}`)
    log(`Request Records: ${typeof wallet.requestRecords}`)
  }, [wallet.connected, wallet.connecting, wallet.address, wallet.wallet, wallet.network])

  const testTransaction = async () => {
    if (!wallet.connected) {
      alert('Please connect wallet first!')
      return
    }

    try {
      console.log('Testing transaction execution...')
      console.log('Address:', wallet.address)
      console.log('Network:', wallet.network)

      // @ts-ignore
      const result = await wallet.executeTransaction({
        program: 'credit_engine.aleo',
        function: 'initialize_user',
        inputs: [wallet.address!],
        fee: 1000000,
      })

      console.log('Transaction result:', result)
      alert(`Success! TX ID: ${result?.transactionId}`)
    } catch (error: any) {
      console.error('Transaction error:', error)
      alert(`Error: ${error.message || error}`)
    }
  }

  const testRecords = async () => {
    if (!wallet.connected) {
      alert('Please connect wallet first!')
      return
    }

    try {
      console.log('Testing record fetching...')
      const records = await wallet.requestRecords('credit_engine.aleo', true)
      console.log('Records:', records)
      alert(`Found ${records?.length || 0} records`)
    } catch (error: any) {
      console.error('Records error:', error)
      alert(`Error: ${error.message || error}`)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      background: 'rgba(0, 0, 0, 0.95)',
      color: 'lime',
      padding: '10px',
      fontSize: '11px',
      fontFamily: 'monospace',
      zIndex: 9999,
      border: '1px solid lime',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      borderRadius: '8px',
    }}>
      <div><strong>🔍 WALLET DEBUG</strong></div>
      <div>Connected: {wallet.connected ? '✅ YES' : '❌ NO'}</div>
      <div>Connecting: {wallet.connecting ? '⏳ YES' : 'NO'}</div>
      <div>Address: {wallet.address ? wallet.address.slice(0, 12) + '...' : 'null'}</div>
      <div>Wallet: {wallet.wallet?.adapter?.name || 'null'}</div>
      <div>Network: {wallet.network || 'null'}</div>
      <hr style={{ margin: '5px 0', borderColor: 'lime' }} />

      {wallet.connected && (
        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
          <button
            onClick={testTransaction}
            style={{
              padding: '5px 10px',
              background: '#00d4ff',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            Test TX
          </button>
          <button
            onClick={testRecords}
            style={{
              padding: '5px 10px',
              background: '#b794f6',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            Test Records
          </button>
        </div>
      )}

      <hr style={{ margin: '5px 0', borderColor: 'lime' }} />
      <div style={{ fontSize: '9px', color: '#888', maxHeight: '200px', overflow: 'auto' }}>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  )
}
