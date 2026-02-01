# Aleo Private Credit Score & Lending System

A production-grade privacy-preserving credit scoring and undercollateralized lending platform built on Aleo blockchain using zero-knowledge proofs.

## 🎯 Overview

This system enables:
- **Private Credit Scores**: Borrowers maintain confidential credit scores on-chain
- **Zero-Knowledge Proofs**: Prove creditworthiness without revealing actual scores
- **Undercollateralized Lending**: Lenders verify eligibility through ZK proofs
- **Private Score Updates**: Loan repayment/default events update scores privately

## 🏗️ Architecture

### System Components

1. **Credit Engine (Core)** - Real Leo program managing private credit scores
2. **Mock Lending Protocol** - Demo lending contract for testing
3. **Web Dashboard** - Production-quality React UI with Framer Motion

### Roles

- **Borrower**: Owns private credit score, generates ZK proofs
- **Lender**: Sets thresholds, verifies proofs, approves loans
- **Credit Engine**: Manages scores, generates proofs

## 📁 Project Structure

```
aleo-credit-system/
├── programs/
│   ├── credit_engine/
│   │   ├── src/
│   │   │   └── main.leo
│   │   ├── build/
│   │   └── program.json
│   └── mock_lender/
│       ├── src/
│       │   └── main.leo
│       ├── build/
│       └── program.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔐 Wallet Integration

### Leo Wallet (Mandatory)

This system uses **Leo Wallet exclusively** for all blockchain operations.

**Critical Privacy Features:**
- ✅ ZK proofs generated **inside Leo Wallet**
- ✅ Private credit scores **never leave the wallet**
- ✅ Frontend displays **only tier names** (Bronze, Silver, Gold, Platinum)
- ✅ Eligibility proofs reveal **boolean only** (Eligible/Not Eligible)
- ✅ All score updates happen **in wallet with private records**

**What Frontend Never Does:**
- ❌ Never reads actual credit scores
- ❌ Never stores private record data
- ❌ Never calculates eligibility locally
- ❌ Never displays numeric scores

See [WALLET_INTEGRATION.md](./WALLET_INTEGRATION.md) for complete integration details.

### Quick Wallet Setup

1. Install [Leo Wallet](https://leo.app/)
2. Create testnet account
3. Get testnet tokens from faucet
4. Connect wallet in app (top right button)
5. Initialize credit profile



```bash
# Credit Engine
cd programs/credit_engine
leo build
leo deploy --network testnet

# Mock Lender
cd ../mock_lender
leo build
leo deploy --network testnet
```

### 2. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## 🔐 How ZK Proofs Work

### Credit Score Privacy

1. **Private Storage**: Credit scores stored as private records on Aleo
2. **Tier System**: Users see tiers (Bronze, Silver, Gold, Platinum) not raw scores
3. **ZK Proof Generation**: Borrower proves `credit_score >= threshold` without revealing score
4. **Verification**: Lender verifies proof on-chain, receives boolean result only

### Proof Flow

```
Borrower                    Credit Engine                Lender
   |                              |                          |
   |--[Request Proof]------------>|                          |
   |                              |                          |
   |<-[Generate ZK Proof]---------| (score >= threshold?)    |
   |                              |                          |
   |--[Submit Proof]------------------------------------>|   |
   |                              |                          |
   |                              |<--[Verify Proof]---------|
   |                              |                          |
   |                              |--[Boolean Result]------->|
   |                              |                          |
