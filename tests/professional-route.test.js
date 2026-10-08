import test from 'node:test'
import assert from 'node:assert/strict'
import { AREAS } from '../src/data/areas.js'
import { ROADMAP } from '../src/data/roadmap.js'
import { CREDENTIALS } from '../src/data/credentials.js'
import { CAREERS } from '../src/data/careers.js'
import { linkedInSearch } from '../src/lib/careerSearch.js'

test('cada especialidad ofrece una ruta completa y dos credenciales comparables', () => {
  for (const area of AREAS) {
    const route = ROADMAP[area.id]
    assert.ok(route?.search, `Falta búsqueda para ${area.id}`)
    assert.deepEqual([...new Set(route.learning.map((skill) => skill.stage))].sort(), [0, 1, 2])
    assert.equal(new Set(route.learning.map((skill) => skill.id)).size, route.learning.length)
    assert.ok(route.learning.every((skill) => skill.purpose && skill.project))
    assert.ok(route.credentialIds.length >= 2)
    for (const id of route.credentialIds) {
      const credential = CREDENTIALS[id]
      assert.ok(credential?.type && credential.level && credential.prerequisites && credential.assessment, id)
      assert.equal(new URL(credential.sourceUrl).protocol, 'https:')
      assert.match(credential.reviewedAt, /^\d{4}-\d{2}-\d{2}$/)
    }
    assert.ok(CAREERS.some((role) => role.areaId === area.id), `Falta perfil para ${area.id}`)
  }
})

test('los perfiles enlazan habilidades existentes y una fuente de la empresa', () => {
  const domains = new Set(['www.amazon.jobs', 'nvidia.wd5.myworkdayjobs.com'])
  assert.equal(new Set(CAREERS.map((role) => role.id)).size, CAREERS.length)
  for (const role of CAREERS) {
    assert.ok(role.location && role.level && role.reviewedAt)
    assert.ok(domains.has(new URL(role.sourceUrl).hostname))
    assert.ok(role.required.length && role.responsibilities.length)
    for (const id of role.skillIds) assert.ok(ROADMAP[role.areaId].learning.some((skill) => skill.id === id), `${role.id}: ${id}`)
  }
})

test('LinkedIn conserva acentos y caracteres especiales sin inyectar parámetros', () => {
  const result = new URL(linkedInSearch('  C++ & IA #junior  ', ' Ciudad de México '))
  assert.equal(result.origin, 'https://www.linkedin.com')
  assert.equal(result.pathname, '/jobs/search/')
  assert.equal(result.searchParams.get('keywords'), 'C++ & IA #junior')
  assert.equal(result.searchParams.get('location'), 'Ciudad de México')
  assert.deepEqual([...result.searchParams.keys()], ['keywords', 'location'])
})
