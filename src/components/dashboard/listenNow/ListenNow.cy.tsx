// listenNow.spec.ts

import { mount } from "cypress/react";
import ListenNow from "./trendingSongs/ListenNow";
import { MusicPlayerProvider } from "../../../contexts/MusicPlayerContext";

const mountListenNow = () =>
  mount(
    <MusicPlayerProvider>
      <ListenNow />
    </MusicPlayerProvider>
  );

describe("ListenNow Component Tests", () => {
  it("renders without crashing", () => {
    mountListenNow();
    // You can add assertions based on your component structure
  });

  it("scrolls left and right on button click", () => {
    mountListenNow();
    cy.get('[aria-label="Scroll left"]').click();
    // Add assertions to check if the scroll position has changed
    cy.get('[aria-label="Scroll right"]').click();
    // Add assertions to check if the scroll position has changed back
  });

  it("displays correctly on various screen sizes", () => {
    cy.viewport("ipad-mini");
  });

  it("contains popular songs title", () => {
    mountListenNow();
    cy.contains("Popular Songs");
  });
});
