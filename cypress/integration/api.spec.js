describe('Todo API test cases', ()=>{
    
    it('Add a new Todo', ()=>{
        cy.request('post', 'http://todo-app-barkend.herokuapp.com/todos', {"todo": "New Task"}).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('todo');
            expect(response.body).to.have.property('_id');   
            expect(response.body).to.have.property('completed', false);
        })
    })

    it('Add a new Todo and verify in the list', ()=>{
        var todoName = "New todo"+(new Date()).getTime();
        cy.request('post', 'http://todo-app-barkend.herokuapp.com/todos', {"todo": todoName}).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('todo', todoName);
            expect(response.body).to.have.property('_id');   
            expect(response.body).to.have.property('completed', false);
            var createdTodoId = response.body["_id"];
            cy.request('get', 'http://todo-app-barkend.herokuapp.com/todos').then((response) =>{
                expect(response.status).to.eq(200);
                expect(response.body).not.be.empty;
                cy.wrap(response.body).should('deep.include', {"todo": todoName, "_id": createdTodoId, "completed": false});
            })
        })
    })
})