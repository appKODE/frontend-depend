import { useState } from 'react'

type TArg = {
  onSuccess?: () => void
  onError?: () => void
}

export const useClipboard = ({ onSuccess, onError }: TArg) => {
  const [isWriteSuccess, setIsWriteSuccess] = useState(false)

  const write = (str: string) =>
    navigator.clipboard
      .writeText(str)
      .then(() => {
        if (onSuccess) {
          onSuccess()
        }
        setIsWriteSuccess(true)
      })
      .catch(() => (onError ? onError() : undefined))

  return { write, isWriteSuccess }
}
