import React, { useState, useEffect } from 'react'
import styles from './TaskTimer.module.css'
import { getTimeLeftInMs } from '../../utils/dateUtils'

const TaskTimer = ({ deadline, isExpired }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeftInMs(deadline))

  useEffect(() => {
    if (isExpired) {
      setTimeLeft(0)
      return
    }
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeftInMs(deadline)
      setTimeLeft(newTimeLeft)
      if (newTimeLeft <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [deadline, isExpired])

  const formatTime = (ms) => {
    if (ms <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)
    const hours = Math.floor(ms / (1000 * 60 * 60))
    return { hours, minutes, seconds }
  }

  const { hours, minutes, seconds } = formatTime(timeLeft)

  return (
    <div className={`${styles.timer} ${timeLeft <= 0 ? styles.expired : ''}`}>
      {timeLeft <= 0 ? (
        <span>Время истекло!</span>
      ) : (
        <span>
          Осталось: {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </span>
      )}
    </div>
  )
}

export default TaskTimer
