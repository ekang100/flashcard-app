import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './style.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          // randomize the order of options:
          options: options.sort(() => Math.random() - .5)  // 50% of the time we get a neg number, 50% of the time we get a positive number
        }
      }))
  
    })
  }, [])
  
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }


  return (
    <div className = "container">
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },

  {
    id: 2,
    question: 'Question 2?',
    answer: 'Answer',
    options: [
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  }
]

export default App;
