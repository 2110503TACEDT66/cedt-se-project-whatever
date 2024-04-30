describe('US5', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Select date and time in the past', () => {
      cy.contains('My Booking').click()
      cy.get('input[name="email"]').type('Number12345@gmail.com')
      cy.get('input[name="password"]').type('12345678')
      cy.contains('Sign in with Credentials').click()
      cy.contains('Add new booking').click()
      cy.get('#Bdate').click()
      cy.contains('01').click()
      cy.contains('OK').click()
      cy.contains('Simon Salmon').should('not.exist');
    });

    it('Select date and time in the future', () => {
        cy.contains('My Booking').click()
        cy.get('input[name="email"]').type('Number12345@gmail.com')
        cy.get('input[name="password"]').type('12345678')
        cy.contains('Sign in with Credentials').click()
        cy.contains('Add new booking').click()
        cy.get('#Bdate').click()
        cy.contains('29').click()
        cy.contains('OK').click()
        expect('Simon Salmon').to.exist
    });
})