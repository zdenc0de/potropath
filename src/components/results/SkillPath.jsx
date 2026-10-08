import { useState } from 'react'
import { STAGES } from '../../data/roadmap'

export default function SkillPath({ route }) {
  const [selectedId, setSelectedId] = useState(route.learning[0].id)
  const selected = route.learning.find((item) => item.id === selectedId) ?? route.learning[0]
  return (
    <section id="habilidades" className="py-12 border-t border-ink/10">
      <div className="section-heading">
        <div><p className="eyebrow">01 / Construye tu base</p><h2 className="h2">Las habilidades, en orden.</h2></div>
        <p className="section-note">Selecciona una habilidad para entender para qué sirve y cómo empezar a practicarla.</p>
      </div>
      <div className="skill-layout">
        <div aria-label="Etapas de aprendizaje">
          {STAGES.map((stage, index) => <div className="skill-stage" key={stage}>
            <p className="eyebrow">0{index + 1} · {stage}</p>
            <div className="choice-group">{route.learning.filter((item) => item.stage === index).map((item) => <button key={item.id} type="button" className="choice" aria-pressed={item.id === selected.id} aria-controls="detalle-habilidad" onClick={() => setSelectedId(item.id)}>{item.name} <span aria-hidden="true">↗</span></button>)}</div>
          </div>)}
        </div>
        <div id="detalle-habilidad" className="skill-detail" aria-live="polite" aria-atomic="true">
          <span className="pill">{STAGES[selected.stage]}</span>
          <h3 className="h2 mt-5">{selected.name}</h3>
          <p className="mt-4 text-sm muted">{selected.purpose}</p>
          <div className="project-box"><p className="eyebrow">Tu primer entregable</p><p className="mt-3 text-sm">{selected.project}</p><p className="source-note mt-4">Actividad sugerida por PotroPath. No es un requisito de contratación.</p></div>
        </div>
      </div>
      <p className="source-note mt-5">Secuencia orientativa. Tu afinidad expresa intereses, no mide cuánto dominas estas habilidades.</p>
    </section>
  )
}
