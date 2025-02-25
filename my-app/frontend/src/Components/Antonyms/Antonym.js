import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./Antonym.css";

const Antonym = () => {
  const { width, height } = useWindowSize();
  const [wordData, setWordData] = useState([]); // Stores all words from API
  const [usedWords, setUsedWords] = useState([]); // Tracks words already used
  const [currentIndex, setCurrentIndex] = useState(0); // Track word position
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);
  const [options, setOptions] = useState([]);

  // Fetch words from API once
  useEffect(() => {
    fetch("http://localhost:5000/api/words")
      .then((response) => response.json())
      .then((data) => {
        setWordData(data);
        setUsedWords(data); // Store all words for tracking
        loadNewWord(0, data);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  // Load a new word based on index
  const loadNewWord = (index, data) => {
    if (index >= data.length) {
      setGameOver(true);
      return;
    }

    const selectedWord = data[index];

    // Create options
    const correctAntonym = selectedWord.antonym;
    let distractors = data
      .filter((item) => item.word !== selectedWord.word)
      .map((item) => item.antonym);

    // Shuffle and select options
    const allOptions = [correctAntonym, ...shuffleArray(distractors).slice(0, 3)];
    setOptions(shuffleArray(allOptions));
  };

  // Handle answer selection
  const handleOptionClick = (selectedOption) => {
    if (!wordData[currentIndex]) return;

    if (selectedOption === wordData[currentIndex].antonym) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect!");
      setShake(true);
      setTimeout(() => setShake(false), 500); // Stop shaking after 0.5s
    }

    // Move to the next word automatically
    setTimeout(() => {
      setFeedback("");
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      loadNewWord(nextIndex, wordData);
    }, 1000);
  };

  // Shuffle array utility
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  return (
    <div className="container">
      <h1 className="game-heading">Find the Antonym</h1> 
      
    <div className={`game1 ${shake ? "shake" : ""}`}>
      {!gameOver ? (
        <>
          <h2 className="score">Score: {score}</h2>
          {wordData[currentIndex] && (
            <>
              <div className="word-card">{wordData[currentIndex].word}</div>
              <div className="options">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="option-btn"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback && <p className="feedback">{feedback}</p>}
            </>
          )}
        </>
      ) : (
        <div className="game-over">
          <Confetti width={width} height={height} />
          <h1>🎉 Good Job! 🎉</h1>
          <h2>Final Score: {score}</h2>
        </div>
      )}
      </div>
    </div>
  );
};

export default Antonym;
