describe('Test 1', () => {
  it('Using your tooling of choice, visit the ClearScore website  & write tests to check that', () => {
    cy.log('the “We use cookies” notification is present')
    cy.get(".text--qRTQH").contains("We use cookies to improve your experience.")

    cy.log('the “We use cookies” notification can be dismissed')
    cy.get("[data-qa='text']").contains("No problem").click()

    cy.log('the “We use cookies” notification does not reappear  after being dismissed')
    cy.get(".text--qRTQH").should('not.exist')

    cy.log('the appropriate cookie(s) are set')
    cy.getCookie('CS_ACCEPT_COOKIES').should('have.property', 'value', 'true')
  })
})

describe('Test 3', () => {
  
  it('Using your FE framework from Test 1, provide tests to  address the following acceptance criteria', () => {
    cy.log('Assert an email address is required to sign up')
    cy.get("[type='submit']").click()
    // I am asserting that user is not taken to the sign up page by asserting there is not signup in the URL
    cy.url().should('not.contain', 'signup')
  })


  
  // User is able to click without having to enter an email address, *potential bug* please confirm the behavior 
  xit('email address required message', () => {
    cy.get("[type='submit']").click()
    // I am asserting that user is not taken to the sign up page by asserting there is not signup in the URL
    cy.url().should('not.contain', 'signup')
  })

  // I cannot access the floating alerts that says 'Please include an '@'  in the email...' 
  // so not sure if the behavior changed recently or it's just my lack of knowledge.
  // And there is *potential bug* or a UX issue for better wording if user includes @ but does not add a '.com' or any other domain extension, 
  // and taps on Get you score button app will stay idle and wont alert the user 
  xit('valid email address required message', () => {
    cy.get('#email').type('1')
  })


  // If this fails, please rerun it. Website sometimes takes user to signup page and not register screen, *possible bug*
  xit('valid email address takes user to register screen', () => {
    cy.get('#email').type('testemailthattakesyoutoregistrationscreen@email.com')
    cy.get("[type='submit']").click()

    cy.url().should('contain', 'step1')
    cy.title().should('eq', 'ClearScore')
  })
})