// Interfaces
import TilePosition from '../shared/interfaces/TilePosition.interface'

// Types
type ShuffleDirection = 'horizontal' | 'vertical'

// Global constants
const SHUFFLE_QUALITY = 4

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Calculate the position of the empty square
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getEmptySquarePosition = (newBoardConfig: any[]): TilePosition => {
  let emptySquarePosition: TilePosition = { row: 0, column: 0 }
  for (let i = 0; i < newBoardConfig.length; i++) {
    const row = newBoardConfig[i]
    for (let j = 0; j < row.length; j++) {
      const value = row[j]
      if (value === null) {
        emptySquarePosition = { row: i, column: j }
      }
    }
  }

  return emptySquarePosition
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to move one or several tiles left, right, up or down.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const moveTiles = (
  clickPosition: TilePosition,
  newBoardConfig: any[]
): any[] => {
  // Get position of the empty square
  let emptySquarePosition = getEmptySquarePosition(newBoardConfig)

  // If the tile is on the same row as the empty square we need to move horizontally.
  if (clickPosition.row === emptySquarePosition.row) {
    // Determine if we clicked to the left or to the right of the empty square and move in
    // correct direction.
    if (clickPosition.column < emptySquarePosition.column) {
      let tileToMove: TilePosition = {
        row: clickPosition.row,
        column: emptySquarePosition.column - 1,
      }

      while (tileToMove.column >= clickPosition.column) {
        newBoardConfig[emptySquarePosition.row][emptySquarePosition.column] =
          newBoardConfig[tileToMove.row][tileToMove.column]

        tileToMove.column = tileToMove.column - 1
        emptySquarePosition = {
          row: emptySquarePosition.row,
          column: emptySquarePosition.column - 1,
        }
      }
    } else {
      let tileToMove: TilePosition = {
        row: clickPosition.row,
        column: emptySquarePosition.column + 1,
      }

      while (tileToMove.column <= clickPosition.column) {
        newBoardConfig[emptySquarePosition.row][emptySquarePosition.column] =
          newBoardConfig[tileToMove.row][tileToMove.column]

        tileToMove.column = tileToMove.column + 1
        emptySquarePosition = {
          row: emptySquarePosition.row,
          column: emptySquarePosition.column + 1,
        }
      }
    }

    // If the tile is on the same column as the emptly square we need to move vertically.
  } else if (clickPosition.column === emptySquarePosition.column) {
    // Determine if we clicked over or under the empty square and move in correct direction.
    if (clickPosition.row < emptySquarePosition.row) {
      let tileToMove: TilePosition = {
        row: emptySquarePosition.row - 1,
        column: clickPosition.column,
      }

      while (tileToMove.row >= clickPosition.row) {
        newBoardConfig[emptySquarePosition.row][emptySquarePosition.column] =
          newBoardConfig[tileToMove.row][tileToMove.column]

        tileToMove.row = tileToMove.row - 1
        emptySquarePosition = {
          row: emptySquarePosition.row - 1,
          column: emptySquarePosition.column,
        }
      }
    } else {
      let tileToMove: TilePosition = {
        row: emptySquarePosition.row + 1,
        column: clickPosition.column,
      }

      while (tileToMove.row <= clickPosition.row) {
        newBoardConfig[emptySquarePosition.row][emptySquarePosition.column] =
          newBoardConfig[tileToMove.row][tileToMove.column]

        tileToMove.row = tileToMove.row + 1
        emptySquarePosition = {
          row: emptySquarePosition.row + 1,
          column: emptySquarePosition.column,
        }
      }
    }
  }

  newBoardConfig[emptySquarePosition.row][emptySquarePosition.column] = null
  return newBoardConfig
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// This function shuffles the tiles around by making an amount of "virtual mouseclicks" on valid
// tiles.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const shuffleTiles = (newBoardConfig: any[]): any[] => {
  let nrOfRows = newBoardConfig.length
  let nrOfColumns = newBoardConfig[0].length

  // This variable represents a "virtual" click position that is generated for each shuffle iteration.
  let clickPosition: TilePosition = { row: 0, column: 0 }

  // Randomize whether to start moving tiles horizontally or vertically.
  let shuffleDirection: ShuffleDirection
  Math.random() < 0.5
    ? (shuffleDirection = 'horizontal')
    : (shuffleDirection = 'vertical')

  // Calculate how many times to shuffle based on the board size.
  const timesToShuffle = nrOfRows * nrOfColumns * SHUFFLE_QUALITY

  for (let i = 0; i < timesToShuffle; i++) {
    // Get position of the empty square
    let emptySquarePosition = getEmptySquarePosition(newBoardConfig)

    // Alternate horizontally and vertically and move a randomized amount of tiles.
    if (shuffleDirection === 'horizontal') {
      // Now we need to pick a random tile on the row with the empty square. We do this by
      // randomizing columns until we find one that doesn't include the empty square.
      let foundValidColumn = false
      let columnOfTileToMove = 0
      while (!foundValidColumn) {
        let randomColumn = Math.round(Math.random() * (nrOfColumns - 1))
        if (!(randomColumn === emptySquarePosition.column)) {
          columnOfTileToMove = randomColumn
          foundValidColumn = true
        }
      }

      // Generate a position on the board to make a "virtual" click.
      clickPosition = {
        row: emptySquarePosition.row,
        column: columnOfTileToMove,
      }

      // Change direction of tile movement for next round
      shuffleDirection = 'vertical'
    } else if (shuffleDirection === 'vertical') {
      let foundValidRow = false
      let rowOfTileToMove = 0
      while (!foundValidRow) {
        let randomRow = Math.round(Math.random() * (nrOfRows - 1))
        if (!(randomRow === emptySquarePosition.row)) {
          rowOfTileToMove = randomRow
          foundValidRow = true
        }
      }

      clickPosition = {
        row: rowOfTileToMove,
        column: emptySquarePosition.column,
      }
      shuffleDirection = 'horizontal'
    }
    // Move the tiles and get the updated board config + empty square position
    newBoardConfig = moveTiles(clickPosition, newBoardConfig)
  }

  return newBoardConfig
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// This function will be called whenever the page reloads or the user changes board size.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const initiateBoard = (
  newNrOfRows: number,
  newNrOfColumns: number
): any[] => {
  // Initiate the board.
  let initialBoardConfig: any[] = []

  for (let i = 0; i < newNrOfRows; i++) {
    initialBoardConfig.push([])
    for (let j = 0; j < newNrOfColumns; j++) {
      // When we reach the last position set it to null so that it becomes an empty
      // square allowing us to move around the pieces.
      if (i === newNrOfRows - 1 && j === newNrOfColumns - 1) {
        initialBoardConfig[i].push(null)
      } else {
        initialBoardConfig[i].push(i * newNrOfColumns + j + 1)
      }
    }
  }

  // Shuffle the tiles.
  const newBoardConfig: any[] = shuffleTiles(initialBoardConfig)

  return newBoardConfig
}
