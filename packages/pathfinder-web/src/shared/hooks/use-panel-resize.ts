import React, { useCallback, useEffect, useState } from 'react'

import { PanelPosition } from '../../app/pathfinder'

const HEIGHT_KEY = 'pathfinder-panel-height'
const WIDTH_KEY = 'pathfinder-panel-width'
const MIN_SIZE = 200

const getInitialSize = (position: PanelPosition): number => {
  const isVertical = position === 'bottom' || position === 'top'
  const key = isVertical ? HEIGHT_KEY : WIDTH_KEY

  if (typeof localStorage === 'undefined') {
    return isVertical
      ? Math.round(window.innerHeight * 0.45)
      : Math.min(360, Math.round(window.innerWidth * 0.8))
  }

  const stored = localStorage.getItem(key)
  if (stored) return Number(stored)

  return isVertical
    ? Math.round(window.innerHeight * 0.45)
    : Math.min(360, Math.round(window.innerWidth * 0.8))
}

export const usePanelResize = (position: PanelPosition) => {
  const [size, setSize] = useState<number>(() => getInitialSize(position))

  useEffect(() => {
    setSize(getInitialSize(position))
  }, [position])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      const startX = e.clientX
      const startY = e.clientY
      const startSize = size
      const isVertical = position === 'bottom' || position === 'top'

      const calcDelta = (ev: PointerEvent): number => {
        switch (position) {
          case 'bottom':
            return startY - ev.clientY
          case 'top':
            return ev.clientY - startY
          case 'left':
            return ev.clientX - startX
          case 'right':
            return startX - ev.clientX
        }
      }

      const clamp = (delta: number): number => {
        const max = isVertical ? window.innerHeight : window.innerWidth
        return Math.min(max - 48, Math.max(MIN_SIZE, startSize + delta))
      }

      const onMove = (ev: PointerEvent) => {
        setSize(clamp(calcDelta(ev)))
      }

      const onUp = (ev: PointerEvent) => {
        const final = clamp(calcDelta(ev))
        localStorage.setItem(isVertical ? HEIGHT_KEY : WIDTH_KEY, String(final))
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    },
    [size, position],
  )

  return { size, onPointerDown }
}
