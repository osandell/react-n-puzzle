import React, { useState } from 'react'

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

// Utilitary functions
import {
  getEmptySquarePosition,
  moveTiles,
  shuffleTiles,
  initiateBoard,
} from './utils/gameLogic'

// Interfaces
import TilePosition from './shared/interfaces/TilePosition.interface'
import AlertProps from './shared/interfaces/AlertProps.interface'

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

      // There is a bug in Material UI causing buttons to become transparent after clicking them
      // on mobile devices. Below code makes sure we have control over the colors.
      backgroundColor: '#4a4a4a',
      '&:hover': {
        backgroundColor: '#4a4a4a',
      },
      '@media (hover: hover)': {
        '&:hover': {
          backgroundColor: '#0000000a',
        },
      },
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
      '&:hover': {
        backgroundColor: '#4a4a4a',
      },
      '@media (hover: hover)': {
        '&:hover': {
          backgroundColor: '#0000000a',
        },
      },
    },
    // The following 2 keys constitutes a "hack" to take control over the background color of
    // disabled buttons in Material UI. Here we don't want them to get a transparent background
    // but instead stay colored grey.
    rootButton: {
      '&$disabled': {
        backgroundColor: '#4a4a4a',
      },
    },
    disabled: {},
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
const INITIAL_NR_OF_ROWS = 2
const INITIAL_NR_OF_COLUMNS = 2
const MIN_NR_OF_ROWS = 2
const MAX_NR_OF_ROWS = 4
const MIN_NR_OF_COLUMNS = 2
const MAX_NR_OF_COLUMNS = 4

function App() {
  const classes = useStyles()

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Set up the state.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [boardConfig, setBoardConfig] = useState<any[]>(() =>
    initiateBoard(INITIAL_NR_OF_ROWS, INITIAL_NR_OF_COLUMNS)
  )
  const [currentLevel, setCurrentLevel] = useState<number>(1)
  const [alertProps, setAlertProps] = useState<AlertProps | null>(null)
  const [hasMadeFirstMove, setHasMadeFirstMove] = useState<boolean>(false)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // This handler is activated when the user clicks on a tile that lines up either horizonally or
  // vertically with the empty square.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClickTile = (clickPosition: TilePosition) => {
    //Make sure the user clicked on a valid tile
    let emptySquarePosition = getEmptySquarePosition([...boardConfig])
    if (
      clickPosition.row === emptySquarePosition.row ||
      clickPosition.column === emptySquarePosition.column
    ) {
      // Move the tiles and get the updated board config + empty square position
      let newBoardConfig: any[] = moveTiles(clickPosition, [...boardConfig])
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
        let nrOfRows = newBoardConfig.length
        let nrOfColumns = newBoardConfig[0].length

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
              if (nrOfColumns <= nrOfRows) {
                newBoardConfig = initiateBoard(nrOfRows, nrOfColumns + 1)
              } else {
                newBoardConfig = initiateBoard(nrOfRows + 1, nrOfColumns)
              }
              setCurrentLevel(currentLevel + 1)
              setBoardConfig(newBoardConfig)
            },
          })
        }
      }

      setBoardConfig(newBoardConfig)
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
      ? displayWarning(() => setBoardConfig(shuffleTiles([...boardConfig])))
      : setBoardConfig(shuffleTiles([...boardConfig]))
  }

  const handleDecreaseNrOfRows = () => {
    let nrOfRows = boardConfig.length
    let nrOfColumns = boardConfig[0].length

    if (hasMadeFirstMove) {
      displayWarning(() => {
        setCurrentLevel(currentLevel - 1)
        const newBoardConfig = initiateBoard(nrOfRows - 1, nrOfColumns)
        setBoardConfig(newBoardConfig)
      })
    } else {
      setCurrentLevel(currentLevel - 1)
      const newBoardConfig = initiateBoard(nrOfRows - 1, nrOfColumns)
      setBoardConfig(newBoardConfig)
    }
  }
  const handleIncreaseNrOfRows = () => {
    let nrOfRows = boardConfig.length
    let nrOfColumns = boardConfig[0].length
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setCurrentLevel(currentLevel + 1)
        const newBoardConfig = initiateBoard(nrOfRows + 1, nrOfColumns)
        setBoardConfig(newBoardConfig)
      })
    } else {
      setCurrentLevel(currentLevel + 1)
      const newBoardConfig = initiateBoard(nrOfRows + 1, nrOfColumns)
      setBoardConfig(newBoardConfig)
    }
  }
  const handleDecreaseNrOfColumns = () => {
    let nrOfRows = boardConfig.length
    let nrOfColumns = boardConfig[0].length
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setCurrentLevel(currentLevel - 1)
        const newBoardConfig = initiateBoard(nrOfRows, nrOfColumns - 1)
        setBoardConfig(newBoardConfig)
      })
    } else {
      setCurrentLevel(currentLevel - 1)
      const newBoardConfig = initiateBoard(nrOfRows, nrOfColumns - 1)
      setBoardConfig(newBoardConfig)
    }
  }
  const handleIncreaseNrOfColumns = () => {
    let nrOfRows = boardConfig.length
    let nrOfColumns = boardConfig[0].length
    if (hasMadeFirstMove) {
      displayWarning(() => {
        setCurrentLevel(currentLevel + 1)
        const newBoardConfig = initiateBoard(nrOfRows, nrOfColumns + 1)
        setBoardConfig(newBoardConfig)
      })
    } else {
      setCurrentLevel(currentLevel + 1)
      const newBoardConfig = initiateBoard(nrOfRows, nrOfColumns + 1)
      setBoardConfig(newBoardConfig)
    }
  }

  let nrOfRows = boardConfig.length
  let nrOfColumns = boardConfig[0].length

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
                  classes={{
                    root: classes.rootButton,
                    disabled: classes.disabled,
                  }}
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
                  classes={{
                    root: classes.rootButton,
                    disabled: classes.disabled,
                  }}
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
                  classes={{
                    root: classes.rootButton,
                    disabled: classes.disabled,
                  }}
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
                  classes={{
                    root: classes.rootButton,
                    disabled: classes.disabled,
                  }}
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
