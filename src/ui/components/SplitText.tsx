'use client'

import React from 'react'

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
}

export default function SplitText({ text, className = '', charClassName = '' }: SplitTextProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`inline-block char ${charClassName}`}
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
