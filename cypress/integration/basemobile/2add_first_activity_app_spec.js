describe('add activity', function() {
  context('iphone-4 resolution', function() {
    before(function() {
      cy.viewport('iphone-4');
      cy.visit('http://localhost:3000');
    });

    it('random login ', function() {
      cy.get('#Email').type('random.person@ambientia.fi');
      cy.get('#Password').type('salasana');
      cy.wait(500);
      cy.contains('Log in').click();
    });

    it('go to add activitypage', function() {
      cy.wait(200);
      cy.contains('add activity').click();
    });

    it('add pushup activity', function() {
      cy.wait(500);
      cy.get('#name').clear();
      cy.get('#name').type('Pushup - punnerus');
      cy.wait(100);
      cy.get('#points').clear();
      cy.get('#points').type('4');
      cy.wait(100);
      cy.get('#type').clear();
      cy.get('#type').type('Lihaskuntoharjoitus');
      cy.wait(100);
      cy.get('#unit').clear();
      cy.get('#unit').type('10 pushups');
      cy.wait(100);
      cy.get('#description').clear();
      cy.get('#description').type('Punnerra jalat suorana');
      cy.wait(100);
      cy.get('#icon').clear();
      cy.get('#icon').type('icon.svg');
      cy.wait(100);
      cy.contains('Add new activity').click();
      cy.wait(1000);
    });
  });
});
