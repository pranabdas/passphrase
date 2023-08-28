describe("Default passphrase", () => {
  it("checks default passphrase has default word length", () => {
    cy.visit("/");

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
        passphraseLength = text.split(" ").filter((x) => x).length;
      });

    assert(inputWordLength === passphraseLength);
  });
});
