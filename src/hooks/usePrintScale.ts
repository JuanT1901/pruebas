'use client'

import { useEffect, useRef, useState } from 'react'

const PRINT_NATURAL_WIDTH = 820

export function usePrintScale(deps: unknown[] = []) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [hostHeight, setHostHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const recompute = () => {
      if (typeof window === 'undefined' || !contentRef.current) return
      const vw = window.innerWidth
      let newScale = 1
      if (vw < PRINT_NATURAL_WIDTH + 32) {
        newScale = Math.max(0.3, (vw - 12) / PRINT_NATURAL_WIDTH)
      }
      setScale(newScale)
      setHostHeight(newScale < 1 ? contentRef.current.offsetHeight * newScale : undefined)
    }

    recompute()
    const handle = window.setTimeout(recompute, 150)
    window.addEventListener('resize', recompute)

    let ro: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      ro = new ResizeObserver(recompute)
      ro.observe(contentRef.current)
    }

    return () => {
      window.clearTimeout(handle)
      window.removeEventListener('resize', recompute)
      ro?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { contentRef, scale, hostHeight }
}
