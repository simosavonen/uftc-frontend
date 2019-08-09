describe('Login app', function() {
  context('720p resolution', function() {
    beforeEach(function() {
      cy.viewport(1280, 720);
      cy.request('GET', 'http://localhost:3001/api/testing/reset');
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
