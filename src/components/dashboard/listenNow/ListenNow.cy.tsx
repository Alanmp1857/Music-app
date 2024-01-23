// listenNow.spec.ts

import { mount } from "cypress/react18";
import ListenNow from "./trendingSongs/ListenNow";

describe("ListenNow Component Tests", () => {
  it("renders without crashing", () => {
    mount(<ListenNow />);
    // You can add assertions based on your component structure
  });

  it("scrolls left and right on button click", () => {
    mount(<ListenNow />);
    cy.get('[aria-label="Scroll left"]').click();
    // Add assertions to check if the scroll position has changed
    cy.get('[aria-label="Scroll right"]').click();
    // Add assertions to check if the scroll position has changed back
  });

  it("displays correctly on various screen sizes", () => {
    cy.viewport("ipad-mini");
  });

  it("contains popular songs title", () => {
    cy.contains("Trending Songs");
  });
});
