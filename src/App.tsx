import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// components
import Board from './components/Board/Board'

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 320,
      width: '100vw',
      height: '100vh',
      padding: 20,
      background: 'lightGrey',
    },
  })
)

function App() {
  const classes = useStyles()

  const nrOfRows = 3
  const nrOfColumns = 3

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Board nrOfRows={nrOfRows} nrOfColumns={nrOfColumns} />
    </div>
  )
}

export default App
