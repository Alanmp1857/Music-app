// Header.spec.tsx

/// <reference types="cypress" />
import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

// Mock Auth0Provider for testing authentication

describe("Header Component Tests", () => {
  beforeEach(() => {
    mount(
      <MemoryRouter>
        {/* Other components that might interact with React Router */}
        <Header />
      </MemoryRouter>
    );
  });
  it("renders without crashing", () => {
    // Add assertions based on your component structure
  });

  it("checking search bar", () => {
    // Adjust the viewport width and height with actual values
    cy.viewport(1600, 900);
    cy.get('[data-testid="search-input"]').should("be.visible");
    // Now, you can interact with the search input
    cy.get('[data-testid="search-input"]').should("be.visible");
    cy.viewport(500, 500);
    cy.get('[data-testid="search-input"]').should("not.be.visible");
  });

  it("displays the logo", () => {
    cy.get('[data-testid="mus-icon"]').should("be.visible");
  });

  it("should have Get Music Premium button", () => {
    cy.viewport(1600, 900)
      .get('[data-testid="music-premium"]')
      .should("be.visible");
  });
});
