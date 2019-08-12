describe('update workout', function() {
  context('iphone-4 resolution', function() {
    before(function() {
      cy.viewport('iphone-4');
      cy.visit('http://localhost:3000');
    });
    it('it random login', function() {
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.wait(500);
      cy.contains('Log in').click();
    });

    it('random update workout', function() {
      cy.viewport('iphone-4');
      cy.wait(500);
      cy.get('#navmenu').click();
      cy.wait(100);
      cy.contains('activities').click();
      cy.contains('most recent activities');
      cy.wait(500);
      cy.contains('Pushup - punnerus').click({ force: true });
      cy.contains('Your history').click();
      cy.get('#showactivities')
        .first()
        .click();
      cy.wait(400);
      cy.get('#updworplus').click();
      cy.get('#updworsave').click();
      cy.get('#updworback').click();
    });
  });
});
