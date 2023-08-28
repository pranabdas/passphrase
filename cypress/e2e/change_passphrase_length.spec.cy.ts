describe("Change passphrase length", () => {
  it("input passphrase length and check word length", () => {
    cy.visit("/");

    const wordLength = 15;

    cy.get('[data-cy="input-word-length"]').as("inputWordLength");

    cy.get("@inputWordLength").clear();
    cy.get("@inputWordLength").type(wordLength.toString());
    cy.get('[data-cy="generate-button"]').click();

    cy.get('[data-cy="passphrase"]')
      .invoke("text")
      .then((text) => {
        const passphraseLength = text.split(" ").filter((x) => x).length;
        expect(passphraseLength).to.equal(wordLength);
      });
  });
});
