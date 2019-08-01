describe('UFTC end-to-end tests', function() {
  before(function() {
    cy.request('GET', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('user can register', function() {
    cy.contains('create an account').click();
    cy.get('#Email').type('sarma.saataja@ambientia.fi');
    cy.get('#Password').type('salasana');
    cy.get('select').select('Hämeenlinna');
    cy.get('#Fullname').type('Särmä Säätäjä');
    cy.get('#Create').click();
    cy.contains('log out').click();
  });

  it('user can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('sarma.saataja@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
  });
});
