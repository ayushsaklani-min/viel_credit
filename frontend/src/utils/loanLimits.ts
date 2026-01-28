// Loan amount limits based on credit tier
export interface LoanLimit {
  tier: number
  name: string
  minAmount: number
  maxAmount: number
  interestRate: number
}

export const loanLimits: LoanLimit[] = [
  {
    tier: 0,
    name: 'Bronze',
    minAmount: 50,
    maxAmount: 200,
    interestRate: 15
  },
  {
    tier: 1,
    name: 'Silver',
    minAmount: 100,
    maxAmount: 350,
    interestRate: 10
  },
  {
    tier: 2,
    name: 'Gold',
    minAmount: 200,
    maxAmount: 500,
    interestRate: 6
  },
  {
    tier: 3,
    name: 'Platinum',
    minAmount: 300,
    maxAmount: 1000,
    interestRate: 3
  }
]

export function getLoanLimit(tier: number): LoanLimit {
  return loanLimits[tier] || loanLimits[0]
}

export function isLoanAmountValid(tier: number, amount: number): boolean {
  const limit = getLoanLimit(tier)
  return amount >= limit.minAmount && amount <= limit.maxAmount
}

export function getLoanAmountError(tier: number, amount: number): string | null {
  const limit = getLoanLimit(tier)
  
  if (amount < limit.minAmount) {
    return `Minimum loan amount for ${limit.name} tier is ${limit.minAmount} credits`
  }
  
  if (amount > limit.maxAmount) {
    return `Maximum loan amount for ${limit.name} tier is ${limit.maxAmount} credits`
  }
  
  return null
}
