import React from 'react'

type Props = {
  size?: number
}

export const UploadIcon = ({ size = 24 }: Props) => {
  return (
    <svg
      baseProfile='tiny'
      height={size}
      width={size}
      xmlSpace='preserve'
      viewBox='0 0 24 24'>
      <path d='M20.987 16a.98.98 0 0 0-.039-.316l-2-6A.998.998 0 0 0 18 9h-4v2h3.279l1.667 5H5.054l1.667-5H10V9H6a.998.998 0 0 0-.948.684l-2 6a.98.98 0 0 0-.039.316C3 16 3 21 3 21a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1s0-5-.013-5z' />
      <path d='M16 7.904c.259 0 .518-.095.707-.283a1 1 0 0 0 0-1.414L12 1.5 7.293 6.207a1 1 0 0 0 0 1.414c.189.189.448.283.707.283s.518-.094.707-.283L11 5.328V12a1 1 0 0 0 2 0V5.328l2.293 2.293a.997.997 0 0 0 .707.283z' />
    </svg>
  )
}
