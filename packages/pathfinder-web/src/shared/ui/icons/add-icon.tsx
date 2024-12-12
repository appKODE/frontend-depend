import React from 'react'

type Props = {
  size?: number
  color?: string
}

export const AddIcon = ({ size = 16, color = '#333' }: Props) => {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        d='M12 5V19'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5 12H19'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
