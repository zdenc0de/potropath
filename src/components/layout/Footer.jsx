import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Potro<span className="text-gold-light">Path</span></p>
          <p className="mt-3 max-w-sm text-sm text-paper/85">Tu siguiente paso en Computación empieza con una buena pregunta.</p>
          <p className="mt-5 text-xs text-paper/75">Facultad de Ingeniería · UAEMéx</p>
        </div>
        <nav aria-label="Explorar PotroPath"><p className="eyebrow text-gold-light mb-3">Tu recorrido</p><Link to="/quiz">Diagnóstico ↗</Link><Link to="/resultados">Mi ruta ↗</Link><Link to="/comunidad">Comunidad ↗</Link></nav>
        <div><p className="eyebrow text-gold-light mb-4">Hecho para estudiantes</p><p className="text-sm text-paper/85">Sin registro. Tus respuestas se guardan únicamente en este navegador.</p></div>
      </div>
      <div className="page-shell footer-bottom">Proyecto estudiantil sin fines de lucro. Las empresas y credenciales citadas son referencias, no entidades asociadas a PotroPath.</div>
      <div className="brand-ribbon" aria-hidden="true" />
    </footer>
  )
}
