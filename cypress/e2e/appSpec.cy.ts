import React from "react";
import HomePage from "../../src/components/dashboard/HomePage";
import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router";

describe("<HomePage />", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should render the input search field", () => {
    cy.get('[data-testid="search-input"]').should("exist");
  });

  it("should have the listen now option", () => {
    cy.get('[data-testid="listen-now"]').should("exist");
  });

  it("should have the browse option", () => {
    cy.get('[data-testid="browse"]').should("exist");
  });

  it("should have the library option", () => {
    cy.get('[data-testid="library"]').should("exist");
  });
});
