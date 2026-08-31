/* Thin client for the FastAPI backend.
   In dev, Vite proxies /api -> http://127.0.0.1:8000 (see vite.config.js). */

const BASE = import.meta.env.VITE_API_BASE ?? ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const body = await res.json()
      if (typeof body.detail === 'string') detail = body.detail
      else if (Array.isArray(body.detail)) detail = body.detail[0]?.msg ?? detail
    } catch {
      /* non-JSON error body — keep the generic message */
    }
    throw new Error(detail)
  }

  return res.json()
}

export const getResume = () => request('/api/resume')
export const getHealth = () => request('/api/health')
export const sendContact = (payload) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
export const askChat = (question) =>
  request('/api/chat', { method: 'POST', body: JSON.stringify({ question }) })
