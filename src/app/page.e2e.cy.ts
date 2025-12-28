describe("Home Page", () => {
  it("should show the elements on the home", () => {
    cy.visit(Cypress.config("baseUrl") as string);

    cy.get('[data-cy="hero-title"]').contains("Master English Conversation");
    cy.get('[data-cy="hero-description"]').should("be.visible");
    cy.get('[data-cy="start-studying-btn"]').should("be.visible");
    cy.get('[data-cy="view-stats-btn"]').should("be.visible");
  });

  it("should navigate to study page when clicking Start Studying", () => {
    cy.visit(Cypress.config("baseUrl") as string);

    cy.get('[data-cy="start-studying-btn"]').click();
    cy.url().should("include", "/study");
  });

  it("should navigate to stats page when clicking View Stats", () => {
    cy.visit(Cypress.config("baseUrl") as string);

    cy.get('[data-cy="view-stats-btn"]').click();
    cy.url().should("include", "/stats");
  });
});
