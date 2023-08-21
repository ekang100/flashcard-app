import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    // recalculate height if window is resized
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

  return (
    <div
    // for class of card for each flashcard and class of flip if flip is true
        className = {`card ${flip ? 'flip' : ''}`}
        style={{ height: height }}
        // On click, set flip to the opposite of what it is
        onClick={() => setFlip(!flip)}
    >
        
        <div className="front" ref={frontEl}>
            {flashcard.question}
            <div className="flashcard-options">
                {flashcard.options.map(option => {
                    return <div className="flashcard-option">{option}</div>
                })}
            </div>
        </div> 

        <div className="back" ref={backEl}>{flashcard.answer}</div>
      
    </div>
  )
}