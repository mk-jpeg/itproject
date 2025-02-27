import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./Antonym.css";

const Antonym = () => {
  const { width, height } = useWindowSize();
  const [wordData, setWordData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);
  const [options, setOptions] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setGameStarted(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (gameStarted) {
      fetch("http://localhost:5000/api/words")
        .then((response) => response.json())
        .then((data) => {
          setWordData(data);
          loadNewWord(0, data);
        })
        .catch((error) => console.error("Error fetching words:", error));
    }
  }, [gameStarted]);

  const loadNewWord = (index, data) => {
    if (index >= data.length) {
      setGameOver(true);
      submitProgress();
      setTimeout(() => setShowExit(true), 2000);
      return;
    }

    const selectedWord = data[index];
    const correctAntonym = selectedWord.antonym;
    let distractors = data
      .filter((item) => item.word !== selectedWord.word)
      .map((item) => item.antonym);

    const allOptions = [correctAntonym, ...shuffleArray(distractors).slice(0, 3)];
    setOptions(shuffleArray(allOptions));
  };

  const handleOptionClick = (selectedOption) => {
    if (!wordData[currentIndex]) return;

    if (selectedOption === wordData[currentIndex].antonym) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setTimeout(() => {
      setFeedback("");
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      loadNewWord(nextIndex, wordData);
    }, 1000);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const submitProgress = async () => {
    const progressData = {
      game: "Antonym Game",
      score: score,
      user: "logged-in-user", // Replace with actual logged-in user ID
    };

    try {
      await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });
      console.log("Progress recorded successfully.");
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  return (
    <div className="container">
      {!gameStarted ? (
        <div className="countdown">
          <h1 className="large-text">
            {countdown > 0
              ? countdown === 3
                ? "Ready..."
                : countdown === 2
                ? "Set..."
                : "Begin!"
              : "Go!"}
          </h1>
        </div>
      ) : (
        <div className={`game1 ${shake ? "shake" : ""}`}>
          {!gameOver ? (
            <>
              <h1 className="game-heading">Determine the antonym</h1>
              <h2 className="score">Score: {score}</h2>
              {wordData[currentIndex] && (
                <>
                  <div className="word-card">{wordData[currentIndex].word}</div>
                  <div className="options">
                    {options.map((option, index) => (
                      <button key={index} className="option-btn" onClick={() => handleOptionClick(option)}>
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
              {!showExit && <Confetti width={width} height={height} />}
              <h1>🎉 Good Job! 🎉</h1>
              <h2>Final Score: {score}</h2>

              {showExit && (
                <button className="option-btn" onClick={() => window.location.href = "/student-dashboard"}>
                  Exit
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Antonym;
