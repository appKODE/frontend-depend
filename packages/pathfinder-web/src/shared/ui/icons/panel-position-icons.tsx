import React from 'react'

type Props = {
  size?: number
  fill?: string
}

export const PanelBottomIcon = ({
  size = 16,
  fill = 'currentColor',
}: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'>
    <rect
      x='1'
      y='1'
      width='14'
      height='14'
      rx='2'
      stroke={fill}
      strokeWidth='1.5'
    />
    <rect x='1' y='9' width='14' height='6' rx='1' fill={fill} />
  </svg>
)

export const PanelTopIcon = ({ size = 16, fill = 'currentColor' }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'>
    <rect
      x='1'
      y='1'
      width='14'
      height='14'
      rx='2'
      stroke={fill}
      strokeWidth='1.5'
    />
    <rect x='1' y='1' width='14' height='6' rx='1' fill={fill} />
  </svg>
)

export const PanelLeftIcon = ({ size = 16, fill = 'currentColor' }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'>
    <rect
      x='1'
      y='1'
      width='14'
      height='14'
      rx='2'
      stroke={fill}
      strokeWidth='1.5'
    />
    <rect x='1' y='1' width='6' height='14' rx='1' fill={fill} />
  </svg>
)

export const PanelRightIcon = ({ size = 16, fill = 'currentColor' }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'>
    <rect
      x='1'
      y='1'
      width='14'
      height='14'
      rx='2'
      stroke={fill}
      strokeWidth='1.5'
    />
    <rect x='9' y='1' width='6' height='14' rx='1' fill={fill} />
  </svg>
)
