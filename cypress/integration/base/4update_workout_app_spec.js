describe('update workout', function() {
  context('720p resolution', function() {
    before(function() {
      cy.viewport(1280, 720);
      cy.visit('http://localhost:3000');
    });
    it('it random login', function() {
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.wait(500);
      cy.contains('Log in').click();
    });

    it('random update workout', function() {
      cy.wait(500);
      cy.contains('activities').click();
      cy.contains('most recent activities');
      cy.wait(500);
      cy.contains('Pushup - punnerus').click({ force: true });
      cy.contains('Show workout history').click();
      cy.get('#editbtn')
        .first()
        .click();
      cy.wait(400);
      cy.get('#updworplus').click();
      cy.get('#updworsave').click();
      //cy.contains('Save changes').click();
      cy.get('#updworback').click();
     // cy.contains('Go back').click();
    });
  });
});
