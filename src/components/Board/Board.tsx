import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

// Components
import Tile from './Tile/Tile'

// Interfaces
import TilePosition from '../../shared/interfaces/TilePosition.interface'
interface Props {
  boardConfig: any[]
  handleClickTile: (position: TilePosition) => void
}

// Define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      background: 'orange',
    },
  })
)

const Board: FC<Props> = ({ boardConfig, handleClickTile }): ReactElement => {
  const classes = useStyles()

  // loop through every row of the board configuration and generate a box with tiles for each
  let board = []
  for (let i = 0; i < boardConfig.length; i++) {
    const row = boardConfig[i]

    let rowTiles = []
    for (let j = 0; j < row.length; j++) {
      rowTiles.push(
        <Tile
          key={j}
          position={{ row: i, column: j }}
          value={row[j]}
          onClick={(position: TilePosition) => handleClickTile(position)}
        />
      )
    }

    board.push(<Box key={i}>{rowTiles}</Box>)
  }

  return (
    <Box data-testid="board" className={classes.root}>
      {board}
    </Box>
  )
}

export default Board
