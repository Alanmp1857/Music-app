describe("<HomePage />", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/listen-now");
  });

  it("should show popular playlists text", () => {
    cy.contains("Popular Playlists");
  });

  it("should show trending songs text", () => {
    cy.contains("Trending Songs");
  });

  it("should show trending albums text", () => {
    cy.contains("Trending Albums");
  });

  it("should contain song list", () => {
    cy.visit("http://localhost:3000/album/12411331");
    cy.contains("Song List");
  });
});
