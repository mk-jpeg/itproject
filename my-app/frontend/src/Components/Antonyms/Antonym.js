import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For dynamic screen size
import "./Antonym.css";
import axios from "axios";

const AntonymGame = () => {
  const { width, height } = useWindowSize(); // Get screen size
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  // useEffect(() => {
  //   if (currentWordIndex < words.length) {
  //     const wordObj = words[currentWordIndex];
  //     setOptions(shuffleArray([wordObj.antonym, ...wordObj.distractors]));
  //   } else {
  //     setGameOver(true);
  //   }
  // }, [currentWordIndex]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/words");
      setWords(response.data);
    } catch (err) {
      setError("Failed to load words.");
    }
    setLoading(false);
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleOptionClick = (option) => {
    if (selectedAnswer !== null) return;

    const correct = option === words[currentWordIndex].antonym;
    setSelectedAnswer(option);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      setTimeout(() => setCurrentWordIndex((prev) => prev + 1), 1000);
    } else {
      setTimeout(() => setCurrentWordIndex((prev) => prev + 1), 500);
    }
  };

  return gameOver ? (
    <div className="game-over">
      {/* 🎉 Confetti when the game ends */}
      <Confetti width={width} height={height} />
      <h1>GOOD JOB!</h1>
      <h2>Your Final Score: {score}</h2>
    </div>
  ) : (
    <motion.div
      className="game1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <p>Loading words...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <h1>Antonym Game</h1>
      <h2>Score: {score}</h2>
      {words.length > 0 ? (
        <div>
          {words.map((word) => (
            <div
              key={word.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h2>{word.word}</h2>
              <p><strong>Antonym:</strong> {word.antonym}</p>
              <p><strong>Distractors:</strong> {word.distractors.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No words found.</p>
      )}
    </motion.div>
  );
};

export default AntonymGame;
