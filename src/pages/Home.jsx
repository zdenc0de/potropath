import { Link } from 'react-router-dom'
import { AREAS } from '../data/areas'
import { QUESTIONS } from '../data/questions'
import { useQuizStore } from '../store/quizStore'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Home() {
  useDocumentTitle('PotroPath — Tu siguiente paso en Computación')
  const count = useQuizStore((state) => Object.keys(state.answers).length)
  const completed = count === QUESTIONS.length
  const to = completed ? '/resultados' : '/quiz'
  const label = completed ? 'Explorar mi ruta' : count ? 'Continuar mi diagnóstico' : 'Descubrir mi ruta'
  return <>
    <section className="page-shell editorial-hero">
      <div><p className="eyebrow">Facultad de Ingeniería · UAEMéx</p><h1 className="h1">Ya elegiste Computación.<br /><span className="text-green-mid">Ahora encuentra tu camino.</span></h1><p className="lead max-w-lg">Descubre qué te mueve, qué puedes aprender y dónde puedes llevarlo. Tu siguiente paso empieza con tus intereses.</p><div className="flex flex-wrap gap-4 mt-8"><Link className="btn-green" to={to}>{label} ↗</Link><a href="#como-funciona" className="text-link">Cómo funciona ↓</a></div><p className="hero-footnote">{count && !completed ? `${count} de 50 respuestas guardadas. Continúa a tu ritmo.` : '50 afirmaciones · 5 especialidades · Sin registro'}</p></div>
      <div className="relative pb-8"><div className="hero-picture"><img src="/images/estudiante-ico.png" alt="Estudiante de Ingeniería en Computación trabajando en su laptop" fetchPriority="high" /><div className="photo-caption">La curiosidad es un buen punto de partida.</div></div><div className="absolute -bottom-2 left-5 right-5 rounded-2xl bg-green-soft border border-paper p-5 flex items-center gap-5"><span className="text-3xl text-green-mid" aria-hidden="true">↗</span><div><p className="text-sm font-semibold">De lo que te interesa a lo que puedes crear.</p><p className="text-xs muted mt-1">Habilidades + credenciales + comunidad</p></div></div></div>
    </section>
    <section id="como-funciona" className="bg-paper-alt section-py"><div className="page-shell"><div className="section-heading"><div><p className="eyebrow">Un poco de claridad para tu siguiente paso</p><h2 className="h2">No tienes que resolverlo todo hoy.</h2></div><p className="section-note">Empieza por conocerte. El resto lo puedes explorar a tu ritmo.</p></div><div className="step-grid">{[
      ['01', 'Descubre lo que te interesa', 'Responde afirmaciones sobre lo que disfrutas. No hay respuestas correctas ni incorrectas.'],
      ['02', 'Dale forma a tu ruta', 'Explora habilidades, compara credenciales y entiende qué se hace en puestos de empresas tech.'],
      ['03', 'Encuentra con quién avanzar', 'Conoce los espacios y las actividades de la comunidad de tu facultad.'],
    ].map(([n, title, text]) => <article key={n} className="step-card"><span className="section-index">{n} /</span><h3 className="h3">{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="page-shell section-py"><div className="section-heading"><div><p className="eyebrow">Cinco formas de construir el futuro</p><h2 className="h2">¿Qué despierta tu curiosidad?</h2></div><p className="section-note">No son caminos cerrados. Las especialidades se conectan y tus intereses pueden cambiar.</p></div><div className="area-grid">{AREAS.map((area, i) => <article className="surface area-card" key={area.id}><img src={area.image} alt="" loading="lazy" /><div className="area-card-content"><p className="eyebrow mb-3">Especialidad / 0{i + 1}</p><h3 className="h3">{area.name}</h3><p>{area.description}</p><Link to={`/comunidad?area=${area.id}#especialidades`} className="text-link">Explorar su comunidad ↗</Link></div></article>)}</div></section>
    <section className="page-shell pb-16"><div className="dark-panel grid gap-8 md:grid-cols-2 md:items-center"><div><p className="eyebrow">Tu ruta es tuya. El camino se comparte.</p><h2 className="h2 mt-4">Aprender también sucede fuera del salón.</h2><p className="mt-5 text-sm text-paper/85">Conoce las experiencias de estudiantes de la facultad y los espacios donde puedes seguir explorando.</p><Link to="/comunidad" className="btn-green btn-light mt-6">Conocer la comunidad ↗</Link></div><figure><img className="w-full rounded-2xl aspect-4/3 object-cover" src="/images/comunidad/galeria-talent-land.webp" alt="Estudiantes de la facultad en Talent Land México 2026" loading="lazy" /><figcaption className="text-xs text-paper/80 mt-3">Talent Land México 2026 · Estudiantes de la facultad</figcaption></figure></div></section>
  </>
}
