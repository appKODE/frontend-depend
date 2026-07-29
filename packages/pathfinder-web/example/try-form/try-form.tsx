import * as React from 'react'
import { useState } from 'react'
import coreSpec from '../pathfinder/core.json'

type Endpoint = {
  method: string
  url: string
  summary: string
}

const BASE_URL = coreSpec.servers[0].url

function buildEndpoints(): Endpoint[] {
  const endpoints: Endpoint[] = []

  for (const [path, item] of Object.entries(coreSpec.paths)) {
    for (const [method, operation] of Object.entries(item)) {
      const url = BASE_URL + path.replace(/\{[^}]+\}/g, '1')
      endpoints.push({
        method: method.toUpperCase(),
        url,
        summary: (operation as { summary: string }).summary,
      })
    }
  }

  return endpoints
}

const ENDPOINTS = buildEndpoints()

export const TryForm = () => {
  const [result, setResult] = useState<unknown>(null)
  const [activeUrl, setActiveUrl] = useState('')

  const runFetch = async (method: string, url: string) => {
    setActiveUrl(url)
    setResult(null)
    try {
      const res = await fetch(url, { method })
      const json = await res.json()
      setResult(json)
    } catch (e) {
      setResult({ error: String(e) })
    }
  }

  const runXHR = (method: string, url: string) => {
    setActiveUrl(url)
    setResult(null)
    const req = new XMLHttpRequest()
    req.onload = function () {
      try {
        setResult(JSON.parse(this.responseText))
      } catch {
        setResult({ raw: this.responseText })
      }
    }
    req.onerror = () => setResult({ error: 'XHR error' })
    req.open(method, url, true)
    req.send()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>URL</th>
            <th style={thStyle}>Summary</th>
            <th style={thStyle}>Fetch</th>
            <th style={thStyle}>XHR</th>
          </tr>
        </thead>
        <tbody>
          {ENDPOINTS.map((ep, i) => (
            <tr
              key={i}
              style={{
                background: activeUrl === ep.url ? '#f0f4ff' : undefined,
              }}>
              <td style={tdStyle}>
                <code>{ep.method}</code>
              </td>
              <td style={tdStyle}>
                <code style={{ fontSize: 12 }}>{ep.url}</code>
              </td>
              <td style={tdStyle}>{ep.summary}</td>
              <td style={tdStyle}>
                <button onClick={() => runFetch(ep.method, ep.url)}>
                  Fetch
                </button>
              </td>
              <td style={tdStyle}>
                <button onClick={() => runXHR(ep.method, ep.url)}>XHR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {result !== null && (
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            background: '#f5f5f5',
            overflow: 'auto',
            maxHeight: 300,
          }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  borderBottom: '2px solid #ddd',
}

const tdStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: '1px solid #eee',
}
