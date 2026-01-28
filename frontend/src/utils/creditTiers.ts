import { TierInfo } from '../types'

export const TIER_INFO: Record<number, TierInfo> = {
  0: {
    name: 'Bronze',
    color: '#cd7f32',
    minScore: 300,
    maxScore: 599,
    gradient: 'linear-gradient(135deg, #cd7f32 0%, #b8732d 100%)',
    range: '300-599',
  },
  1: {
    name: 'Silver',
    color: '#94a3b8',
    minScore: 600,
    maxScore: 749,
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    range: '600-749',
  },
  2: {
    name: 'Gold',
    color: '#fbbf24',
    minScore: 750,
    maxScore: 899,
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    range: '750-899',
  },
  3: {
    name: 'Platinum',
    color: '#a78bfa',
    minScore: 900,
    maxScore: 1000,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    range: '900-1000',
  },
}

export function getTierFromScore(score: number): number {
  if (score >= 900) return 3
  if (score >= 750) return 2
  if (score >= 600) return 1
  return 0
}

export function getTierInfo(tier: number): TierInfo {
  return TIER_INFO[tier] || TIER_INFO[0]
}

export function calculateScoreIncrease(repaymentAmount: number): number {
  return Math.floor(repaymentAmount / 2)
}

export function calculateScoreDecrease(defaultAmount: number): number {
  return defaultAmount
}

export function formatAddress(address: string): string {
  if (address.length <= 12) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
