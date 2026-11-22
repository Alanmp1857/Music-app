describe("<HomePage />", () => {
  beforeEach(() => {
    cy.visit("/listen-now");
  });

  it("should show popular playlists text", () => {
    cy.contains("Popular Playlists");
  });

  it("should show popular songs text", () => {
    cy.contains("Popular Songs");
  });

  it("should show trending albums text", () => {
    cy.contains("Trending Albums");
  });

  it("should contain song list", () => {
    cy.visit("/album/12411331");
    cy.contains("Song List");
  });
});
