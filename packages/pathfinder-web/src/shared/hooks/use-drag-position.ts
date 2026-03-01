import { useCallback, useRef, useState } from 'react'
import React from 'react'

const BUTTON_POSITION_KEY = 'pathfinder-button-position'
const DRAG_THRESHOLD = 5
const BUTTON_SIZE = 40

type Position = { x: number; y: number }

const getInitialPosition = (): Position => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(BUTTON_POSITION_KEY)
    if (stored) {
      try {
        const pos = JSON.parse(stored) as Position
        // Ensure button is visible
        return ensureInBounds(pos)
      } catch {
        // ignore
      }
    }
  }
  return {
    x: window.innerWidth - BUTTON_SIZE - 9,
    y: window.innerHeight - BUTTON_SIZE - 9,
  }
}

const ensureInBounds = (pos: Position): Position => {
  const root = document.documentElement
  const safeTop = parseInt(
    getComputedStyle(root).getPropertyValue('--safe-area-inset-top') || '0',
  )
  const safeBottom = parseInt(
    getComputedStyle(root).getPropertyValue('--safe-area-inset-bottom') || '0',
  )
  const safeLeft = parseInt(
    getComputedStyle(root).getPropertyValue('--safe-area-inset-left') || '0',
  )
  const safeRight = parseInt(
    getComputedStyle(root).getPropertyValue('--safe-area-inset-right') || '0',
  )

  const minX = safeLeft
  const maxX = window.innerWidth - BUTTON_SIZE - safeRight
  const minY = safeTop
  const maxY = window.innerHeight - BUTTON_SIZE - safeBottom

  return {
    x: Math.max(minX, Math.min(maxX, pos.x)),
    y: Math.max(minY, Math.min(maxY, pos.y)),
  }
}

export const useDragPosition = () => {
  const [pos, setPos] = useState<Position>(() => getInitialPosition())
  const didDrag = useRef(false)

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      didDrag.current = false
      const offsetX = e.clientX - pos.x
      const offsetY = e.clientY - pos.y
      const startPointerX = e.clientX
      const startPointerY = e.clientY

      const clamp = (x: number, y: number): Position => {
        const root = document.documentElement
        const safeTop = parseInt(
          getComputedStyle(root).getPropertyValue('--safe-area-inset-top') ||
            '0',
        )
        const safeBottom = parseInt(
          getComputedStyle(root).getPropertyValue('--safe-area-inset-bottom') ||
            '0',
        )
        const safeLeft = parseInt(
          getComputedStyle(root).getPropertyValue('--safe-area-inset-left') ||
            '0',
        )
        const safeRight = parseInt(
          getComputedStyle(root).getPropertyValue('--safe-area-inset-right') ||
            '0',
        )

        return {
          x: Math.max(
            safeLeft,
            Math.min(window.innerWidth - BUTTON_SIZE - safeRight, x),
          ),
          y: Math.max(
            safeTop,
            Math.min(window.innerHeight - BUTTON_SIZE - safeBottom, y),
          ),
        }
      }

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startPointerX
        const dy = ev.clientY - startPointerY
        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
          didDrag.current = true
        }
        setPos(clamp(ev.clientX - offsetX, ev.clientY - offsetY))
      }

      const onUp = (ev: PointerEvent) => {
        if (didDrag.current) {
          const finalPos = clamp(ev.clientX - offsetX, ev.clientY - offsetY)
          setPos(finalPos)
          localStorage.setItem(BUTTON_POSITION_KEY, JSON.stringify(finalPos))
        }
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    },
    [pos],
  )

  return { pos, didDrag, onPointerDown }
}
