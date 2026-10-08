import { useState } from 'react'
import { CREDENTIALS } from '../../data/credentials'

export default function CredentialExplorer({ ids }) {
  const [selected, setSelected] = useState([])
  const credentials = ids.map((id) => CREDENTIALS[id])
  const comparison = credentials.filter((item) => selected.includes(item.id))
  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-2))
  const dimensions = [['Tipo', 'type'], ['Nivel', 'level'], ['Preparación', 'prerequisites'], ['Evaluación', 'assessment'], ['Enfoque', 'skills']]
  return (
    <section id="credenciales" className="py-12 border-t border-ink/10">
      <div className="section-heading"><div><p className="eyebrow">02 / Dale respaldo a lo que aprendes</p><h2 className="h2">Una credencial con sentido.</h2></div><p className="section-note">Compara el enfoque y la preparación antes de elegir. Un curso y una certificación por examen acreditan cosas distintas.</p></div>
      <div className="credential-grid">
        {credentials.map((item) => <article key={item.id} className={`surface credential-card ${selected.includes(item.id) ? 'selected' : ''}`}>
          <div className="flex items-center gap-3"><span className="provider-mark" aria-hidden="true">{item.mark}</span><div><p className="text-sm font-semibold">{item.provider}</p><p className="source-note">{item.type}</p></div><span className="pill ml-auto">{item.level}</span></div>
          <h3 className="h3">{item.name}</h3>
          <p className="text-sm muted">{item.purpose}</p>
          <dl className="credential-meta"><dt>Preparación</dt><dd>{item.prerequisites}</dd><dt>Enfoque</dt><dd>{item.skills}</dd></dl>
          <div className="credential-actions"><label className="check-label"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Comparar ${item.name}`} /> Comparar</label><a className="text-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Ver programa <span aria-label="abre otra pestaña">↗</span></a></div>
          <p className="source-note">Fuente del programa · Revisada el <time dateTime={item.reviewedAt}>7 oct 2026</time></p>
        </article>)}
      </div>
      <p className="text-sm muted mt-4" role="status">{comparison.length === 0 ? 'Marca dos opciones para verlas lado a lado.' : comparison.length === 1 ? 'Una opción seleccionada. Marca otra para comparar.' : 'Comparación de las dos opciones seleccionadas.'}</p>
      {comparison.length === 2 && <div className="comparison" role="region" aria-label="Comparación de credenciales">
        <div className="flex items-center justify-between gap-4 mb-5"><h3 className="h3">Elige por lo que necesitas aprender.</h3><button type="button" className="text-link" onClick={() => setSelected([])}>Limpiar</button></div>
        <div className="comparison-row"><span className="font-semibold">Programa</span>{comparison.map((item) => <strong key={item.id}>{item.name}</strong>)}</div>
        {dimensions.map(([label, key]) => <div className="comparison-row" key={key}><span className="font-semibold">{label}</span>{comparison.map((item) => <p key={item.id}>{item[key]}</p>)}</div>)}
      </div>}
      <p className="source-note mt-5">Consulta precio, idioma y condiciones en el sitio del proveedor. Obtener una credencial no garantiza una contratación.</p>
    </section>
  )
}
