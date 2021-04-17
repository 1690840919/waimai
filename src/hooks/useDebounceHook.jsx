import { useState } from 'react'

function useDebounceHook(fn, time = 2000) {
  const [timer, setTimer] = useState(null)
  return fn
}

export default useDebounceHook
