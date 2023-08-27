describe("Default passphrase", () => {
  it("checks default passphrase has default word length", () => {
    cy.visit("http://localhost:3000");

    let inputWordLength = 0;
    cy.get('[data-cy="input-word-length"]')
      .invoke("text")
      .then((text) => {
        inputWordLength = parseInt(text);
      });

    cy.get('[data-cy="generate-button"]').click();

    let passphraseLength = 0;
    cy.get('[data-cy="passphrase"]')
      .invoke("text")
      .then((text) => {
        passphraseLength = text.split(" ").length;
      });

    assert(inputWordLength === passphraseLength);
  });
});
