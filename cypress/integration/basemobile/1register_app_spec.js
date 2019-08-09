describe('Login app', function() {
  before(function() {
    cy.request('GET', 'http://localhost:3001/api/testing/reset');
  });
  context('iphone-4 resolution', function() {
    before(function() {
      cy.viewport('iphone-4'); //320,480
      cy.visit('http://localhost:3000');
      cy.contains('create an account').click();
      cy.get('#Email').type('särmä.säätäjä@ambientia.fi');

      cy.get('#Password').type('salasana');
      cy.get('select').select('Tampere');
      cy.get('#Fullname').type('Särmä Säätäjä');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.visit('http://localhost:3000');
    });

    it('user can login', function() {
      cy.get('#Password').type('salasana');
      cy.get('#Email').type('särmä.säätäjä@ambientia.fi');
      cy.contains('Log in').click();
      cy.contains('log out');
      cy.contains('log out').click();
    });
  });
});
