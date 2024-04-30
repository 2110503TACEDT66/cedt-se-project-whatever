describe('US2AND3', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login as receptionist and click "Bookings" button', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Bookings').click()
    expect(cy.get('#Recepbookingdiv')).to.exist
  });

  it('Login as receptionist and click “Cancel Booking”', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Bookings').click()
    cy.contains('Cancel Booking').click()
    expect(cy.contains('Request Cancelation')).to.exist
  });

  it('Login as user and click “Cancel Booking”', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Number12345@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('My Booking').click()
    expect(cy.get('#Userbookingdiv')).to.exist
  });

  it('As a receptionist, click the request cancellation button', () => {
    cy.contains('My Booking').click()
    cy.get('input[name="email"]').type('Rec4@gmail.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Sign in with Credentials').click()
    cy.contains('Bookings').click()
    cy.contains('Cancel Booking').click()
    cy.contains('Request Cancelation').click()
    cy.contains('OK').click()
    expect(cy.contains('Welcome to Dentist Booking')).to.exist
  });
})