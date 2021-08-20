import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

// components
import Tile from './Tile/Tile'

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      background: 'orange',
    },
  })
)

const Board: FC = (): ReactElement => {
  const classes = useStyles()

  // a temporary test configuration of the board
  let boardConfig = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]

  let rows = []

  // loop through every row of the board configuration and generate a box with tiles for each
  for (var i = 0; i < boardConfig.length; i++) {
    const row = boardConfig[i]

    let rowTiles = []
    for (var j = 0; j < row.length; j++) {
      rowTiles.push(<Tile key={j} value={row[j]} />)
    }

    rows.push(<Box key={i}>{rowTiles}</Box>)
  }

  return (
    <Box data-testid="board" className={classes.root}>
      {rows}
    </Box>
  )
}

export default Board
