import React from 'react'
import ReactDOM from 'react-dom/client'
import { PathfinderProvider } from './pathfinder'
import { TryForm } from './try-form'

const App = () => {
  return (
    <PathfinderProvider>
      <div>your app</div>
      <TryForm />
    </PathfinderProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
