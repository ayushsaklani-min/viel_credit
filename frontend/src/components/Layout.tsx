import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, HelpCircle } from 'lucide-react'
import { WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui'
import { useAleoWallet } from '../hooks/useAleoWallet'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { connected } = useAleoWallet()
  const [logoError, setLogoError] = useState(false)

  const navItems = [
    { path: '/borrower', label: 'Borrower', icon: TrendingUp },
    { path: '/lender', label: 'Lender', icon: Shield },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      {/* Cyberpunk Header with Neon Glowing Rectangles */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{
        background: 'linear-gradient(180deg, rgba(10, 14, 26, 0.95) 0%, rgba(17, 24, 39, 0.9) 100%)',
        borderBottom: '2px solid #00ffff',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
        zIndex: 100,
        position: 'relative'
      }}>
        {/* Animated Corner Brackets */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderTop: '3px solid #00ffff',
          borderLeft: '3px solid #00ffff',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40px',
          height: '40px',
          borderTop: '3px solid #ff00ff',
          borderRight: '3px solid #ff00ff',
          boxShadow: '0 0 10px rgba(255, 0, 255, 0.8)'
        }} />

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Cyberpunk Logo with Glowing Rectangle */}
            <Link to="/" className="flex items-center group relative" style={{ marginLeft: '40px' }}>
              <div style={{
                position: 'relative',
                padding: '8px 20px',
                background: 'rgba(0, 255, 255, 0.05)',
                border: '2px solid #00ffff',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(0, 255, 255, 0.1)',
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                transition: 'all 0.3s ease'
              }}
                className="hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]">
                <span style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  fontFamily: "'Orbitron', 'Inter', sans-serif",
                  color: '#00ffff',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>ALEO</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  fontFamily: "'Azeret Mono', monospace",
                  color: '#ff00ff',
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5)',
                  letterSpacing: '0.1em',
                  marginLeft: '12px',
                  textTransform: 'uppercase'
                }}>CREDIT</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4" style={{ marginRight: '60px' }}>
              {/* Cyberpunk Navigation Items */}
              <nav className="flex space-x-3">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="relative"
                    >
                      <motion.div
                        className="relative px-5 py-2.5 flex items-center space-x-2 transition-all"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))'
                            : 'rgba(17, 24, 39, 0.5)',
                          border: isActive ? '2px solid #00ffff' : '2px solid rgba(100, 100, 100, 0.3)',
                          color: isActive ? '#00ffff' : 'var(--text-secondary)',
                          boxShadow: isActive
                            ? '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(0, 255, 255, 0.1)'
                            : '0 0 5px rgba(100, 100, 100, 0.2)',
                          clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                          fontFamily: "'Orbitron', 'Inter', sans-serif",
                          fontWeight: '600',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase'
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: isActive
                            ? '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 15px rgba(0, 255, 255, 0.2)'
                            : '0 0 15px rgba(139, 92, 246, 0.5)',
                          borderColor: isActive ? '#00ffff' : '#8b5cf6'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" style={{
                          filter: isActive ? 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))' : 'none'
                        }} />
                        <span className="text-xs font-bold">{item.label}</span>
                      </motion.div>
                    </Link>
                  )
                })}
              </nav>

              {/* Wallet Button with Cyberpunk Styling */}
              {connected && <WalletMultiButton />}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      {/* Premium Footer with Gradient Accent - Hidden */}
      <footer className="mt-auto relative" style={{
        borderTop: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, transparent, #8b5cf6, transparent) 1',
        background: 'var(--bg-secondary)',
        opacity: 0,
        pointerEvents: 'none'
      }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <p>Built on Aleo • Zero-Knowledge Proofs</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-glow"></div>
              <span className="text-xs">Live</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
