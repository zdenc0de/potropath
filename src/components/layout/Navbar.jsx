import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { QUESTIONS } from '../../data/questions'
import { useQuizStore } from '../../store/quizStore'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/quiz', label: 'Diagnóstico' },
  { to: '/resultados', label: 'Mi ruta' },
  { to: '/comunidad', label: 'Comunidad' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === pathname
  const count = useQuizStore((state) => Object.keys(state.answers).length)
  const completed = count === QUESTIONS.length
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpenPath(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="site-header">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <div className="brand-ribbon" aria-hidden="true" />
      <div className="page-shell nav-row">
        <Link to="/" className="brand" aria-label="PotroPath · Inicio">
          <span className="brand-symbol" aria-hidden="true">p<span>↗</span></span>
          <span>Potro<span className="text-green-mid">Path</span><small>INGENIERÍA · UAEMÉX</small></span>
        </Link>
        <nav aria-label="Principal" className="desktop-nav">
          {links.map((link) => <NavLink key={link.to} {...link} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>{link.label}</NavLink>)}
        </nav>
        <Link className="btn-green nav-cta" to={completed ? '/resultados' : '/quiz'}>{completed ? 'Explorar mi ruta' : count ? 'Continuar' : 'Descubrir mi ruta'} <span aria-hidden="true">↗</span></Link>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="menu-movil" onClick={() => setOpenPath(open ? null : pathname)}>{open ? 'Cerrar ×' : 'Menú ☰'}</button>
      </div>
      {open && <nav id="menu-movil" aria-label="Navegación móvil" className="mobile-nav page-shell">{links.map((link) => <NavLink key={link.to} {...link} onClick={() => setOpenPath(null)} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>{link.label}</NavLink>)}</nav>}
    </header>
  )
}
