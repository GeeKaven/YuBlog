import { useTransition, animated, config } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  throttleTime,
} from 'rxjs'
const BackToTop = () => {
  const [visable, setVisable] = useState(false)

  const transitions = useTransition(visable, {
    from: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 100 },
    config: config.stiff,
  })

  useEffect(() => {
    const scrollEvent = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(0, animationFrameScheduler),
        startWith(null),
        map(() => window.scrollY > 450),
        distinctUntilChanged()
      )
      .subscribe((b) => setVisable(b))

    return () => scrollEvent.unsubscribe()
  }, [])

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          onClick={backToTop}
          className='fixed right-8 bottom-8 rounded-full sm:right-14 
              sm:bottom-14 p-3 bg-primary-500/80 hover:bg-primary-500 text-gray-100 cursor-pointer z-10'
          style={style}
        >
          <FaArrowUp size='20px' />
        </animated.div>
      )
  )
}

export default BackToTop
