describe('Test 2', () => {

  it('Failed login attempt API test', () => {
      cy.request({
          method: 'POST',
          url: 'https://app.clearscore.com/api/global/login-service/v3/authorise',
          body: {
              agent_id: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
              anonymous_id: '8c8b9810-1bd8-4821-b424-c9410294611f',
              client_id: 'cs-webapp',
              client_type: 'internal',
              device_id: 'addffa1f8e58ef1c3ce16f4612d1226',
              device_name: 'Android Chrome',
              device_type: 'android',
              email: 'abdfsfsdff4533j@abc.com',
              password: '1233435',
              response_type: 'code'
          },
          failOnStatusCode: false
      }).should(response => {
          expect(response.status).to.eq(400)
          expect(response.body.allRequestResponses[0]["Response Body"]).to.eq({"error":"access_denied"})
      })
  })

// I've made too many attemps and ClearScore servers blocked my IP for 24 hours so I've added a skip flag
  it.skip('Failed login attempt API test with UI', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://app.clearscore.com/api/global/login-service/v3/authorise',
  }).as('loginAttempt')

    cy.visit('https://app.clearscore.com/login')

    cy.get('#email').type('test@email.com')
    cy.get('#password').type('1')
    cy.get("[data-id='submit']").contains("Log in").click()

    cy
      .wait('@loginAttempt')
      .then(failedLoginAttempt => {
      expect(failedLoginAttempt.response.statusCode).to.eq(400)
      // These should in theory work if I can get 400 response from server without mocking the response
      expect(response.body.allRequestResponses[0]["Response Body"]).contains({"error":"access_denied"})
    })
  })
})