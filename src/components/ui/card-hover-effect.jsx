import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Wraps existing card markup (passed as `children` per item) with an animated
// glow that follows the hovered card and slides between cards via layoutId,
// without changing how each card itself looks.
export function HoverEffect({ items, className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={className}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.title ?? idx}
          className="news-link"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="news-glow"
                layoutId="newsGlow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <article className="news-item">{item.children}</article>
        </a>
      ))}
    </div>
  )
}
