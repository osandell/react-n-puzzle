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
import AlertDialog from './components/UI/AlertDialog'

// Interfaces
import TilePosition from './shared/interfaces/TilePosition.interface'
import AlertProps from './shared/interfaces/AlertProps.interface'

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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 320,
      width: '100vw',
      height: '100vh',
      padding: 20,
      background: '#333',
    },
    contentContainer: {
      width: '100vw',
      height: 5304,

      [`${theme.breakpoints.up('md')}`]: {
        width: 594,
        height: 314,
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        width: 540,
        height: 314,
      },
    },
    levelBox: {
      justifyContent: 'center',
      display: 'flex',
      marginBottom: 40,

      [`${theme.breakpoints.up('md')}`]: {
        justifyContent: 'flex-start',
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        justifyContent: 'flex-start',
      },
    },
    panelAndBoardContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',

      [`${theme.breakpoints.up('md')}`]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
    },
    controlPanel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      [`${theme.breakpoints.up('md')}`]: {
        alignItems: 'flex-start',
        marginRight: 50,
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        alignItems: 'flex-start',
        marginRight: 20,
      },
    },
    shuffleButton: {
      marginTop: 20,
      marginBottom: 40,
      backgroundColor: '#4a4a4a',
    },
    nrOfRowsOrColumnsBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 272,
      marginBottom: 20,

      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        width: 232,
      },
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
    },
    typography: {
      userSelect: 'none',
    },
  })
)

// Global constants
const MIN_NR_OF_ROWS = 2
const MAX_NR_OF_ROWS = 4
const MIN_NR_OF_COLUMNS = 2
const MAX_NR_OF_COLUMNS = 4
const SHUFFLE_QUALITY = 4

