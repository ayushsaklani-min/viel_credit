// IMPORTANT: Frontend never stores actual credit scores
// Only tier information is displayed to maintain privacy

export interface CreditRecordData {
  // This represents the DECRYPTED record data from Leo Wallet
  // Used only for tier calculation, never displayed
  owner: string
  tier: number
  loan_count: number
  // score is intentionally omitted - never accessed by frontend
}

export interface CreditRecordCiphertext {
  // Encrypted record reference for transactions
  ciphertext: string
  recordName: string
}

export interface EligibilityProofData {
  owner: string
  is_eligible: boolean
  threshold: number
  timestamp: number
}

export interface LoanRecordData {
  owner: string
  lender: string
  amount: number
  loan_id: string
  is_active: boolean
}

export type CreditTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface TierInfo {
  name: CreditTier
  color: string
  minScore: number
  maxScore: number
  gradient: string
  range?: string
}

export interface TransactionStatus {
  txId: string
  status: 'pending' | 'confirmed' | 'failed'
  message?: string
}
