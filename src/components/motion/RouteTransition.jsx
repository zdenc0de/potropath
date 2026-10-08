import { useLayoutEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

/** El contenido cambia inmediatamente; anclas y foco se resuelven sobre la vista ya montada. */
export default function RouteTransition() {
  const { pathname, hash } = useLocation()
  const outlet = useOutlet()
  const container = useRef(null)
  const previousPath = useRef(pathname)

  useLayoutEffect(() => {
    const anchor = hash ? document.getElementById(hash.slice(1)) : null
    if (anchor) anchor.scrollIntoView({ block: 'start' })
    else window.scrollTo(0, 0)

    if (previousPath.current !== pathname) {
      const heading = (anchor ?? container.current)?.querySelector('h1, h2')
      if (heading) {
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }
    }
    previousPath.current = pathname
  }, [pathname, hash])

  return <div ref={container} className="flex flex-1 flex-col">{outlet}</div>
}
