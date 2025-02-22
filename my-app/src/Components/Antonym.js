import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For dynamic screen size
import "./Antonym.css";


const wordData = [
  { word: "Modern", antonym: "Ancient", distractors: ["Old", "Era", "Strange"] },
  { word: "Big", antonym: "Small", distractors: ["Huge", "Large", "Gigantic"] },
  { word: "Victory", antonym: "Defeat", distractors: ["Verstappen", "Grand", "Trophy"] },
  { word: "Peace", antonym: "War", distractors: ["Quick", "Rapid", "Swift"] },
  { word: "Vacant", antonym: "Occupied", distractors: ["Bright", "Dry", "Radiant"] }
];


const AntonymGame = () => {
  const { width, height } = useWindowSize(); // Get screen size
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    if (currentWordIndex < wordData.length) {
      const wordObj = wordData[currentWordIndex];
      setOptions(shuffleArray([wordObj.antonym, ...wordObj.distractors]));
    } else {
      setGameOver(true);
    }
  }, [currentWordIndex]);


  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);


  const handleOptionClick = (option) => {
    if (selectedAnswer !== null) return;


    const correct = option === wordData[currentWordIndex].antonym;
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
    <motion.div className="game1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1>Antonym Game</h1>
      <h2>Score: {score}</h2>
      <div className="word-card">
        <h2>{wordData[currentWordIndex]?.word}</h2>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)} className="option-btn">
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};


export default AntonymGame;