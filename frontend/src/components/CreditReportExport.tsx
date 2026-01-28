import { motion } from 'framer-motion'
import { FileDown, Loader } from 'lucide-react'
import { useState } from 'react'
import { getTierInfo } from '../utils/creditTiers'

interface CreditReportExportProps {
  tier: number
  loanCount: number
  address: string
}

export default function CreditReportExport({ tier, loanCount, address }: CreditReportExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      const tierInfo = getTierInfo(tier)
      const date = new Date().toLocaleDateString()
      
      // Create HTML content for PDF
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Aleo Credit Report</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              border-radius: 16px;
              padding: 40px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .header {
              border-bottom: 3px solid #667eea;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            h1 {
              color: #1a1a1a;
              margin: 0 0 10px 0;
              font-size: 32px;
            }
            .subtitle {
              color: #666;
              font-size: 14px;
            }
            .tier-badge {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 8px;
              font-weight: bold;
              font-size: 18px;
              margin: 20px 0;
              background: ${tierInfo.gradient};
              color: white;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 30px 0;
            }
            .info-item {
              padding: 20px;
              background: #f8f9fa;
              border-radius: 12px;
              border-left: 4px solid #667eea;
            }
            .info-label {
              color: #666;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 8px;
            }
            .info-value {
              color: #1a1a1a;
              font-size: 20px;
              font-weight: bold;
            }
            .privacy-notice {
              background: #e3f2fd;
              border-left: 4px solid #2196f3;
              padding: 16px;
              border-radius: 8px;
              margin-top: 30px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Aleo Credit Report</h1>
              <p class="subtitle">Privacy-Preserving Credit Score System</p>
            </div>
            
            <div class="tier-badge">${tierInfo.name} Tier</div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Credit Tier</div>
                <div class="info-value">${tierInfo.name} (Tier ${tier})</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Score Range</div>
                <div class="info-value">${tierInfo.range}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Completed Loans</div>
                <div class="info-value">${loanCount}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Report Date</div>
                <div class="info-value">${date}</div>
              </div>
            </div>
            
            <div class="info-item" style="margin-top: 20px;">
              <div class="info-label">Wallet Address</div>
              <div class="info-value" style="font-size: 14px; word-break: break-all;">${address}</div>
            </div>
            
            <div class="privacy-notice">
              <strong>🔒 Privacy Notice:</strong> This report displays only your credit tier information. 
              Your actual credit score remains private and is stored securely in your Leo Wallet using 
              zero-knowledge proofs on the Aleo blockchain. No one can access your private score without 
              your explicit permission.
            </div>
            
            <div class="footer">
              <p>Generated by Aleo Private Credit Score System</p>
              <p>Powered by Zero-Knowledge Proofs on Aleo Blockchain</p>
              <p>This is a privacy-preserving credit report - actual scores are never disclosed</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      // Create blob and download
      const blob = new Blob([content], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `aleo-credit-report-${date.replace(/\//g, '-')}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      // Show success message
      setTimeout(() => {
        alert('✅ Credit report exported successfully!\n\nOpen the HTML file in your browser and use Print > Save as PDF to create a PDF version.')
      }, 500)
    } catch (error) {
      console.error('Error exporting report:', error)
      alert('Failed to export credit report')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <motion.button
      onClick={exportToPDF}
      disabled={isExporting}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-hover border border-white/10 font-semibold text-sm disabled:opacity-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isExporting ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4" />
          <span>Export Report</span>
        </>
      )}
    </motion.button>
  )
}
