import { render, screen } from "@testing-library/react"
import React from "react"
import App from "../modules/shared/editor"

test("renders welcome message in the Editor", () => {
  // const { getByText } = render(<App />)
  // const linkElement = getByText(/Dashboard/i)
  // expect(document.body.contains(linkElement))
  render(
    <App
      input={{
        value: "<p>Hello</p>",
        onChange: value => console.log("Testing", value),
      }}
    />
  )
  const titleElement = screen.getByText(/Hello/i)
  expect(titleElement).toBeInTheDocument()
})
