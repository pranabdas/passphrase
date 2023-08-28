describe("Change passphrase length", () => {
  it("input passphrase length and check word length", () => {
    cy.visit("http://localhost:3000");

    const wordLength = 15;

    cy.get('[data-cy="input-word-length"]').clear();
    cy.get('[data-cy="input-word-length"]').type(wordLength.toString());
    cy.get('[data-cy="generate-button"]').click();

    cy.get('[data-cy="passphrase"]')
      .invoke("text")
      .then((text) => {
        const passphraseLength = text.split(" ").filter((x) => x).length;
        expect(passphraseLength).to.equal(wordLength);
      });
  });
});
