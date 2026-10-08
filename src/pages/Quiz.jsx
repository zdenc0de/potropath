import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmButton from '../components/ui/ConfirmButton'
import { AREA_BY_ID } from '../data/areas'
import { QUESTIONS, SCALE } from '../data/questions'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useQuizStore } from '../store/quizStore'

export default function Quiz() {
  const navigate = useNavigate()
  const { currentIndex, answers, answerCurrent, goNext, goPrevious, reset } = useQuizStore()
  const question = QUESTIONS[currentIndex]
  const selected = answers[question.id]
  const count = Object.keys(answers).length
  const last = currentIndex === QUESTIONS.length - 1
  const heading = useRef(null)
  const previousIndex = useRef(currentIndex)
  useDocumentTitle(`Pregunta ${currentIndex + 1} de ${QUESTIONS.length} — PotroPath`)
  useEffect(() => {
    if (previousIndex.current !== currentIndex) heading.current?.focus()
    previousIndex.current = currentIndex
  }, [currentIndex])
  return <section className="quiz-shell">
    <div className="flex flex-wrap justify-between items-center gap-3"><p className="eyebrow">Tu diagnóstico</p><span className="pill bg-green-soft">{AREA_BY_ID[question.areaId].name}</span></div>
    <div className="flex justify-between mt-7 mb-3 text-xs muted"><span>Pregunta <strong className="text-ink number">{currentIndex + 1}</strong> de {QUESTIONS.length}</span><span className="number">{count} respondidas</span></div>
    <div role="progressbar" aria-label="Respuestas completadas" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={count} aria-valuetext={`${count} de ${QUESTIONS.length} respuestas`} className="affinity-track"><div className="affinity-fill" style={{ transform: `scaleX(${count / QUESTIONS.length})` }} /></div>
    <div className="surface panel-pad mt-8"><p className="eyebrow mb-4">Piensa en lo que disfrutas, no en lo que ya dominas.</p><h1 ref={heading} tabIndex={-1} id="quiz-prompt" className="h2 focus:outline-none">{question.prompt}</h1><p className="text-sm muted mt-4">¿Qué tanto te identificas con esta afirmación?</p>
      <fieldset className="grid gap-3 mt-7" aria-labelledby="quiz-prompt"><legend className="sr-only">Tu grado de acuerdo</legend>{SCALE.map(({ value, label }) => <label key={value} className="quiz-option text-sm"><input type="radio" name={question.id} value={value} checked={selected === value} onChange={() => answerCurrent(value)} /><span>{label}</span></label>)}</fieldset>
    </div>
    <div className="flex justify-between items-center gap-4 mt-6"><button className="btn-outline disabled:opacity-40" type="button" onClick={goPrevious} disabled={currentIndex === 0}>← Anterior</button><button type="button" className="btn-green disabled:opacity-40" onClick={() => last ? navigate('/resultados') : goNext()} disabled={!selected || (last && count < QUESTIONS.length)}>{last ? 'Descubrir mi ruta ↗' : 'Siguiente →'}</button></div>
    {last && count < QUESTIONS.length && <p className="mt-4 text-sm muted" role="status">Responde las {QUESTIONS.length - count} afirmaciones pendientes antes de ver tu ruta. Puedes volver con Anterior.</p>}
    <p className="text-xs muted mt-8 text-center">Tu avance se guarda en este navegador. Puedes cerrar y continuar después.</p>
    {count > 0 && <div className="text-center mt-3"><ConfirmButton label="Empezar de nuevo" confirmLabel={`¿Borrar tus ${count} respuestas?`} onConfirm={reset} className="text-link muted" armedClassName="text-link text-green" /></div>}
  </section>
}
