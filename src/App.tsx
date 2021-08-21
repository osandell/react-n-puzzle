import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

// Components
import Board from './components/Board/Board'

// Interfaces
import TilePosition from './shared/interfaces/TilePosition.interface'

// Types
type ShuffleDirection = 'horizontal' | 'vertical'

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
      background: '#333',
    },
    controlPanel: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 50,
    },
    button: {
      backgroundColor: '#777',
    },
  })
)

function App() {
  const classes = useStyles()

  const nrOfRows = 3
  const nrOfColumns = 3

  const [boardConfig, setBoardConfig] = useState<any[]>([])
  const [emptySquarePosition, setEmptySquarePosition] = useState<TilePosition>({
    row: nrOfRows - 1,
    column: nrOfColumns - 1,
  })

  // Generate an initial board configuration by looping through all the positions of the
  // board and generate the appropriate value.
  useEffect(() => {
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
    // If the tile is on the same row as the empty square we need to move horizontally.
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

      // If the tile is on the same column as the emptly square we need to move vertically.
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

  const handleShuffle = () => {
    let newBoardConfig: any[] = [...boardConfig]
    let newEmptySquarePosition: TilePosition = { ...emptySquarePosition }

    // This variable represents a "virtual" click position that is generated for each shuffle iteration.
    let clickPosition

    // Randomize whether to start moving tiles horizontally or vertically.
    let shuffleDirection: ShuffleDirection
    Math.random() < 0.5
      ? (shuffleDirection = 'horizontal')
      : (shuffleDirection = 'vertical')

    // Calculate how many times to shuffle based on the board size
    const timesToShuffle = nrOfRows * nrOfColumns * 3

    for (let i = 0; i < timesToShuffle; i++) {
      // Alternate horizontally and vertically and move a randomized amount of tiles.
      if (shuffleDirection === 'horizontal') {
        // Now we need to pick a random tile on the row with the empty square. We do this by
        // randomizing columns until we find one that doesn't include the empty square.
        let foundValidColumn = false
        let columnOfTileToMove = 0
        while (!foundValidColumn) {
          let randomColumn = Math.round(Math.random() * (nrOfColumns - 1))
          if (!(randomColumn === newEmptySquarePosition.column)) {
            columnOfTileToMove = randomColumn
            foundValidColumn = true
          }
        }

        // Generate a the position on the board to make a "virtual" click.
        clickPosition = {
          row: newEmptySquarePosition.row,
          column: columnOfTileToMove,
        }

        // Determine if the tile to be moved is located to the left or to the right of the
        // empty square and move in correct direction.
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

        // Change direction of tile movement for next round
        shuffleDirection = 'vertical'
      } else if (shuffleDirection === 'vertical') {
        let foundValidRow = false
        let rowOfTileToMove = 0
        while (!foundValidRow) {
          let randomRow = Math.round(Math.random() * (nrOfRows - 1))
          if (!(randomRow === newEmptySquarePosition.row)) {
            rowOfTileToMove = randomRow
            foundValidRow = true
          }
        }

        clickPosition = {
          row: rowOfTileToMove,
          column: newEmptySquarePosition.column,
        }

        // Determine if the tile to be moved is located over or under the empty square
        // and move in correct direction.
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

        shuffleDirection = 'horizontal'
      }
    }
    newBoardConfig[newEmptySquarePosition.row][newEmptySquarePosition.column] =
      null
    setBoardConfig(newBoardConfig)
    setEmptySquarePosition(newEmptySquarePosition)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box className={classes.controlPanel}>
        <Button className={classes.button} onClick={() => handleShuffle()}>
          Shuffle
        </Button>
      </Box>
      <Board
        boardConfig={boardConfig}
        handleClickTile={(position: TilePosition) => handleClickTile(position)}
      />
    </div>
  )
}

export default App