```

## 🎮 Demo Instructions

### Scenario: New Borrower Journey

1. **Initialize User**
   - Navigate to Borrower Dashboard
   - Click "Initialize Credit Profile"
   - Starts at Tier-0 (Bronze, score: 300)

2. **Take Mock Loan**
   - Go to "Mock Loan" section
   - Request loan (100 credits)
   - Loan issued by mock lender

3. **Repay Loan**
   - Click "Repay Loan"
   - Credit score increases privately (+50 points)
   - Tier may upgrade (Silver at 600+)

4. **Generate ZK Proof**
   - Lender sets threshold (e.g., 600)
   - Borrower clicks "Generate Proof"
   - Proof created without revealing score

5. **Lender Verification**
   - Switch to Lender Dashboard
   - View submitted proof
   - Verify eligibility (Eligible/Not Eligible)
   - Approve loan if eligible

### Default Scenario

1. Take loan
2. Click "Default on Loan"
3. Score decreases (-100 points)
4. Tier may downgrade
5. Future proofs may fail threshold

## 🏆 Credit Tier System

| Tier | Score Range | Color | Status | Loan Limits | Interest Rate |
|------|-------------|-------|--------|-------------|---------------|
| Bronze | 300-599 | Orange | Tier-0 | 50-200 | 15% APR |
| Silver | 600-749 | Silver | Tier-1 | 100-350 | 10% APR |
| Gold | 750-899 | Gold | Tier-2 | 200-500 | 6% APR |
| Platinum | 900+ | Purple | Tier-3 | 300-1000 | 3% APR |

## 🔧 Technical Details

### Leo Programs

#### Credit Engine (`credit_engine.aleo`)

**Key Functions:**
- `initialize_user`: Create new credit profile (private record)
- `update_score_repayment`: Increase score on repayment
- `update_score_default`: Decrease score on default
- `generate_eligibility_proof`: Create ZK proof for threshold check
- `verify_proof`: Verify eligibility proof

**Private Records:**
```leo
record CreditScore {
    owner: address,
    score: u64,
    tier: u8,
}
```

#### Mock Lender (`mock_lender.aleo`)

**Key Functions:**
- `issue_loan`: Create mock loan
- `repay_loan`: Mark repayment, trigger score update
- `default_loan`: Mark default, trigger score decrease

### Frontend Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Aleo SDK** - Blockchain interaction
- **Vite** - Fast build tool

### UI Features

- Dark mode with glassmorphism
- Real-time credit tier visualization
- Animated proof generation flow
- Responsive dashboard layout
- Neon accent highlights
- Professional typography (Inter font)

## 🔒 Security Considerations

1. **Private Records**: Scores never exposed publicly
2. **ZK Proofs**: Only boolean eligibility revealed
3. **On-Chain Verification**: All proofs verified by Aleo VM
4. **No Trusted Setup**: Uses Aleo's universal setup

## 🎨 UI/UX Highlights

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Smooth Transitions**: Framer Motion animations (200-300ms)
- **Color Coding**: Tier-based color system
- **Visual Feedback**: Loading states, success/error toasts
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, keyboard navigation
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Loading Skeletons**: Animated shimmer effects for better UX
- **Confirmation Modals**: Beautiful transaction confirmations
- **Interest Calculator**: Real-time interest rate estimates
- **Credit Tips**: Personalized advice based on tier
- **FAQ Section**: Comprehensive help documentation
- **PDF Export**: Download credit reports

## 📊 System Flow Visualization

The UI includes an animated flow diagram showing:
1. Borrower requests loan
2. Repayment updates score
3. Score update (private)
4. ZK proof generation
5. Lender verification
6. Loan approval

## 🧪 Testing

```bash
# Test Leo programs
cd programs/credit_engine
leo test

cd ../mock_lender
leo test

# Test frontend
cd frontend
npm test
```

## 🚢 Deployment

### Testnet Deployment

1. Configure `.env`:
```env
VITE_CREDIT_ENGINE_ADDRESS=credit_engine.aleo
VITE_MOCK_LENDER_ADDRESS=mock_lender.aleo
VITE_NETWORK=testnet
```

2. Deploy programs (see Quick Start)

3. Build frontend:
```bash
cd frontend
npm run build
```


## 📝 License

MIT

## 🤝 Contributing

This is a buildathon submission. For production use, conduct thorough security audits.

## 📧 Contact

Built for Aleo
