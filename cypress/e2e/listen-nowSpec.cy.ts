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

  // it("should show trending artists text", () => {
  //   cy.get('[data-testid="listen-now-card"]').click({ multiple: true });
  //   cy.url({ timeout: 10000 }).should(
  //     "eq",
  //     "http://localhost:3000/album/12411331"
  //   );
  //   cy.contains("Song List");
  // });
});
