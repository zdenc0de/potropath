/** Solo se transmiten los términos editables del buscador, nunca el diagnóstico. */
export function linkedInSearch(keywords, location) {
  const params = new URLSearchParams({ keywords: keywords.trim(), location: location.trim() })
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`
}
