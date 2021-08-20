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

const Board: FC<Props> = ({ nrOfRows, nrOfColumns }): ReactElement => {
  const classes = useStyles()

  // Loop through all the coordinates of the board and generate a tile with the appropriate value
  let rows = []
  for (var i = 0; i < nrOfRows; i++) {
    let rowTiles = []
    for (var j = 0; j < nrOfColumns; j++) {
      // When we reach the last position we leave it without a tile in order for to be able to move
      // around the pieces.
      if (!(i === nrOfRows - 1 && j === nrOfColumns - 1)) {
        rowTiles.push(<Tile key={j} value={i * nrOfColumns + j + 1} />)
      }
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
