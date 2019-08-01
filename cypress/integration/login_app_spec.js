describe('Login app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('user can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('random.person@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
  });
});
