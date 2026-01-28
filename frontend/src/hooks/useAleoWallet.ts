import { useWallet } from '@provablehq/aleo-wallet-adaptor-react'

const CREDIT_ENGINE_PROGRAM = import.meta.env.VITE_CREDIT_ENGINE_ADDRESS || 'credit_engine.aleo'
const MOCK_LENDER_PROGRAM = import.meta.env.VITE_MOCK_LENDER_ADDRESS || 'mock_lender.aleo'

export function useAleoWallet() {
  const {
    connected,
    connecting,
    disconnecting,
    reconnecting,
    address,
    network,
    wallet,
    disconnect,
    executeTransaction,
    requestRecords,
  } = useWallet()

  const publicKey = address

  // Transaction helper using correct wallet adapter API
  const executeAleoTransaction = async (
    program: string, 
    functionName: string, 
    inputs: string[], 
    fee: number = 1000000
  ) => {
    if (!connected) throw new Error('Wallet not connected')
    
    console.log('Executing transaction:', { program, functionName, inputs, fee })
    
    try {
      // The wallet adapter expects 'function' not 'functionName'
      const result = await executeTransaction({
        program: program,
        function: functionName,  // Changed from functionName to function
        inputs: inputs,
        fee: fee,
      } as any)
      
      console.log('Transaction result:', result)
      return result?.transactionId
    } catch (error) {
      console.error('Transaction error:', error)
      throw error
    }
  }

  // Initialize user credit profile
  const initializeUser = async () => {
    if (!publicKey) throw new Error('Wallet not connected')
    
    console.log('Calling initialize_user with address:', publicKey)
    
    // For initialize_user, we pass the user's address
    // The address should already be in the correct format from the wallet
    return await executeAleoTransaction(
      CREDIT_ENGINE_PROGRAM, 
      'initialize_user', 
      [publicKey] // Just pass the address directly
    )
  }

  // Update score after repayment
  const updateScoreRepayment = async (creditRecordCiphertext: string, repaymentAmount: number) => {
    return await executeAleoTransaction(
      CREDIT_ENGINE_PROGRAM,
      'update_score',
      [creditRecordCiphertext, `${repaymentAmount}u64`, 'true']
    )
  }

  // Update score after default
  const updateScoreDefault = async (creditRecordCiphertext: string, defaultAmount: number) => {
    return await executeAleoTransaction(
      CREDIT_ENGINE_PROGRAM,
      'update_score',
      [creditRecordCiphertext, `${defaultAmount}u64`, 'false']
    )
  }

  // Generate ZK eligibility proof
  const generateEligibilityProof = async (creditRecordCiphertext: string, threshold: number) => {
    return await executeAleoTransaction(
      CREDIT_ENGINE_PROGRAM,
      'generate_proof',
      [creditRecordCiphertext, `${threshold}u64`]
    )
  }

  // Verify proof
  const verifyProof = async (proofRecordCiphertext: string, expectedThreshold: number) => {
    return await executeAleoTransaction(
      CREDIT_ENGINE_PROGRAM,
      'verify_proof',
      [proofRecordCiphertext, `${expectedThreshold}u64`]
    )
  }

  // Issue mock loan
  const issueLoan = async (borrowerAddress: string, amount: number) => {
    return await executeAleoTransaction(
      MOCK_LENDER_PROGRAM,
      'issue_loan',
      [borrowerAddress, `${amount}u64`]
    )
  }

  // Repay loan
  const repayLoan = async (loanRecordCiphertext: string) => {
    return await executeAleoTransaction(
      MOCK_LENDER_PROGRAM,
      'repay_loan',
      [loanRecordCiphertext]
    )
  }

  // Default on loan
  const defaultLoan = async (loanRecordCiphertext: string) => {
    return await executeAleoTransaction(
      MOCK_LENDER_PROGRAM,
      'default_loan',
      [loanRecordCiphertext]
    )
  }

  // Get user's credit score records
  const getCreditRecords = async () => {
    if (!connected) return []
    try {
      const records = await requestRecords(CREDIT_ENGINE_PROGRAM, true)
      return records?.filter((r: any) => r.recordName === 'CreditScore') || []
    } catch (error) {
      console.error('Error fetching credit records:', error)
      return []
    }
  }

  // Get user's loan records
  const getLoanRecords = async () => {
    if (!connected) return []
    try {
      const records = await requestRecords(MOCK_LENDER_PROGRAM, true)
      return records?.filter((r: any) => r.recordName === 'Loan') || []
    } catch (error) {
      console.error('Error fetching loan records:', error)
      return []
    }
  }

  // Get eligibility proof records
  const getProofRecords = async () => {
    if (!connected) return []
    try {
      const records = await requestRecords(CREDIT_ENGINE_PROGRAM, true)
      return records?.filter((r: any) => r.recordName === 'EligibilityProof') || []
    } catch (error) {
      console.error('Error fetching proof records:', error)
      return []
    }
  }

  return {
    publicKey,
    connected,
    connecting,
    disconnecting,
    reconnecting,
    address,
    network,
    wallet,
    disconnect,
    // Credit operations
    initializeUser,
    updateScoreRepayment,
    updateScoreDefault,
    generateEligibilityProof,
    verifyProof,
    // Loan operations
    issueLoan,
    repayLoan,
    defaultLoan,
    // Record queries
    getCreditRecords,
    getLoanRecords,
    getProofRecords,
  }
}
