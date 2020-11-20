import { render, screen } from "@testing-library/react"
import React from "react"
import App from "../app"

test("renders title Dashboard", () => {
  // const { getByText } = render(<App />)
  // const linkElement = getByText(/Dashboard/i)
  // expect(document.body.contains(linkElement))
  render(<App />)
  const titleElement = screen.getByText(/Dashboard/i)
  expect(titleElement).toBeInTheDocument()
})
