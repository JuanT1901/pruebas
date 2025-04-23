'use client';

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import styles from 'app/styles/components/Carousel.module.scss'
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

const images = [
  "/images/Carrusel_01.jpg",
  "/images/Carrusel_02.png",
  "/images/Carrusel_03.png",
  "/images/Carrusel_04.png",
  "/images/Carrusel_05.png",
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      autoplay()
    },
  })

  // Autoplay
  const autoplay = () => {
    clearTimeout(timeout.current!)
    timeout.current = setTimeout(() => {
      instanceRef.current?.next()
    }, 3000)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const slider = instanceRef.current
    if (!slider) return

    slider.on("slideChanged", autoplay)
    return () => {
      slider.destroy()
    }
  }, [instanceRef])

  return (
    <div className={styles.carouselWrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.carousel}`}>
        {images.map((src, index) => (
          <div key={index} className={`keen-slider__slide ${styles.slide}`}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={800}
              height={400}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <button onClick={() => instanceRef.current?.prev()} className={styles.arrowLeft}>&lt;</button>
      <button onClick={() => instanceRef.current?.next()} className={styles.arrowRight}>&gt;</button>

      <div className={styles.dots}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`${styles.dot} ${currentSlide === idx ? styles.active : ""}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

