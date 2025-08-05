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
          cy.cadastrarProduto(token,produto, 470, "Mouse", 381).then((response) => {

        })
        .should((response) => {
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.status).to.equal(201)

        })
    });
    it('Deve validar mensagem de produto cadastrado anteriomente', () => {
        cy.cadastrarProduto(token, "Logitech MX Vertical", 470, "Mouse", 381).then((response) => {

        }).then((response) => {
            cy.wait(1000)
            expect(response.status).to.equal(400)
            expect(response.body.message).to.eq('Já existe produto com esse nome')
        

        })
    })
    it('Deve editar um produto com sucesso', () => {
        let produto = 'produto editado' + Math.floor(Math.random() * 10000000000)
          cy.cadastrarProduto(token,produto, 470, 'produto editado', 381)
            .then((response) => {
                let id = response.body._id
                cy.request({
            method: 'PUT',
            url: `produtos/${id}`,
            headers: {
                Authorization: token,
            },body: {
                'nome': produto ,
                'preco': 50,
                'descricao': "editado",
                'quantidade': 400
            }
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Registro alterado com sucesso')
            })


        }); 
    })
        
        it('Deve excluir um produto com sucesso', () => {
              cy.cadastrarProduto(token, 'produto a ser deletado', 470, 'deletado', 381)
            .then((response) => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: {
                        Authorization: token,
                    }
                    }).should((response) => {
                        expect(response.status).to.equal(200)
                        expect(response.body.message).to.equal('Registro excluído com sucesso')
                })
            })
    })
})
        
