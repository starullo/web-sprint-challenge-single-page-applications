describe('Sams Pizza Page', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    const link = () => cy.get('a')
    const name = () => cy.get('input[name=name]');
    const red = () => cy.get('input[value=red]');
    const dropdown = () => cy.get('select');
    const pepperoni = () => cy.get('input[name=pepperoni]');
    const sausage = () => cy.get('input[name=sausage]');
    const button = () => cy.get('button');

    it('testing', ()=>{
        link().click()
        name().type('wow').should('have.value', 'wow')
        dropdown().select('small')
        red().check()
        pepperoni().check()
        sausage().check()
        button().click()
    })
} )