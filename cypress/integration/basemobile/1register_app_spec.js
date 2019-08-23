describe('Login app', function() {
  before(function() {
    cy.request('GET', 'http://localhost:3001/api/testing/reset');
  });
  context('iphone-4 resolution', function() {
    before(function() {
      cy.viewport('iphone-4'); //320,480
      cy.visit('http://localhost:3000/login/ambientia');
      cy.contains('create an account').click();
      cy.wait(1000);
    
      cy.get('#Email').type('sarma.saataja@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Tampere');
      cy.get('#Fullname').type('Särmä Säätäjä');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
        cy.get('#navmenu').click();
      cy.contains('log out').click();
      cy.wait(50);  
      cy.visit('http://localhost:3000');
    });

    it('user can login', function() {
      cy.viewport('iphone-4');
      cy.wait(300);
      cy.get('#Password').type('salasana');
      cy.get('#Email').type('särmä.säätäjä@ambientia.fi');
      cy.wait(50);
      cy.contains('Log in').click();
      cy.wait(800);
      cy.get('#navmenu').click();
     // cy.get('#navMenu');
      cy.wait(100);
      cy.contains('log out').click();
    });
  });
});
