import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

function TypingBox() {
  const { testTime } = useTestMode();
  // Typingbox States
  const [wordsArray, setWordsArray] = useState(() => generate(50));
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  // WPM Calc States
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  // Timer States
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Graph State
  const [graphData, setGraphData] = useState([]);

  const inputRef = useRef(null);
  // createRef can be used inside a callback unlike useRef hook that's only available inside the render logic(comp's top level)
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  function focusInput() {
    inputRef.current.focus();
  }

  function handleUserInput(e) {
    //Initiate the timer
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurChars = wordsSpanRef[currWordIndex].current.childNodes;
    // Space key logic
    if (e.keyCode === 32) {
      let correctCharsInWord =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");

      if (correctCharsInWord.length === allCurChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurChars.length <= currCharIndex) {
        // Remove cursor from last place in a word
        allCurChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        // Remove cursor from in between a word
        setMissedChars(missedChars + (allCurChars.length - currCharIndex));
        allCurChars[currCharIndex].classList.remove("current");
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrWordIndex((word) => word + 1);
      setCurrCharIndex(0);
      return;
    }
    // Backspace logic
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allCurChars.length) {
          if (allCurChars[currCharIndex - 1].className.includes("extra")) {
            allCurChars[currCharIndex - 1].remove();
            allCurChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurChars[currCharIndex].className = "";
        allCurChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    // Every time we add onto the current word the allCurChar arr updates due to addition of more children and this condition runs again
    // Runs only when we're at the last index of the current word
    if (currCharIndex === allCurChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    // If span character matches the value we get from user input then we add classes
    if (e.key === allCurChars[currCharIndex].innerText) {
      allCurChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allCurChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }
    //Checks if we are on the last index of the word and adjusts cursor position
    if (currCharIndex + 1 === allCurChars.length) {
      allCurChars[currCharIndex].className += " current-right";
    } else allCurChars[currCharIndex + 1].className = "current";

    setCurrCharIndex((char) => char + 1);
  }

  // UpperMenu's timer funtionality
  function startTimer() {
    function timer() {
      setCountDown((count) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - count + 1,
                correctChars / 5 / ((testTime - count + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });

        if (count === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return count - 1;
      });
    }
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
  }

  // Calculate data to display acc to test results
  function calculateWPM() {
    return Math.round(correctChars / 5 / (testTime / 60));
  }

  function calculateAcc() {
    if (!correctWords) return 0;
    return Math.round((correctWords / currWordIndex) * 100);
  }

  // Reset the classes of each child element of wordsSpan array
  function resetWordSpanRefClassname() {
    wordsSpanRef.map((word) =>
      Array.from(word.current.childNodes).map((char) => (char.className = ""))
    );
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }
  // To reset the test to its initial states
  const resetTest = useCallback(
    function resetTest() {
      clearInterval(intervalId);
      setCountDown(testTime);
      setCurrWordIndex(0);
      setCurrCharIndex(0);
      setTestStart(false);
      setTestEnd(false);
      resetWordSpanRefClassname();
      setWordsArray(generate(50));
      focusInput();
    },
    [testTime, intervalId]
  );

  // Set countdown based on the testTime from context
  useEffect(() => resetTest(), [testTime]);

  // On mount input focus
  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, [wordsSpanRef]);

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        onKeyDown={handleUserInput}
        ref={inputRef}
      />
    </div>
  );
}

export default TypingBox;
