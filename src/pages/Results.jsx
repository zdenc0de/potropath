import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmButton from '../components/ui/ConfirmButton'
import SkillPath from '../components/results/SkillPath'
import CredentialExplorer from '../components/results/CredentialExplorer'
import CareerExplorer from '../components/results/CareerExplorer'
import { AREAS, AREA_BY_ID } from '../data/areas'
import { QUESTIONS } from '../data/questions'
import { ROADMAP } from '../data/roadmap'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { MIN_PERCENTAGE, NEUTRAL_PERCENTAGE, useQuizStore } from '../store/quizStore'

function EmptyState({ count }) {
  useDocumentTitle('Tu ruta empieza aquí — PotroPath')
  return <section className="page-shell section-py"><div className="dark-panel max-w-2xl mx-auto"><p className="eyebrow">Primero, conócete un poco más</p><h1 className="h1 mt-5">Tu ruta está por descubrirse.</h1><p className="mt-6 text-paper/85">{count ? `Llevas ${count} de ${QUESTIONS.length} respuestas. Continúa donde te quedaste para explorar tu perfil completo.` : 'Responde 50 afirmaciones sobre tus intereses. Después podrás explorar habilidades, credenciales y trabajos relacionados contigo.'}</p><Link to="/quiz" className="btn-green btn-light mt-8">{count ? 'Continuar diagnóstico' : 'Descubrir mi ruta'} ↗</Link></div></section>
}

function ResultsView({ results, answers, onRetake }) {
  const top = results[0]
  const tied = results.filter((item) => item.percentage === top.percentage)
  const allNeutral = Object.values(answers).every((value) => value === 3)
  const [selectedId, setSelectedId] = useState(top.areaId)
  const selected = AREA_BY_ID[selectedId]
  const route = ROADMAP[selectedId]
  const isTie = tied.length > 1
  const headline = allNeutral ? 'Tu camino aún está abierto.' : isTie ? 'Hay más de un camino para ti.' : AREA_BY_ID[top.areaId].name
  useDocumentTitle(isTie ? 'Tu perfil de afinidad — PotroPath' : `Tu ruta: ${AREA_BY_ID[top.areaId].name} — PotroPath`)

  return <div className="page-shell pb-16">
    <div className="route-header flex flex-wrap justify-between items-center gap-4"><p className="eyebrow">Tu diagnóstico / Completado</p><span className="pill bg-green-soft">50 de 50 respuestas · Guardadas en este navegador</span></div>
    <div className="result-grid">
      <section className="dark-panel flex flex-col justify-between">
        <div><p className="eyebrow">{isTie ? 'Tu punto de partida' : 'Tu mayor afinidad'}</p><h1 className="h1 mt-5">{headline}</h1><p className="mt-5 text-sm text-paper/85">{allNeutral ? 'Respondiste Neutral en todas las afirmaciones. No aparece una preferencia definida: explora las cinco rutas antes de elegir un primer proyecto.' : isTie ? `Comparten el primer lugar: ${tied.map((item) => AREA_BY_ID[item.areaId].name).join(', ')}. Puedes explorar cualquiera de estas rutas.` : AREA_BY_ID[top.areaId].description}</p></div>
        <div className="flex items-end justify-between gap-6 mt-8 pt-6 border-t border-paper/20"><div><span className="result-number number">{top.percentage}<span className="text-2xl ml-1">%</span></span><p className="text-xs text-paper/80 mt-3">{isTie ? 'Afinidad compartida más alta' : 'Afinidad con tus intereses'}</p></div><a href="#ruta" className="btn-green btn-light">Explorar rutas ↓</a></div>
      </section>
      <section className="surface panel-pad" aria-label="Comparación de afinidad"><p className="eyebrow">El panorama completo</p><h2 className="h3 mt-2">Cinco áreas. Tu propia combinación.</h2>
        {results.map(({ areaId, percentage }, index) => <div key={areaId} className="affinity-row"><div className="flex items-center justify-between gap-4 text-sm"><span><span className="source-note mr-3">0{index + 1}</span>{AREA_BY_ID[areaId].name}</span><strong className="number">{percentage}%</strong></div><div className="affinity-track" aria-hidden="true"><div className="affinity-fill" style={{ transform: `scaleX(${percentage / 100})` }} /></div></div>)}
        <p className="text-xs muted mt-6">Afinidad con lo que te interesa, no una calificación de tus capacidades.</p>
        <details className="mt-2 text-xs muted"><summary className="py-3 underline underline-offset-4">Cómo se calcula</summary><p className="pb-2">Cada área suma diez respuestas de 1 a 5 sobre un máximo de 50 puntos. La escala efectiva va de {MIN_PERCENTAGE}% a 100%; {NEUTRAL_PERCENTAGE}% es el punto neutral. Los porcentajes no suman 100 ni representan probabilidad de empleo.</p></details>
      </section>
    </div>
    <nav aria-label="Secciones de tu ruta" className="anchor-nav"><a href="#habilidades">01 Habilidades</a><a href="#credenciales">02 Credenciales</a><a href="#puestos">03 Puestos tech</a><a href="#oportunidades">04 Oportunidades ↗</a></nav>
    <section id="ruta" aria-labelledby="ruta-title">
      <div className="section-heading"><div><p className="eyebrow">Tú decides qué explorar</p><h2 id="ruta-title" className="h2">Un resultado. Muchas posibilidades.</h2></div><p className="section-note">Cambiar de ruta no modifica tus respuestas ni tus porcentajes.</p></div>
      <div className="choice-group" aria-label="Especialidad a explorar">{AREAS.map((area) => <button key={area.id} type="button" className="choice" aria-pressed={selectedId === area.id} onClick={() => setSelectedId(area.id)}>{area.name} <span className="ml-2 opacity-80 number">{results.find((result) => result.areaId === area.id).percentage}%</span></button>)}</div>
      <div className="route-intro"><div aria-live="polite"><p className="eyebrow mb-3">Explorando / {selected.name}</p><h3 className="h2">{route.headline}</h3><p className="mt-4 text-sm muted max-w-2xl">{route.intro}</p></div><img src={selected.image} alt="" loading="lazy" /></div>
    </section>
    <SkillPath key={`skills-${selectedId}`} route={route} />
    <CredentialExplorer key={`credentials-${selectedId}`} ids={route.credentialIds} />
    <CareerExplorer key={`careers-${selectedId}`} areaId={selectedId} />
    <div className="surface panel-pad flex flex-wrap items-center justify-between gap-6 mt-10"><div><p className="eyebrow">El siguiente paso también se da en equipo</p><h2 className="h3 mt-2">Encuentra personas con tus mismos intereses.</h2></div><Link to={`/comunidad?area=${selectedId}#especialidades`} className="btn-green">Explorar comunidad ↗</Link></div>
    <div className="mt-8 flex justify-between flex-wrap items-center gap-4"><p className="source-note">Tus intereses pueden cambiar. Esta ruta es un punto de partida.</p><ConfirmButton label="Repetir diagnóstico" confirmLabel="¿Borrar las 50 respuestas y repetir?" onConfirm={onRetake} /></div>
  </div>
}

export default function Results() {
  const navigate = useNavigate()
  const answers = useQuizStore((state) => state.answers)
  const computeResults = useQuizStore((state) => state.computeResults)
  const reset = useQuizStore((state) => state.reset)
  if (Object.keys(answers).length < QUESTIONS.length) return <EmptyState count={Object.keys(answers).length} />
  return <ResultsView answers={answers} results={computeResults()} onRetake={() => { reset(); navigate('/quiz') }} />
}
