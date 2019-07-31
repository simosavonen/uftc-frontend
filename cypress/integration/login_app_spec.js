describe('Login app', function() {
  before(function() {
    /*cy.request({
      method: 'GET',
      url: 'http://localhost:3001/api/reset',
      failsOnStatusCode: false
    }).then(res => cy.log(res)); */
    cy.visit('http://localhost:3000');
  });

  it('user can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('random.person@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
  });
});
