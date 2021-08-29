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
const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: (props) => ({
      display: 'inline-flex',
      position: 'relative',
      flexDirection: 'column',
      background: 'orange',
      borderRadius: 5,
    }),
  })
)

const Board: FC<Props> = (props): ReactElement => {
  const classes = useStyles(props)

  // Loop through every position of the board and generate a tile plus a hidden tile. The visible
  // tiles needs to be in a one dimensional array with consistent key properties in order to be able
  // to animate. The hidden tiles on the other hand needs to be in a 2d array in order to fill out the
  // appropriate space for the board.
  let board = []
  let hiddenBoard = []
  for (let i = 0; i < props.boardConfig.length; i++) {
    const row = props.boardConfig[i]

    let rowTiles = []
    for (let j = 0; j < row.length; j++) {
      row[j] !== null &&
        board.push(
          <Tile
            key={row[j]}
            position={{ row: i, column: j }}
            value={row[j]}
            onClick={(position: TilePosition) =>
              props.handleClickTile(position)
            }
          />
        )
      rowTiles.push(
        <Tile
          key={j}
          position={{ row: i, column: j }}
          hidden
          onClick={(position: TilePosition) => props.handleClickTile(position)}
        />
      )
    }

    hiddenBoard.push(<Box key={i}>{rowTiles}</Box>)
  }

  return (
    <Box data-testid="board" className={classes.root}>
      {board}
      {hiddenBoard}
    </Box>
  )
}

export default Board
