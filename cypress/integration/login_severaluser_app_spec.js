describe('UTFC login Users', function() {
  context('720p resolution', function() {
    before(function() {
      cy.viewport(1280, 720);
      cy.visit('http://localhost:3000');
    });
  });

  it('user random can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('random.person@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user sohlo can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('sohlo.saheltaja@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user hauska can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('hauska.hemmo@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user vakava can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('vakava.mielinen-murheilija@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user särmä can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('sarma.sarmaaja@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user vaaka can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('vaaka.taso@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });

  it('user nimeton can login', function() {
    cy.get('#Password').type('salasana');
    cy.get('#Email').type('nimeton.nimellinen@ambientia.fi');
    cy.contains('Log in').click();
    cy.contains('log out');
    cy.contains('log out').click();
  });
});
