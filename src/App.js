import "../src/style.css"
import Die from "./Die"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(1 + Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  const diceElements = dice.map(item => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      clickHandle={() => holdDice(item.id)}
    />
  ))

  function rollDice() {
    setDice(prevDice => prevDice.map(dice => dice.isHeld === false ?
      {
        ...dice,
        value: Math.floor(1 + Math.random() * 6),
        id: nanoid()
      } :
      {
        ...dice
      }
    ))
  }

  function newGame(){
    setDice(allNewDice())
    setTenzies(false)
  }

  function holdDice(id) {

    setDice(prevDice => prevDice.map(dice => dice.id === id ? { ...dice, isHeld: !dice.isHeld } : { ...dice }
    ))
  }

  function isEqual(obj) {
    if (obj.map(item => item.value).every(val => val === obj[0].value)) {
      return true
    } else {
      return false
    }
  }

  function isAllHeld(obj) {
    if (obj.map(item => item.isHeld).every(val => val === true)) {
      return true
    } else {
      return false
    }
  }

  React.useEffect(() => {
    
  if(isEqual(dice) && isAllHeld(dice)){
    setTenzies(true)
  }

  }, [dice])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies Game</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="board">
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-button" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  )
}

export default App