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
      cy.contains('Admin tools').click();
      cy.wait(100);
      cy.contains('Activities').click();
    });

    it('add Kahvakuulanosto activity', function() {
      cy.wait(500);
      cy.get('#name').clear();
      cy.get('#name').type('Kahvakuulanosto');
      cy.wait(100);
      cy.get('#points').clear();
      cy.get('#points').type('3');
      cy.wait(100);
      cy.get('#type').clear();
      cy.get('#type').type('Lihaskuntoharjoitus');
      cy.wait(100);
      cy.get('#unit').clear();
      cy.get('#unit').type('5 nostoa');
      cy.wait(100);
      cy.get('#description').clear();
      cy.get('#description').type('Nosta kahvakuulaa maan tasolta hartioiden yläpuolelle');
      cy.wait(100);
      cy.get('#url').clear();
      cy.get('#url').type('http://fake.you.tube/123');
      cy.wait(100);
      cy.get('#icon').clear();
      cy.get('#icon').type('icon.svg');
      cy.wait(100);
      cy.contains('Add new activity').click();
      cy.wait(1000);
    });
  });
});
