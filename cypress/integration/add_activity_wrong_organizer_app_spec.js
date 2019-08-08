describe('add activity', function() {
  context('720p resolution', function() {
    before(function() {
      cy.viewport(1200, 720);
      cy.visit('http://localhost:3000');
    });

    it('sarma login wrong organizer', function() {
      cy.get('#Email').type('särmä.säätäjä@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.contains('Log in').click();
    });

    it('go to add activitypage', function() {
      cy.contains('add activity').click();
    });

    it('add pushup activity', function() {
      cy.get('#name').clear();
      cy.get('#name').type('Pushup - punnerus');
      cy.get('#points').clear();
      cy.get('#points').type('4');
      cy.get('#type').clear();
      cy.get('#type').type('Lihaskuntoharjoitus');
      cy.get('#unit').clear();
      cy.get('#unit').type('10 pushups');
      cy.get('#description').clear();
      cy.get('#description').type('Punnerra jalat suorana');
      //cy.get('#url').clear();
      //cy.get('#url').type('');
      cy.get('#icon').clear();
      cy.get('#icon').type('icon.svg');
      cy.contains('Add new activity').click();
    });

    it('check result', function() {
      cy.contains('Log in');
    });
  });
});
