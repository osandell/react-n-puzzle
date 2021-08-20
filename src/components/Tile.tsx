import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

interface Props {
  value: number
}

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
    board: {
      display: 'flex',
      flexDirection: 'column',
      background: 'orange',
    },
    tile: {
      width: 100,
      height: 100,
      margin: 5,
      background: 'white',
    },
  })
)

const Tile: FC<Props> = ({ value }): ReactElement => {
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
      rowTiles.push(
        <Button key={j} className={classes.tile}>
          {row[j]}
        </Button>
      )
    }

    rows.push(<Box key={i}>{rowTiles}</Box>)
  }

  return (
    <div className={classes.root}>
      <Box data-testid="board" className={classes.board}>
        {rows}
      </Box>
    </div>
  )
}

export default Tile
