import RouteTransition from '../motion/RouteTransition'
import Footer from './Footer'
import Navbar from './Navbar'

/** El scroll nativo mantiene predecibles anclas, teclado y paneles que cambian de altura. */
export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
        <RouteTransition />
      </main>
      <Footer />
    </div>
  )
}
