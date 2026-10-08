import test from 'node:test'
import assert from 'node:assert/strict'
import { QUESTIONS } from '../src/data/questions.js'
import { AREAS } from '../src/data/areas.js'
import { computeAffinity, MIN_PERCENTAGE, NEUTRAL_PERCENTAGE } from '../src/lib/affinity.js'
const answersWith = (value) => Object.fromEntries(QUESTIONS.map((question) => [question.id, typeof value === 'function' ? value(question) : value]))

test('las cinco áreas conservan diez preguntas y la misma ponderación', () => {
  assert.equal(QUESTIONS.length, 50)
  assert.equal(new Set(QUESTIONS.map((question) => question.id)).size, 50)
  for (const area of AREAS) assert.equal(QUESTIONS.filter((question) => question.areaId === area.id).length, 10)
})

test('neutral produce un empate total al 60%, no un ganador', () => {
  const results = computeAffinity(answersWith(3))
  assert.equal(NEUTRAL_PERCENTAGE, 60)
  assert.ok(results.every((result) => result.score === 30 && result.percentage === 60))
  assert.equal(results.filter((result) => result.percentage === results[0].percentage).length, 5)
})

test('se preservan extremos y una preferencia única sin normalizar sobre las otras áreas', () => {
  assert.equal(MIN_PERCENTAGE, 20)
  assert.ok(computeAffinity(answersWith(1)).every((result) => result.percentage === 20))
  assert.ok(computeAffinity(answersWith(5)).every((result) => result.percentage === 100))
  const results = computeAffinity(answersWith((question) => question.areaId === 'software' ? 5 : 2))
  assert.equal(results[0].areaId, 'software')
  assert.equal(results[0].percentage, 100)
  assert.ok(results.slice(1).every((result) => result.percentage === 40))
})

test('un empate parcial conserva ambos puntajes y datos inválidos no suman', () => {
  const answers = answersWith((question) => ['ia', 'software'].includes(question.areaId) ? 4 : 2)
  const results = computeAffinity(answers)
  assert.deepEqual(new Set(results.filter((result) => result.percentage === 80).map((result) => result.areaId)), new Set(['ia', 'software']))
  answers['ia-1'] = 99
  answers['ia-2'] = '5'
  answers['desconocida'] = 500
  assert.equal(computeAffinity(answers).find((result) => result.areaId === 'ia').score, 32)
})
