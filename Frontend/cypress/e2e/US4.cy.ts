describe('US4', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login as User and sort the dentist’s list by area of expertise', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Number12345@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Add new booking').click()
    cy.get('#Bdate').click()
    cy.contains('29').click()
    cy.contains('OK').click()
    cy.get('#expertise').parent().click().get('ul > li[data-value="Orthodontics"]').click()
    expect('Simon Salmon').to.exist
  });

  it('Login as User and sort the dentist’s list by dentist experience', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Number12345@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Add new booking').click()
    cy.get('#Bdate').click()
    cy.contains('29').click()
    cy.contains('OK').click()
    expect('Simon Salmon').to.exist
    cy.get('#Sortexp').type("3")
    cy.contains('Available Dentists').click()
    cy.contains('Simon Salmon').should('not.exist');
  });

  it('Login as Receptionist and sort the dentists list by area of expertise', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.visit('/dentists');
    cy.contains('Available Dentists').should('not.exist');
  });

  it('Login as Receptionist and sort the dentists list by dentists experience', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.visit('/dentists');
    cy.contains('Available Dentists').should('not.exist');
  });

  it('Guess is not login and sort the dentists list by area of expertise', () => {
    cy.contains('My Booking').click()
    cy.contains('Simon Salmon').should('not.exist');
  });

  it('Guess is not login and sort the dentists list by dentists experience', () => {
    cy.contains('My Booking').click()
    cy.contains('Simon Salmon').should('not.exist');
  });
})