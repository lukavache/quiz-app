import React, { useState, useEffect } from "react";
import { Questy } from './components';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect (() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const questions = data.results.map((question) =>
      ({
        ...question,
        answers: [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5),
      }));

      setQuestions(questions);
    });
  }, []);

  const handleAnswer =  (answer) => {
    if(!showAnswers) {
      if(answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
     
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };
  function refreshPage() {
    window.location.reload();
  }
  return questions.length > 0 ? (
    <div className='container'>
      {currentIndex >= questions.length ? (
        <div>
          <h1 className="text-3xl text-white font-bold">Your score is: {score}
          </h1>
          <button className="ml-auto bg-red-600 text-white p-4 font-semibold rounded shadow mt-6" 
          onClick={refreshPage}>Play Again!
          </button>
        </div>
        
      ) : (
        <Questy 
          data={ questions[currentIndex] } 
          showAnswers={ showAnswers }
          handleNextQuestion={ handleNextQuestion }
          handleAnswer={ handleAnswer }
        />
      )}
  </div>
  ) : (
    <h2 className='text-2xl text-white font-bold'>Loading...
    </h2>
  );
}

export default App;