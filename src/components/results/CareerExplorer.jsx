import { useState } from 'react'
import { CAREERS } from '../../data/careers'
import { AREA_BY_ID } from '../../data/areas'
import { ROADMAP } from '../../data/roadmap'

import { linkedInSearch } from '../../lib/careerSearch'

export default function CareerExplorer({ areaId }) {
  const [selectedId, setSelectedId] = useState(CAREERS.find((role) => role.areaId === areaId).id)
  const [keywords, setKeywords] = useState(ROADMAP[areaId].search)
  const [location, setLocation] = useState('México')
  const selected = CAREERS.find((role) => role.id === selectedId)
  const related = ROADMAP[selected.areaId].learning.filter((skill) => selected.skillIds.includes(skill.id))
  return (
    <>
      <section id="puestos" className="py-12 border-t border-ink/10">
        <div className="section-heading"><div><p className="eyebrow">03 / Mira hacia dónde puedes ir</p><h2 className="h2">Así se trabaja en tecnología.</h2></div><p className="section-note">Explora perfiles publicados por empresas tech. Son ejemplos de trayectoria; cada ficha tiene su propia ubicación y requisitos.</p></div>
        <div className="career-layout">
          <div aria-label="Puestos de referencia">{CAREERS.map((role) => <button key={role.id} type="button" className="career-button" aria-pressed={selectedId === role.id} aria-controls="detalle-puesto" onClick={() => setSelectedId(role.id)}><span className="eyebrow block">{role.company}</span><span className="font-semibold block mt-2 text-sm">{role.title}</span><span className="source-note block mt-2">{AREA_BY_ID[role.areaId].name} <span aria-hidden="true">↗</span></span></button>)}</div>
          <article id="detalle-puesto" className="surface panel-pad" aria-label={`${selected.title} en ${selected.company}`}>
            <p className="eyebrow">{selected.company} / Perfil de referencia</p>
            <h3 className="h2 mt-3" aria-live="polite">{selected.title}</h3>
            <div className="flex flex-wrap gap-2 mt-4"><span className="pill">{selected.location}</span><span className="pill">{selected.level}</span></div>
            <p className="mt-5 text-sm muted">{selected.summary}</p>
            <h4 className="h3 mt-6">En el día a día</h4><ul className="detail-list">{selected.responsibilities.map((text) => <li key={text}>{text}</li>)}</ul>
            <div className="requirements"><div><h4 className="h3">Lo que solicitan</h4><ul className="detail-list">{selected.required.map((text) => <li key={text}>{text}</li>)}</ul></div><div><h4 className="h3">Lo que suma</h4><ul className="detail-list">{selected.preferred.map((text) => <li key={text}>{text}</li>)}</ul></div></div>
            <div className="rounded-xl bg-green-soft p-5"><p className="eyebrow">Conecta con tu aprendizaje</p><div className="flex flex-wrap gap-2 mt-3">{related.map((skill) => <span key={skill.id} className="pill bg-paper">{skill.name}</span>)}</div><p className="text-sm mt-4">{selected.project}</p><p className="source-note mt-2">Proyecto sugerido por PotroPath, no solicitado por la empresa.</p></div>
            <div className="flex flex-wrap gap-4 mt-6"><a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="text-link">Consultar ficha original ↗</a><a href={linkedInSearch(selected.title.replace(' · 2026', ''), location || 'México')} target="_blank" rel="noreferrer" className="text-link">Puestos similares en LinkedIn ↗</a></div>
            <p className="source-note mt-3">Revisión: <time dateTime={selected.reviewedAt}>7 oct 2026</time>. Resumen de requisitos; consulta la ficha completa. Su disponibilidad puede cambiar. No representa una asociación con PotroPath.</p>
          </article>
        </div>
      </section>
      <section id="oportunidades" className="dark-panel my-8">
        <p className="eyebrow">04 / Explora el mercado</p><h2 className="h2 mt-3">Tu próxima búsqueda empieza aquí.</h2>
        <p className="mt-4 mb-7 max-w-2xl text-sm text-paper/85">Ajusta el puesto y la ubicación. Abriremos la búsqueda en LinkedIn para que consultes las oportunidades disponibles allí.</p>
        <form className="search-grid" action="https://www.linkedin.com/jobs/search/" method="get" target="_blank" rel="noreferrer">
          <div><label className="field-label" htmlFor="job-keywords">Puesto o palabras clave</label><input className="field" id="job-keywords" name="keywords" required maxLength={120} value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Ej. Data Analyst Junior" /></div>
          <div><label className="field-label" htmlFor="job-location">Ubicación</label><input className="field" id="job-location" name="location" required maxLength={100} value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Ej. México" /></div>
          <button type="submit" className="btn-green btn-light" disabled={!keywords.trim() || !location.trim()}>Buscar en LinkedIn ↗</button>
        </form>
        <p className="mt-4 text-xs text-paper/75">Se abre otra pestaña. LinkedIn puede solicitar iniciar sesión; allí puedes ajustar experiencia y modalidad. Tus respuestas no se envían.</p>
      </section>
    </>
  )
}
