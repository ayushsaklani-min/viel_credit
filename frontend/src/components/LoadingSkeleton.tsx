import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'button' | 'dashboard'
  count?: number
}

export default function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  }

  if (type === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credit tier card skeleton */}
          <div className="lg:col-span-2">
            <motion.div
              className="glass rounded-2xl p-6 h-48"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                backgroundSize: '200% 100%',
              }}
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
          </div>
          
          {/* Two column skeletons */}
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 h-64"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                backgroundSize: '200% 100%',
              }}
              animate={shimmer.animate}
              transition={{ ...shimmer.transition, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="glass rounded-2xl p-6 h-32"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
              backgroundSize: '200% 100%',
            }}
            animate={shimmer.animate}
            transition={{ ...shimmer.transition, delay: i * 0.1 }}
          />
        ))}
      </>
    )
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="h-4 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
              backgroundSize: '200% 100%',
              width: `${Math.random() * 40 + 60}%`,
            }}
            animate={shimmer.animate}
            transition={{ ...shimmer.transition, delay: i * 0.05 }}
          />
        ))}
      </div>
    )
  }

  if (type === 'button') {
    return (
      <motion.div
        className="h-12 rounded-lg"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
          backgroundSize: '200% 100%',
        }}
        animate={shimmer.animate}
        transition={shimmer.transition}
      />
    )
  }

  return null
}
