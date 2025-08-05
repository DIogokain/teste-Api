///<reference types="cypress" />

describe('teste de API-Produtos', () => {
    let token
    beforeEach(() => {
        cy.token("fulano@qa.com", "teste").then(tkn => {
            token = tkn
            
        })
    })
    

     it('Deve listar os produtos', () => {
      cy.request({
        method: 'GET',
        url: 'produtos'
      }).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('produtos')
      })
      
     })
     it('Deve cadastrar um produto', () => {
        let produto = 'produto' + Math.floor(Math.random() * 10000000000)
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
                Authorization: token},
            body: {
            
                 "nome": produto,
                   "preco": 470,
                    "descricao": "Mouse",
                       "quantidade": 381
             
            }
    }).should((response) => {
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        expect(response.status).to.equal(201)

})
});
     it('Deve validar mensagem de produto cadastrado anteriomente', () => {  
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
                Authorization: token},
            body: {
            
                 "nome": 'Logitech MX Vertical',
                   "preco": 470,
                    "descricao": "Mouse",
                       "quantidade": 381
             
            }, failOnStatusCode: false
    }).should((response) => {
        expect(response.body.message).to.equal('Já existe produto com esse nome')
        expect(response.status).to.equal(400)
        
})})})