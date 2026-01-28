import { create } from 'zustand'
import { EligibilityProofData, TransactionStatus } from '../types'

interface CreditState {
  // Borrower state - ONLY tier info, never actual scores
  currentTier: number | null
  loanCount: number
  creditRecordCiphertext: string | null
  currentLoanCiphertext: string | null

  // Lender state
  creditThreshold: number
  pendingProofs: EligibilityProofData[]

  // Transaction tracking
  pendingTransactions: TransactionStatus[]

  // Actions
  setTierInfo: (tier: number, loanCount: number) => void
  setCreditRecordCiphertext: (ciphertext: string | null) => void
  setCurrentLoanCiphertext: (ciphertext: string | null) => void
  setCreditThreshold: (threshold: number) => void
  addPendingProof: (proof: EligibilityProofData) => void
  addTransaction: (tx: TransactionStatus) => void
  updateTransaction: (txId: string, status: 'confirmed' | 'failed', message?: string) => void
  reset: () => void
}

export const useCreditStore = create<CreditState>((set) => ({
  // Borrower state
  currentTier: null,
  loanCount: 0,
  creditRecordCiphertext: null,
  currentLoanCiphertext: null,

  // Lender state
  creditThreshold: 600,
  pendingProofs: [],

  // Transactions
  pendingTransactions: [],

  setTierInfo: (tier, loanCount) => set({
    currentTier: tier,
    loanCount: loanCount,
  }),

  setCreditRecordCiphertext: (ciphertext) => set({
    creditRecordCiphertext: ciphertext
  }),

  setCurrentLoanCiphertext: (ciphertext) => set({
    currentLoanCiphertext: ciphertext
  }),

  setCreditThreshold: (threshold) => set({ creditThreshold: threshold }),

  addPendingProof: (proof) => set((state) => ({
    pendingProofs: [...state.pendingProofs, proof],
  })),

  addTransaction: (tx) => set((state) => ({
    pendingTransactions: [...state.pendingTransactions, tx],
  })),

  updateTransaction: (txId, status, message) => set((state) => ({
    pendingTransactions: state.pendingTransactions.map(tx =>
      tx.txId === txId ? { ...tx, status, message } : tx
    ),
  })),

  reset: () => set({
    currentTier: null,
    loanCount: 0,
    creditRecordCiphertext: null,
    currentLoanCiphertext: null,
    creditThreshold: 600,
    pendingProofs: [],
    pendingTransactions: [],
  }),
}))
