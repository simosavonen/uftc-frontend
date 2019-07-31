import { isTSAnyKeyword } from '@babel/types';

describe('Login app', function() {
  beforeEach(function() {
    /*cy.request({
      method: 'POST',
      url: 'http://localhost:4000/graphql',
      body: { query: 'mutation {reset}' },
      failsOnStatusCode: false
    }).then(res => cy.log(res)); */
    cy.visit('http://localhost:3000');
  });

  it('user can login', function() {
    //cy.contains('log in').click(); //?turha
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('random.person@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
  });
});
