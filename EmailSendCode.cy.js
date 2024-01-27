import Mailosaur from 'mailosaur';
const serverID = "2d5vmkwc"
const emailDomain = "@2d5vmkwc.mailosaur.net"
let emailAddress

describe("Retrieving email token", ()=>{
   
    it("Fill the sign up page ", ()=>{

        cy.visit("/")       //This reprents the url which can be found on the cypress config file
        const randomString = new Date().getTime() // This give a time stamp of when the email was created 
        emailAddress = `${randomString}${emailDomain}` //Generates a random email address and attach teh email domain
        
        cy.get('[href="/signup"]').should("be.visible").click()
        cy.get("#firstName").should("be.visible").type("Morgan")
        cy.get("#lastName").type("Musa")
        cy.get("#email").type(emailAddress)
        cy.get('button[type="submit"]').click()

    })
 
    it("Retrive the link in the mail and visit the link", ()=>{
        cy.mailosaurGetMessage(serverID, {sentTo: emailAddress})
        .then((email)=>{
            expect(email.subject).to.equal("Welcome to ACME Product")
            let confirmSignupLink = email.html.links[0].href  // Extract the confirmation/signup link from the email HTML
            cy.visit(confirmSignupLink) // Visit the extracted link using Cypress

        })

    })
})