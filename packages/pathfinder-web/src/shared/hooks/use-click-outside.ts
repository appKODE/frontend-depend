import { MutableRefObject, useEffect } from 'react'

type Input = {
  ref: MutableRefObject<HTMLDivElement | null>
  flag: boolean
  handler: () => void
}

export const useClickOutside = ({ ref, flag, handler }: Input) => {
  const removeListeners = (listener: EventListener) => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
  }
  const startListeners = (listener: EventListener) => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
  }

  useEffect(() => {
    const listener: EventListener = event => {
      if (!ref.current || ref.current.contains(event.target as Node) || !flag) {
        // https://stackoverflow.com/questions/43842057/detect-if-click-was-inside-react-component-or-not-in-typescript
        return
      }

      setTimeout(() => {
        handler()
        removeListeners(listener)
      }, 100)
    }

    if (!flag) {
      removeListeners(listener)
    } else {
      startListeners(listener)
    }

    return () => {
      removeListeners(listener)
    }
  }, [ref, handler, flag])
}
