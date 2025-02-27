import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./GrammarSort.css";

const GrammarSort = () => {
  const { width, height } = useWindowSize();
  const [wordData, setWordData] = useState([]);
  const [score, setScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [draggedWord, setDraggedWord] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [boxes, setBoxes] = useState({ noun: [], verb: [], both: [] });
  const [showNext, setShowNext] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/grammar")
      .then((response) => response.json())
      .then((data) => {
        setWordData(data);
        selectNewWords(data);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const selectNewWords = (data) => {
    const nouns = data.filter((word) => word.category === "noun");
    const verbs = data.filter((word) => word.category === "verb");
    const both = data.filter((word) => word.category === "both");
    
    if (nouns.length && verbs.length && both.length) {
      const selectedWords = [
        nouns[Math.floor(Math.random() * nouns.length)],
        verbs[Math.floor(Math.random() * verbs.length)],
        both[Math.floor(Math.random() * both.length)],
      ];
      setCurrentWords(selectedWords.sort(() => Math.random() - 0.5));
    }
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

  const checkAnswers = () => {
    setShowNext(true);
    setRoundCount((prev) => prev + 1);
    
    fetch("http://localhost:5000/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, round: roundCount + 1, game: "Grammar Sort" })
    }).catch((error) => console.error("Error saving progress:", error));
  };

  const nextRound = () => {
    if (roundCount >= 5) {
      setGameOver(true);
      setTimeout(() => setShowExit(true), 2000);
      return;
    }
    setBoxes({ noun: [], verb: [], both: [] });
    setFeedback("");
    setShowNext(false);
    selectNewWords(wordData);
  };

  const resetGame = () => {
    setScore(0);
    setRoundCount(0);
    setFeedback("");
    setShowNext(false);
    setGameOver(false);
    setShowExit(false);
    selectNewWords(wordData);
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <div className="game-over">
          <Confetti width={width} height={height} />
          <h1>🎉 Game Over! 🎉</h1>
          <h2>Final Score: {score}</h2>
          {showExit && (
            <button className="exit-btn styled-exit" onClick={() => window.location.href = "/student-dashboard"}>
              Exit
            </button>
          )}
        </div>
      ) : (
        <>
          <h1>Grammar Sort Game</h1>
          <h2 className="score">Score: {score}</h2>
          <h3 className="round">Round: {roundCount}/5</h3>

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
              <>
                <button className="option-btn" onClick={checkAnswers}>Check</button>
                <button className="option-btn" onClick={resetGame}>Restart</button>
              </>
            ) : (
              <button className="option-btn" onClick={nextRound}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GrammarSort;
