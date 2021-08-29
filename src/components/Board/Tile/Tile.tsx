import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// Interfaces
import TilePosition from '../../../shared/interfaces/TilePosition.interface'
interface Props {
  position: TilePosition
  value?: number
  hidden?: boolean
  onClick: (position: TilePosition) => void
}

// Global constants
const TILE_SIZE = 50
const TILE_MARGIN = 2

// Define css-in-js
const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: (props) => ({
      minWidth: TILE_SIZE,
      minHeight: TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      margin: TILE_MARGIN,
      // If this is a hidden tile we want it to affect the size of the containing div. Therefore
      // we only set the positioning to absolute in case it's a visible tile.
      position: `${props.hidden ? 'initial' : 'absolute'}`,
      visibility: `${props.hidden ? 'hidden' : 'visible'}`,
      left: props.position.column * (TILE_SIZE + TILE_MARGIN),
      top: props.position.row * (TILE_SIZE + TILE_MARGIN),
      transition: 'all 0.6s ease',
      backgroundColor: '#444',
      '&:hover': {
        backgroundColor: '#00000090',
      },
      '@media (hover: hover)': {
        '&:hover': {
          backgroundColor: '#00000090',
        },
      },
    }),
  })
)

const Tile: FC<Props> = (props): ReactElement => {
  const classes = useStyles(props)

  return (
    <Button
      className={classes.root}
      onClick={() => props.onClick(props.position)}
    >
      {props.value}
    </Button>
  )
}

export default Tile