function App() {
  const classes = useStyles()

  const [nrOfRows, setNrOfRows] = useState<number>(2)
  const [nrOfColumns, setNrOfColumns] = useState<number>(2)
  const [boardConfig, setBoardConfig] = useState<any[]>([])
  const [emptySquarePosition, setEmptySquarePosition] = useState<TilePosition>({
    row: nrOfRows - 1,
    column: nrOfColumns - 1,
  })
  const [currentLevel, setCurrentLevel] = useState<number>(1)
  const [invokeShuffle, setInvokeShuffle] = useState<boolean>(false)
  const [alertProps, setAlertProps] = useState<AlertProps | null>(null)
  const [hasMadeFirstMove, setHasMadeFirstMove] = useState<boolean>(false)

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
    const timesToShuffle = nrOfRows * nrOfColumns * SHUFFLE_QUALITY

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
    // Make sure the user clicked on a valid tile
    if (
      clickPosition.row === emptySquarePosition.row ||
      clickPosition.column === emptySquarePosition.column
    ) {
      let newBoardConfig: any[] = [...boardConfig]
      let newEmptySquarePosition: TilePosition = { ...emptySquarePosition }

      // If the tile is on the same row as the empty square we need to move horizontally.
      if (clickPosition.row === emptySquarePosition.row) {
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

        // If the tile is on the same column as the emptly square we need to move vertically.
      } else if (clickPosition.column === emptySquarePosition.column) {
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
      }
      // If this is the first move of the game then set a flag in order to make sure we warn before
      // resetting the board again.
      !hasMadeFirstMove && setHasMadeFirstMove(true)

      // Check if the user has managed to put the tiles in the right order.
      let correctOrder = true

      for (let i = 0; i < nrOfRows && correctOrder; i++) {
        for (let j = 0; j < nrOfColumns && correctOrder; j++) {
          // Don't check the last square for a value since it's supposed to be empty.
          if (
            newBoardConfig[i][j] !== i * nrOfColumns + j + 1 &&
            !(i === nrOfRows - 1 && j === nrOfColumns - 1)
          ) {
            correctOrder = false
          }
        }
      }

      if (correctOrder) {
        // Check if this was the last level.
        if (currentLevel === MAX_NR_OF_COLUMNS + MAX_NR_OF_ROWS - 3) {
          setAlertProps({
            title: 'Congratulations!',
            description: 'You have finished the last level. Great job!!',
            alternative2: 'Ok',
          })
        } else {
          setAlertProps({
            title: 'Congratulations!',
            description: `You finished level ${currentLevel}. Advancing to level ${
              currentLevel + 1
            }.`,
            alternative2: 'Ok',
            alternative2Function: () => {
              // Go to the next level by adding either a row or a column depending on which is the most scarce
              // at the moment.
              nrOfColumns <= nrOfRows
                ? setNrOfColumns(nrOfColumns + 1)
                : setNrOfRows(nrOfRows + 1)

              setCurrentLevel(currentLevel + 1)
            },
          })
        }
      }

      newBoardConfig[newEmptySquarePosition.row][
        newEmptySquarePosition.column
      ] = null
      setBoardConfig(newBoardConfig)
      setEmptySquarePosition(newEmptySquarePosition)
    }
  }

  const displayWarning = (functionToRunOnAffirmation: () => void) => {
    setAlertProps({
      title: 'Are you sure?',
      description: 'This will quit your current game.',
      alternative1: 'Cancel',
      alternative2: 'OK',
      alternative2Function: () => {
        functionToRunOnAffirmation()
        setHasMadeFirstMove(false)
      },
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // A few handlers for button clicks. We always check if the user has made a first move and if so we
  // give a warning before resetting the board.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClickShuffle = () => {
    hasMadeFirstMove
      ? displayWarning(() => setInvokeShuffle(true))
      : setInvokeShuffle(true)
  }

  const handleDecreaseNrOfRows = () => {
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setNrOfRows(nrOfRows - 1)
        setCurrentLevel(currentLevel - 1)
      })
    } else {
      setNrOfRows(nrOfRows - 1)
      setCurrentLevel(currentLevel - 1)
    }
  }
  const handleIncreaseNrOfRows = () => {
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setNrOfRows(nrOfRows + 1)
        setCurrentLevel(currentLevel + 1)
      })
    } else {
      setNrOfRows(nrOfRows + 1)
      setCurrentLevel(currentLevel + 1)
    }
  }
  const handleDecreaseNrOfColumns = () => {
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setNrOfColumns(nrOfColumns - 1)
        setCurrentLevel(currentLevel - 1)
      })
    } else {
      setNrOfColumns(nrOfColumns - 1)
      setCurrentLevel(currentLevel - 1)
    }
  }
  const handleIncreaseNrOfColumns = () => {
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setNrOfColumns(nrOfColumns + 1)
        setCurrentLevel(currentLevel + 1)
      })
    } else {
      setNrOfColumns(nrOfColumns + 1)
      setCurrentLevel(currentLevel + 1)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box className={classes.root}>
        <Box className={classes.contentContainer}>
          <Box className={classes.levelBox}>
            <Typography
              className={classes.typography}
              display="block"
              variant="h4"
              color="secondary"
            >
              {'Level ' + currentLevel}
            </Typography>
          </Box>

          <Box className={classes.panelAndBoardContainer}>
            <Box className={classes.controlPanel}>
              <Box className={classes.nrOfRowsOrColumnsBox}>
                <Typography
                  className={classes.typography}
                  display="block"
                  variant="body1"
                  style={{ width: '120px' }}
                >
                  {'Rows:'}
                </Typography>
                <IconButton
                  className={classes.increaseOrDecreaseButton}
                  aria-label="subtract"
                  disabled={nrOfRows === MIN_NR_OF_ROWS ? true : false}
                  onClick={handleDecreaseNrOfRows}
                >
                  <RemoveIcon />
                </IconButton>
                <span className={classes.nrOfRowsOrColumnsText}>
                  {nrOfRows}
                </span>
                <IconButton
                  className={classes.increaseOrDecreaseButton}
                  aria-label="add"
                  disabled={nrOfRows === MAX_NR_OF_ROWS ? true : false}
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
                  style={{ width: '120px' }}
                >
                  {'Columns:'}
                </Typography>
                <IconButton
                  className={classes.increaseOrDecreaseButton}
                  aria-label="subtract"
                  disabled={nrOfColumns === MIN_NR_OF_COLUMNS ? true : false}
                  onClick={handleDecreaseNrOfColumns}
                >
                  <RemoveIcon />
                </IconButton>
                <span className={classes.nrOfRowsOrColumnsText}>
                  {nrOfColumns}
                </span>
                <IconButton
                  className={classes.increaseOrDecreaseButton}
                  aria-label="add"
                  disabled={nrOfColumns === MAX_NR_OF_COLUMNS ? true : false}
                  onClick={handleIncreaseNrOfColumns}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                className={classes.shuffleButton}
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
          </Box>
          {alertProps !== null && (
            <AlertDialog content={alertProps} setContent={setAlertProps} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
