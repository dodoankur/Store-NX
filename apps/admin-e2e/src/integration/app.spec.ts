// import { getHeader } from "../support/app.po"

describe("admin", () => {
  beforeEach(() => cy.visit("/admin"))

  it("should display header", () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login("my-email@something.com", "myPassword")

    // Function helper example, see `../support/app.po.ts` file
    // getHeader().contains("Dashboard")

    cy.contains("Dashboard")
    cy.contains("Orders")
    cy.contains("Sales")

    cy.visit("/admin/products")
    cy.contains("Products")
    cy.contains("Clothing")
    cy.contains("Product A")

    cy.visit("/admin/orders")
    cy.contains("Orders")
    cy.contains("1000")
    cy.contains("All Statuses")

    cy.visit("/admin/customers")
    cy.contains("Customers")
    cy.contains("Himadu")
    cy.contains("All Customers")
  })
})
