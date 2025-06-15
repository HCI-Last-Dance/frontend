import { useEffect, useRef, useState } from 'react'

interface UseTimerReturn {
    spentTime: number
    resetTimer: () => void
}

const useTimer = (): UseTimerReturn => {
    const [spentTime, setSpentTime] = useState(0)
    const timerIdRef = useRef<number | null>(null)

    const resetTimer = () => {
        setSpentTime(0)

        if (timerIdRef.current !== null) {
            clearInterval(timerIdRef.current)
        }

        timerIdRef.current = window.setInterval(() => {
            setSpentTime((prev) => prev + 1)
        }, 1000)
    }

    useEffect(() => {
        resetTimer()

        return () => {
            if (timerIdRef.current !== null) {
                clearInterval(timerIdRef.current)
            }
        }
    }, [])

    return { spentTime, resetTimer }
}

export default useTimer
