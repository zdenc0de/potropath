import { AREAS } from '../data/areas.js'
import { QUESTIONS, SCALE } from '../data/questions.js'

const VALID_VALUES = new Set(SCALE.map((step) => step.value))
const QUESTIONS_PER_AREA = QUESTIONS.length / AREAS.length
const MAX_SCORE_PER_AREA = QUESTIONS_PER_AREA * 5
export const MIN_PERCENTAGE = Math.round(QUESTIONS_PER_AREA / MAX_SCORE_PER_AREA * 100)
export const NEUTRAL_PERCENTAGE = Math.round(QUESTIONS_PER_AREA * 3 / MAX_SCORE_PER_AREA * 100)

/** Porcentaje del máximo posible; preserva la escala histórica 20–100 para sesiones completas. */
export function computeAffinity(answers) {
  const totals = Object.fromEntries(AREAS.map((area) => [area.id, 0]))
  for (const question of QUESTIONS) {
    const value = answers[question.id]
    if (VALID_VALUES.has(value)) totals[question.areaId] += value
  }
  return AREAS.map((area) => ({
    areaId: area.id,
    score: totals[area.id],
    percentage: Math.round(totals[area.id] / MAX_SCORE_PER_AREA * 100),
  })).sort((a, b) => b.percentage - a.percentage)
}
