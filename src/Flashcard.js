import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)
  return (
    <div
    // for class of card for each flashcard and class of flip if flip is true
        className = {`card ${flip ? 'flip' : ''}`}
        // On click, set flip to the opposite of what it is
        onClick={() => setFlip(!flip)}
    >
        
        <div className="front">
            {flashcard.question}
            <div className="flashcard-options">
                {flashcard.options.map(option => {
                    return <div className="flashcard-option">{option}</div>
                })}
            </div>
        </div> 

        <div className="back">{flashcard.answer}</div>
      
    </div>
  )
}