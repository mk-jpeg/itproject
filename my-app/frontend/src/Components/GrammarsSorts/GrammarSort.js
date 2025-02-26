import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./GrammarSort.css";

function GrammarSort() {
  const initialWords = {
    noun: ["dog", "apple", "house", "car", "tree", "book", "river", "mountain", "pencil", "ocean"],
    verb: ["run", "jump", "write", "sing", "dance", "climb", "drive", "swim", "read", "paint"],
    both: ["play", "watch", "help", "move", "work", "cook", "draw", "paint", "cycle", "shop"],
  };

  const [score, setScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0); // Track rounds
  const [draggedWord, setDraggedWord] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [boxes, setBoxes] = useState({ noun: [], verb: [], both: [] });
  const [remainingWords, setRemainingWords] = useState({ ...initialWords });
  const [currentWords, setCurrentWords] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    getNewWords();
  }, []);

  const getNewWords = () => {
    if (roundCount >= 5) {
      setFeedback(`🎉 Game Over! Final Score: ${score}`);
      setGameOver(true);
      triggerConfetti();
      return;
    }
  
    const { noun, verb, both } = remainingWords;
  
    if (noun.length === 0 || verb.length === 0 || both.length === 0) {
      setFeedback(`🎉 Game Over! Final Score: ${score}`);
      setGameOver(true);
      return;
    }
  
    const newNoun = noun[Math.floor(Math.random() * noun.length)];
    const newVerb = verb[Math.floor(Math.random() * verb.length)];
    const newBoth = both[Math.floor(Math.random() * both.length)];
  
    let newWords = [
      { word: newNoun, category: "noun" },
      { word: newVerb, category: "verb" },
      { word: newBoth, category: "both" },
    ];
  
    // Shuffle the words array
    newWords = newWords.sort(() => Math.random() - 0.5);
  
    setCurrentWords(newWords);
  
    setRemainingWords({
      noun: noun.filter((word) => word !== newNoun),
      verb: verb.filter((word) => word !== newVerb),
      both: both.filter((word) => word !== newBoth),
    });
  
    setBoxes({ noun: [], verb: [], both: [] });
    setFeedback("");
    setShowNext(false);
  };
  

  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  const handleDrop = (category) => {
    if (!draggedWord) return;

    setBoxes((prev) => ({
      ...prev,
      [category]: [...prev[category], draggedWord.word],
    }));

    setDraggedWord(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const checkAnswers = () => {
    let correct = 0;

    currentWords.forEach((word) => {
      if (boxes[word.category].includes(word.word)) {
        correct++;
      }
    });

    if (correct === 3) {
      setScore((prev) => prev + 1);
      setFeedback(" Correct! ");
      setShowNext(true);
      setRoundCount((prev) => prev + 1); // Increase round count
    } else {
      setFeedback("❌ Incorrect! Try again.");
    }
  };

  const resetGame = () => {
    setScore(0);
    setRoundCount(0);
    setRemainingWords({ ...initialWords });
    setFeedback("");
    setShowNext(false);
    setGameOver(false);
    getNewWords();
  };

  return (
    <div className="game-container">
      <h1>Grammar Sort Game</h1>
      <h2 className="score">Score: {score}</h2>
      <h3 className="round">Round: {roundCount}/5</h3>

      {gameOver ? (
        <div className="game-over">
          <h2>🎉 Game Over! 🎉</h2>
          <h2>Final Score: {score}</h2>
          <button className="option-btn" onClick={resetGame}>
            Restart Game
          </button>
        </div>
      ) : (
        <>
          <div className="word-bank">
            {currentWords.map((word, index) => (
              <div
                key={index}
                className="word"
                draggable
                onDragStart={() => handleDragStart(word)}
              >
                {word.word}
              </div>
            ))}
          </div>

          <div className="boxes-container">
            {["noun", "verb", "both"].map((category) => (
              <div
                key={category}
                className="box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(category)}
              >
                <div className="box-title">{category.toUpperCase()}</div>
                {boxes[category].map((word, index) => (
                  <div key={index} className="placed-word">{word}</div>
                ))}
              </div>
            ))}
          </div>

          {feedback && <div className="feedback">{feedback}</div>}

          <div className="buttons">
            {!showNext ? (
              <button className="option-btn" onClick={checkAnswers}>
                Check
              </button>
            ) : (
              <button className="option-btn" onClick={getNewWords}>
                Next
              </button>
            )}

            <button className="option-btn" onClick={resetGame}>
              Restart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default GrammarSort;
