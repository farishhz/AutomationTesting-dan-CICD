/**
 * Login E2E Test Scenario
 *
 * - Login flow
 *  - should display login page correctly
 *  - should display dashboard after login with correct credentials (can be tested if API allows)
 */

describe('Login Flow', () => {
  it('should display login page correctly', () => {
    cy.visit('/');
    cy.get('h2').contains('Welcome Back').should('be.visible');
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });
});
