import React from 'react'
import { CssBaseline } from '@material-ui/core'

// components
import Tile from './components/Tile'

function App() {
  return (
    <>
      <CssBaseline />
      <Tile value={12} />
    </>
  )
}

export default App
