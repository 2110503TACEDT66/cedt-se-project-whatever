describe('US5', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Select date and time in the past', () => {
      const hexToRgb = (hex: string): string => {
        const rValue: number = parseInt(hex.substring(0, 2), 16);
        const gValue: number = parseInt(hex.substring(2, 4), 16);
        const bValue: number = parseInt(hex.substring(4), 16);
        return `rgb(${rValue}, ${gValue}, ${bValue})`;
      }
      cy.contains('My Booking').click()
      cy.get('input[name="email"]').type('earn@gmail.com')
      cy.get('input[name="password"]').type('12345678')
      cy.contains('Sign in with Credentials').click()
      cy.contains('Add new booking').click()
      cy.get('#Bdate').click()
      cy.contains('04')
      .should('exist').should('have.css', 'color', `rgba(0, 0, 0, 0.87)`)
    });

    it('Select date and time in the future', () => {
        cy.contains('My Booking').click()
        cy.get('input[name="email"]').type('earn@gmail.com')
        cy.get('input[name="password"]').type('12345678')
        cy.contains('Sign in with Credentials').click()
        cy.contains('Add new booking').click()
        cy.get('#Bdate').click()
        cy.contains('29').click()
        cy.contains('OK').click()
        expect('Simon Salmon').to.exist
    });
})