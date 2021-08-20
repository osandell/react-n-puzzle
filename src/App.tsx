import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// Components
import Board from './components/Board/Board'

// Interfaces
import TilePosition from './shared/interfaces/TilePosition.interface'

// Define css-in-js.
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

  const nrOfRows = 4
  const nrOfColumns = 4

  const [boardConfig, setBoardConfig] = useState<any[]>([])
  const [emptySquarePosition, setEmptySquarePosition] = useState<TilePosition>({
    row: nrOfRows - 1,
    column: nrOfColumns - 1,
  })

  useEffect(() => {
    // Generate an initial board configuration by looping through all the coordinates of the
    // board and generate the appropriate value.
    let newBoardConfig: any[] = []

    for (let i = 0; i < nrOfRows; i++) {
      newBoardConfig.push([])
      for (let j = 0; j < nrOfColumns; j++) {
        // When we reach the last position we leave it without a value so that it becomes an empty
        // square allowing us to move around the pieces.
        if (i === nrOfRows - 1 && j === nrOfColumns - 1) {
          newBoardConfig[i].push(null)
        } else {
          newBoardConfig[i].push(i * nrOfColumns + j + 1)
        }
      }
    }

    setBoardConfig(newBoardConfig)
  }, [setBoardConfig, nrOfRows, nrOfColumns])

  const handleClickTile = (clickPosition: TilePosition) => {
    // If a tile on the same row as the empty square is clicked we need to move horizontally.
    if (clickPosition.row === emptySquarePosition.row) {
      let newBoardConfig: any[] = [...boardConfig]
      let newEmptySquarePosition: TilePosition = { ...emptySquarePosition }

      // Determine if we clicked to the left or to the right of the empty square and move in
      // correct direction.
      if (clickPosition.column < newEmptySquarePosition.column) {
        let tileToMove: TilePosition = {
          row: clickPosition.row,
          column: newEmptySquarePosition.column - 1,
        }

        while (tileToMove.column >= clickPosition.column) {
          newBoardConfig[newEmptySquarePosition.row][
            newEmptySquarePosition.column
          ] = newBoardConfig[tileToMove.row][tileToMove.column]

          tileToMove.column = tileToMove.column - 1
          newEmptySquarePosition = {
            row: newEmptySquarePosition.row,
            column: newEmptySquarePosition.column - 1,
          }
        }
      } else {
        let tileToMove: TilePosition = {
          row: clickPosition.row,
          column: newEmptySquarePosition.column + 1,
        }

        while (tileToMove.column <= clickPosition.column) {
          newBoardConfig[newEmptySquarePosition.row][
            newEmptySquarePosition.column
          ] = newBoardConfig[tileToMove.row][tileToMove.column]

          tileToMove.column = tileToMove.column + 1
          newEmptySquarePosition = {
            row: newEmptySquarePosition.row,
            column: newEmptySquarePosition.column + 1,
          }
        }
      }

      newBoardConfig[newEmptySquarePosition.row][
        newEmptySquarePosition.column
      ] = null
      setBoardConfig(newBoardConfig)
      setEmptySquarePosition(newEmptySquarePosition)

      // If a tile on the same column as the empty square is clicked we need to move vertically.
    } else if (clickPosition.column === emptySquarePosition.column) {
      let newBoardConfig: any[] = [...boardConfig]
      let newEmptySquarePosition: TilePosition = { ...emptySquarePosition }

      // Determine if we clicked over or under the empty square and move in correct direction.
      if (clickPosition.row < newEmptySquarePosition.row) {
        let tileToMove: TilePosition = {
          row: newEmptySquarePosition.row - 1,
          column: clickPosition.column,
        }

        while (tileToMove.row >= clickPosition.row) {
          newBoardConfig[newEmptySquarePosition.row][
            newEmptySquarePosition.column
          ] = newBoardConfig[tileToMove.row][tileToMove.column]

          tileToMove.row = tileToMove.row - 1
          newEmptySquarePosition = {
            row: newEmptySquarePosition.row - 1,
            column: newEmptySquarePosition.column,
          }
        }
      } else {
        let tileToMove: TilePosition = {
          row: newEmptySquarePosition.row + 1,
          column: clickPosition.column,
        }

        while (tileToMove.row <= clickPosition.row) {
          newBoardConfig[newEmptySquarePosition.row][
            newEmptySquarePosition.column
          ] = newBoardConfig[tileToMove.row][tileToMove.column]

          tileToMove.row = tileToMove.row + 1
          newEmptySquarePosition = {
            row: newEmptySquarePosition.row + 1,
            column: newEmptySquarePosition.column,
          }
        }
      }

      newBoardConfig[newEmptySquarePosition.row][
        newEmptySquarePosition.column
      ] = null
      setBoardConfig(newBoardConfig)
      setEmptySquarePosition(newEmptySquarePosition)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Board
        boardConfig={boardConfig}
        handleClickTile={(position: TilePosition) => handleClickTile(position)}
      />
    </div>
  )
}

export default App
