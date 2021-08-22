import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  createStyles,
  Theme,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'

// Components
import Board from './components/Board/Board'

// Interfaces
import TilePosition from './shared/interfaces/TilePosition.interface'

// Types
type ShuffleDirection = 'horizontal' | 'vertical'

// Create a dark theme.
const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: `"Open Sans", sans-serif`,
  },
})

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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 50,
    },
    newGameButton: {
      marginTop: 60,
      backgroundColor: '#4a4a4a',
    },
    nrOfRowsOrColumnsBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    nrOfRowsOrColumnsText: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 8,
      padding: 5,
      fontSize: 16,
      margin: '0 10px 0 10px',
      userSelect: 'none',
    },
    increaseOrDecreaseButton: {
      backgroundColor: '#4a4a4a',
    },
    boardBox: {
      display: 'flex',
      justifyContent: 'center',
      width: 600,
    },
    typography: {
      userSelect: 'none',
    },
  })
)

function App() {
  const classes = useStyles()

  const [nrOfRows, setNrOfRows] = useState<number>(3)
  const [nrOfColumns, setNrOfColumns] = useState<number>(3)
  const [boardConfig, setBoardConfig] = useState<any[]>([])
  const [emptySquarePosition, setEmptySquarePosition] = useState<TilePosition>({
    row: nrOfRows - 1,
    column: nrOfColumns - 1,
  })
  const [invokeShuffle, setInvokeShuffle] = useState<boolean>(false)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // This callback will be called whenever the page reloads, the user changes board size, or clicks the
  // shuffle button.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (invokeShuffle) {
      setInvokeShuffle(false)
    }

    //////////////////////////////
    // Initiate the board.
    //////////////////////////////
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

    //////////////////////////////
    // Shuffle the tiles.
    //////////////////////////////

    // Store the position of the empty square so we can keep track of it while shuffling
    let newEmptySquarePosition: TilePosition = {
      row: nrOfRows - 1,
      column: nrOfColumns - 1,
    }

    // This variable represents a "virtual" click position that is generated for each shuffle iteration.
    let clickPosition

    // Randomize whether to start moving tiles horizontally or vertically.
    let shuffleDirection: ShuffleDirection
    Math.random() < 0.5
      ? (shuffleDirection = 'horizontal')
      : (shuffleDirection = 'vertical')

    // Calculate how many times to shuffle based on the board size.
    const shuffleQuality = 4
    const timesToShuffle = nrOfRows * nrOfColumns * shuffleQuality

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
  }, [setBoardConfig, nrOfRows, nrOfColumns, invokeShuffle])

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // This handler is activated when the user clicks on a tile that lines up either horizonally or
  // vertically with the empty square.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  const handleClickShuffle = () => {
    setInvokeShuffle(true)
  }

  const handleDecreaseNrOfRows = () => {
    setNrOfRows(nrOfRows - 1)
  }
  const handleIncreaseNrOfRows = () => {
    setNrOfRows(nrOfRows + 1)
  }
  const handleDecreaseNrOfColumns = () => {
    setNrOfColumns(nrOfColumns - 1)
  }
  const handleIncreaseNrOfColumns = () => {
    setNrOfColumns(nrOfColumns + 1)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Box className={classes.controlPanel}>
          <Box className={classes.nrOfRowsOrColumnsBox}>
            <Typography
              className={classes.typography}
              display="block"
              variant="body1"
              style={{ width: '80px' }}
            >
              {'Rows:'}
            </Typography>
            <IconButton
              className={classes.increaseOrDecreaseButton}
              aria-label="subtract"
              disabled={nrOfRows === 2 ? true : false}
              onClick={handleDecreaseNrOfRows}
            >
              <RemoveIcon />
            </IconButton>
            <span className={classes.nrOfRowsOrColumnsText}>{nrOfRows}</span>
            <IconButton
              className={classes.increaseOrDecreaseButton}
              aria-label="add"
              disabled={nrOfRows === 5 ? true : false}
              onClick={handleIncreaseNrOfRows}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box className={classes.nrOfRowsOrColumnsBox}>
            <Typography
              className={classes.typography}
              display="block"
              variant="body1"
              style={{ width: '80px' }}
            >
              {'Columns:'}
            </Typography>
            <IconButton
              className={classes.increaseOrDecreaseButton}
              aria-label="subtract"
              disabled={nrOfColumns === 2 ? true : false}
              onClick={handleDecreaseNrOfColumns}
            >
              <RemoveIcon />
            </IconButton>
            <span className={classes.nrOfRowsOrColumnsText}>{nrOfColumns}</span>
            <IconButton
              className={classes.increaseOrDecreaseButton}
              aria-label="add"
              disabled={nrOfColumns === 5 ? true : false}
              onClick={handleIncreaseNrOfColumns}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            className={classes.newGameButton}
            onClick={() => handleClickShuffle()}
          >
            shuffle
          </Button>
        </Box>
        <Box className={classes.boardBox}>
          <Board
            boardConfig={boardConfig}
            handleClickTile={(position: TilePosition) =>
              handleClickTile(position)
            }
          />
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default App
