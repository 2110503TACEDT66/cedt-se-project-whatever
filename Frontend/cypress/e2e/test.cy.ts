describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should have a title', () => {
    cy.get('#BookNow').click()
  });
})