import React, { useState, useEffect } from 'react';
import './GrammarSort.css';

function GrammarSort() {
  const [wordBank, setWordBank] = useState([]);
  const [boxes, setBoxes] = useState({ noun: [], verb: [], both: [] });
  const [feedback, setFeedback] = useState('');
  const [draggedWord, setDraggedWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch words from API
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/grammarWords');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched Words:', data.words);

        if (data.words) {
          setWordBank([...data.words.noun, ...data.words.verb, ...data.words.both]);
          setBoxes({ noun: [], verb: [], both: [] });
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching words:', error);
        setError('Failed to fetch words. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (draggedWord) {
      setBoxes((prev) => ({
        ...prev,
        [category]: [...prev[category], draggedWord],
      }));
      setWordBank((prev) => prev.filter((word) => word !== draggedWord));
      setDraggedWord(null);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    Object.keys(boxes).forEach((category) => {
      boxes[category].forEach((word) => {
        if (wordBank.includes(word)) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });
    });

    if (incorrectCount === 0 && correctCount > 0) {
      setFeedback('Great job! All words are correctly sorted! 🎉');
    } else {
      setFeedback(`You got ${correctCount} correct and ${incorrectCount} incorrect.`);
    }
  };

  const resetGame = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/grammarWords');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log('Fetched Words after reset:', data.words);

      if (data.words) {
        setWordBank([...data.words.noun, ...data.words.verb, ...data.words.both]);
        setBoxes({ noun: [], verb: [], both: [] });
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching words:', error);
      setError('Failed to fetch words. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-container">
      <h1>Grammar Sort Game</h1>
      <p>Drag and drop words into the correct grammatical category.</p>

      {loading && <p>Loading words...</p>}
      {error && <p className="error">{error}</p>}

      <div className="word-bank">
        {wordBank.length > 0 ? (
          wordBank.map((word, index) => (
            <div
              key={index}
              className="word"
              draggable
              onDragStart={() => handleDragStart(word)}
            >
              {word}
            </div>
          ))
        ) : (
          !loading && <p>No words available.</p>
        )}
      </div>

      <div className="boxes-container">
        {['noun', 'verb', 'both'].map((category) => (
          <div
            key={category}
            className="box"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, category)}
          >
            <div className="box-title">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            {boxes[category].map((word, index) => (
              <div key={index} className="placed-word">{word}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="check-button" onClick={checkAnswers}>
          Check Answers
        </button>
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.includes('Great job') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default GrammarSort;
