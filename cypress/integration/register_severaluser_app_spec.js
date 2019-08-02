describe('UTFC Create Users', function() {
  context('720p resolution', function() {
    before(function() {
      cy.viewport(1280, 720);
      cy.request('GET', 'http://localhost:3001/api/testing/reset');
      cy.visit('http://localhost:3000');
    });

    it('create user paha', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('paha.vastustaja@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Turku');
      cy.get('#Fullname').type('Paha Vastustaja');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user sohlo', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('sohlo.saheltaja@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Helsinki');
      cy.get('#Fullname').type('Sohlo Säheltäjä');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user hauska', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('hauska.hemmo@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Joensuu');
      cy.get('#Fullname').type('Hauska Hemmå');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user vakava', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('vakava.mielinen-murheilija@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Tampere');
      cy.get('#Fullname').type('Vakava Mielinen-Murheilija');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user sarma', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('sarma.sarmaaja@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Turku');
      cy.get('#Fullname').type('Särmä Särmääjä');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user vaaka', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('vaaka.taso@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Tallinn');
      cy.get('#Fullname').type('Vaaka Taso');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });

    it('create user nimeton', function() {
      cy.contains('create an account').click();
      cy.get('#Email').type('nimeton.nimellinen@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.get('select').select('Tartu');
      cy.get('#Fullname').type('nimeton');

      cy.get('#Create', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Create an account')
        .click();
      cy.contains('log out').click();
    });    
  });
});
