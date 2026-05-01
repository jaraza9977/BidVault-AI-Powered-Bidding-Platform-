import { useState, useEffect } from 'react'

export const useCountdown = (targetTimestamp) => {
  const calculateSecondsLeft = () => {
    const difference = targetTimestamp - Date.now()
    return difference > 0 ? Math.floor(difference / 1000) : 0
  }

  const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(calculateSecondsLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTimestamp])

  return secondsLeft
}
