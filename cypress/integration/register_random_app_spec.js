import { isContext } from 'vm';

describe('Login app', function() {
  context('720p resolution', function() {
    beforeEach(function() {
      cy.viewport(1280, 720);
      cy.request('POST', 'http://localhost:3001/api/testing/reset');
      cy.visit('http://localhost:3000');
      cy.contains('create an account').click();
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Hämeenlinna');
      cy.get('#Fullname').type('Random Person');

      //cy.contains('Create an account').click();
      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.visit('http://localhost:3000');
    });
    /*
    it('displays full header', function() {
      cy.get('nav .desktop-menu').should('be.visible');
      cy.get('nav .mobile-menu').should('not.be.visible');
    });
*/
    it('user can login', function() {
      cy.get('#Password').type('salasana');
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.contains('Log in').click();
      cy.contains('log out');
      cy.contains('log out').click();
    });
  });
});
