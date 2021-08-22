import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// Interfaces
import TilePosition from '../../../shared/interfaces/TilePosition.interface'
interface Props {
  position: TilePosition
  value: number
  onClick: (position: TilePosition) => void
}

// Define css-in-js
const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: (props) => ({
      width: 100,
      height: 100,
      margin: 5,
      backgroundColor: '#444',
      '&:hover': {
        backgroundColor: '#00000090',
      },
      '@media (hover: hover)': {
        '&:hover': {
          backgroundColor: '#00000090',
        },
      },
      // We always have one button with value === null that represents the empty square,
      // that's why we hide it.
      visibility: `${props.value === null ? 'hidden' : 'visible'}`,
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
      {/* We need some placeholder string even on the hidden button to keep the right dimensions. */}
      {props.value === null ? '\u00A0' : props.value}
    </Button>
  )
}

export default Tile
