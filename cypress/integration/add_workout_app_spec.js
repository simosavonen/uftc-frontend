describe('Add workout random',function() {
    context('720p resolution',function() {
        before(function(){
            cy.viewport(1280,720);
            cy.visit('http://localhost:3000');
        });         
      
        it('random log in',function() {
            cy.get('#Email').type('random.person@ambientia.fi');
            cy.get('#Password').type('salasana');
            cy.contains('Log in').click();
            //cy.contains('log out');
            //cy.contains('log out').click();
        })

        
    });
});