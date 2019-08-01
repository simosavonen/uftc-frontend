describe('Login app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.contains('create an account').click();
    cy.get('#Email').type('särmä.säätäjä@ambientia.fi');
    cy.get('#Password').type('salasana');
    cy.get('select').select('Tampere');
    cy.get('#Fullname').type('Särmä Säätäjä');

    cy.contains('Create an account').click();
    //cy.get('#Create').click()
    cy.visit('http://localhost:3000');
  });

  it('user can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('särmä.säätäjä@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
  });
});
