describe('US1', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login as a receptionist and click "View Bookings" button', () => {
    const hexToRgb = (hex: string): string => {
      const rValue: number = parseInt(hex.substring(0, 2), 16);
      const gValue: number = parseInt(hex.substring(2, 4), 16);
      const bValue: number = parseInt(hex.substring(4), 16);
      return `rgb(${rValue}, ${gValue}, ${bValue})`;
    }
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Welcome to Dentist Booking').should('have.css', 'color',hexToRgb('be123c'))
  });

  it('Login as user and click “View Bookings” button', () => {
    const hexToRgb = (hex: string): string => {
      const rValue: number = parseInt(hex.substring(0, 2), 16);
      const gValue: number = parseInt(hex.substring(2, 4), 16);
      const bValue: number = parseInt(hex.substring(4), 16);
      return `rgb(${rValue}, ${gValue}, ${bValue})`;
    }
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Number12345@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Welcome to Dentist Booking').should('have.css', 'color',hexToRgb('155e75'))
  });

  it('Guess hasn’t logged in and click “View Bookings” button', () => {
    cy.contains('My Booking').click()
    expect('Sign in with Credentials').to.exist
  });
})