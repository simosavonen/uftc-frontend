describe('Add workout random', function() {
  context('720p resolution', function() {
    before(function() {
      cy.viewport(1280, 720);
      cy.visit('http://localhost:3000');
    });

    it('random log in', function() {
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.wait(500);
      cy.contains('Log in').click();
    });

    it('random add workout', function() {
      cy.wait(800);
      cy.contains('activities').click();
      cy.wait(100);
      cy.contains('Lihaskuntoharjoitus', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(1000);
      cy.contains('Pushup - punnerus').click({ force: true }); //cypress näyttä kooksi 0x0
      cy.wait(300);
      //cy.contains('+').click();
      cy.get('#plus').click();
      cy.wait(100);
      cy.contains('Save a workout').click();
      cy.wait(1000);
      cy.contains('Go back').click();
      cy.wait(300);
      cy.contains('Your 1 most recent activities');
      cy.wait(1000);
    });
  });
});
