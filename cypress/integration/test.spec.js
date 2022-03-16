/// <reference types="cypress"/>

describe('Test the registration form', ()=>{
    it('Submit the form with invalid email', ()=>{
        cy.visit("../App/index.html");
        cy.get("#email").type("ashrafvali");
        cy.get("#submit").click();

        cy.get("#emailErrorMessage").should("have.text", "Invalid email address");
    })

    it('Submit the form without filling the days for availibility', ()=>{
        cy.visit("../App/index.html");
        cy.get("#submit").click();

        cy.get("#availDaysErrorMessage").should("have.text", "The Days for Availability not in a numeric format");
    })
})