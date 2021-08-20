import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders "react-n-puzzle"', () => {
  render(<App />)
  const linkElement = screen.getByText(/react-n-puzzle/i)
  expect(linkElement).toBeInTheDocument()
})
