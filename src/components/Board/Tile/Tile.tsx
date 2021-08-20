import React, { FC, ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

interface Props {
  value: number
}

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 100,
      height: 100,
      margin: 5,
      background: 'white',
    },
  })
)

const Tile: FC<Props> = ({ value }): ReactElement => {
  const classes = useStyles()

  return <Button className={classes.root}>{value}</Button>
}

export default Tile
