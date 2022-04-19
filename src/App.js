import { useState } from "react";
import { wordList } from "./data";

function App() {
  const [passphrase, setPassphrase] = useState("");
  const [wordLength, setWordLength] = useState(12);
  const [showCopied, setShowCopied] = useState(false);

  const GeneratePassphrase = () => {
    const wordIndex = [];
    let tmpWordLength = parseInt(wordLength);

    if (isNaN(tmpWordLength)) {
      tmpWordLength = 12;
    } else if (tmpWordLength > wordList.length) {
      tmpWordLength = wordList.length;
    }

    setWordLength(tmpWordLength);

    while (wordIndex.length <= tmpWordLength) {
      const tmpIndex = Math.floor(Math.random() * wordList.length);

      if (wordIndex.includes(tmpIndex)) {
        continue;
      } else {
        wordIndex.push(tmpIndex);
      }
    }

    let tmpPassphrase = "";

    for (let ii = 0; ii < wordLength; ii++) {
      if (!tmpPassphrase) {
        tmpPassphrase = wordList[wordIndex[ii]];
      } else {
        tmpPassphrase = tmpPassphrase + " " + wordList[wordIndex[ii]];
      }
    }
    setPassphrase(tmpPassphrase);
  };

  const CopyToClipboard = () => {
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);

    setShowCopied(true);
    navigator.clipboard.writeText(passphrase);
  };

  const HandleChange = (e) => {
    const value = e.target.value;
    setWordLength(value);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Passphrase</h2>

        <form className="form">
          <p>
            Word length = &nbsp;
            <input
              type="number"
              id="wordLength"
              name="wordLength"
              placeholder={12}
              value={wordLength}
              onChange={HandleChange}
              style={{ width: "60px" }}
            />
          </p>
        </form>
        <button className="btn" onClick={GeneratePassphrase}>
          {passphrase.length ? "Regenerate" : "Generate"}
        </button>

        <p style={{ padding: "1em", paddingBottom: 0 }}>
          <code>{passphrase}</code>
        </p>

        {passphrase.length ? (
          <button className="btn" onClick={CopyToClipboard}>
            {showCopied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>
      <footer>
        Built and maintained by{" "}
        <a href="https://github.com/pranabdas/passphrase">Pranab Das</a>.
      </footer>
    </div>
  );
}

export default App;
