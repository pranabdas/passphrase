import { useState } from "react";
import { KBWordList } from "./wordlist_keybase";
import { EFFLongWordList } from "./wordlist_eff";

const combinedList = new Set([...KBWordList, ...EFFLongWordList]);
const wordList = Array.from(combinedList);

function App() {
  const [passphrase, setPassphrase] = useState("");
  const [wordLength, setWordLength] = useState(12);
  const [showCopied, setShowCopied] = useState(false);

  const GeneratePassphrase = () => {
    const wordIndex: Array<number> = [];
    let tmpWordLength = wordLength;

    if (isNaN(tmpWordLength) || tmpWordLength < 0) {
      tmpWordLength = 12;
    } else if (tmpWordLength > 99) {
      tmpWordLength = 99;
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

    for (let ii = 0; ii < tmpWordLength; ii++) {
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

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWordLength(parseInt(value));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Passphrase</h2>

        <form className="form">
          <p>
            Passphrase length = &nbsp;
            <input
              type="number"
              id="wordLength"
              name="wordLength"
              placeholder={"12"}
              value={wordLength}
              onChange={HandleChange}
              style={{ width: "60px" }}
            />
          </p>
        </form>
        <button className="btn" onClick={GeneratePassphrase}>
          {passphrase.length ? "Regenerate" : "Generate"}
        </button>

        {passphrase && (
          <p
            style={{
              padding: "1em",
              margin: "0.5em",
              marginTop: "1em",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "lightgrey",
              backgroundColor: "rgba(10, 0, 0, 0.03)",
            }}
          >
            <code>{passphrase}</code>
          </p>
        )}

        {passphrase.length > 0 && (
          <button className="btn" onClick={CopyToClipboard}>
            {showCopied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <footer>
        Built and maintained by{" "}
        <a href="https://github.com/pranabdas/passphrase">Pranab Das</a>.
      </footer>
    </div>
  );
}

export default App;
