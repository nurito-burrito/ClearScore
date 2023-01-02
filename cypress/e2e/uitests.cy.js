describe('Test 1', () => {
  it('Using your tooling of choice, visit the ClearScore website  & write tests to check that', () => {
    cy.log('the “We use cookies” notification is present')
    cy.get(".text--qRTQH").contains("We use cookies to improve your experience.")

    cy.log('the “We use cookies” notification can be dismissed')
    // cy.get("[data-qa='text']").contains("No problem").click()
    cy.clickButton('No problem')

    cy.log('the “We use cookies” notification does not reappear  after being dismissed')
    cy.get(".text--qRTQH").should('not.exist')

    cy.log('the appropriate cookie(s) are set')
    cy.getCookie('CS_ACCEPT_COOKIES').should('have.property', 'value', 'true')
  })
})

describe('Test 3', () => {
  it('Using your FE framework from Test 1, provide tests to  address the following acceptance criteria', () => {
    cy.setCookie('CS_ACCEPT_COOKIES', 'true')

    cy.log('Assert an email address is required to sign up')
    cy.get('#email').type('abc')
    // cy.get("[type='submit']").click()
    cy.clickButton('Get your score')
    cy.get('input:invalid').should('have.length', 1)
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("Please include an '@' in the email address.")
    })

    cy.log('Assert a valid email address must be provided to sign up')
    cy.get('#email').type('abc@.')
    // cy.get("[type='submit']").click()
    cy.clickButton('Get your score')
    cy.get('input:invalid').should('have.length', 1)
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("'.' is used at a wrong position in '.'.")
    })

    cy.log('Assert when a valid email address is provided, and Sign up is  clicked, the user is taken to step 1 of registration')
    cy.get('#email').clear()
    cy.get('#email').type('testemailthattakesyoutoregistrationscreen@email.com')
    // cy.get("[type='submit']").click()
    cy.clickButton('Get your score')
    cy.url().should('contain', 'step1')
    cy.title().should('eq', 'ClearScore')
  })
})