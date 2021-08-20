import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders a board', () => {
  render(<App />)
  const linkElement = screen.getByTestId('board')
  expect(linkElement).toBeInTheDocument()
})
