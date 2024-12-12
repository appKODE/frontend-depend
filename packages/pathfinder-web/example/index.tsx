import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.getElementById('root'))
