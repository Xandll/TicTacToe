import React from "react";
import './App.css';
import logo from './logo.svg'
import x from './x.svg'
import o from './o.svg'

export default function MyApp() {
  return (
    <>
      <div id="header">
        <h1>Tic Tac Toe with React</h1>
        <img id="logo" src={logo} alt="React Logo" />
      </div>
      <Grid />
    </>
  )
}

function checkWinner(cells, player, won) {
  if(cells[0] && cells[0] === cells[1] && cells[1] === cells[2]) return true
  if(cells[3] && cells[3] === cells[4] && cells[4] === cells[5]) return true
  if(cells[6] && cells[6] === cells[7] && cells[7] === cells[8]) return true
  if(cells[0] && cells[0] === cells[3] && cells[3] === cells[6]) return true
  if(cells[1] && cells[1] === cells[4] && cells[4] === cells[7]) return true
  if(cells[2] && cells[2] === cells[5] && cells[5] === cells[8]) return true
  if(cells[0] && cells[0] === cells[4] && cells[4] === cells[8]) return true
  if(cells[2] && cells[2] === cells[4] && cells[4] === cells[6]) return true
  return false
}

function Grid() {
  const [player, setplayer] = React.useState("X")
  const [cells, setcell] = React.useState(Array(9).fill(null))
  const [won, setwon] = React.useState(false)
  let [fullcells, setfullcell] = React.useState(0)

  const handleClick = (index) => {
    if (cells[index] || won || fullcells === 9) return
    const newcells = [...cells]
    newcells[index] = player
    setcell(newcells)
    setwon(checkWinner(newcells, player, won))
    setplayer(player === "X" ? "O" : "X")
    setfullcell(fullcells += 1)
    console.log (fullcells)
  }

  const rendercell = (index) => {
    return (
      <div key={index} className="cell" onClick={() => handleClick(index)}>
        {cells[index] === "X" && <img src={x} alt="X"/>}
        {cells[index] === "O" && <img src={o} alt="O"/>}
      </div>
    )
  }

  return (
    <>
      <div id="grid">
        {Array.from({ length: 9 }).map ((_, index) => rendercell(index))}
      </div> 
      {won ? (
        <>
          <p>Player {player === "X" ? "O" : "X"} won!</p>
          <div className="button-container">
            <button onClick={() => PlayAgain()}>Play Again</button>
          </div>
        </>
      ) : fullcells === 9 ? (
          <>
            <p>Draw!</p>
            <div className="button-container">
              <button onClick={() => PlayAgain()}>Play Again</button>
            </div>
          </>
      ) : (
          <p>Current player: {player}</p>
      )}
    </>
  )

  function PlayAgain() {
    setcell(Array(9).fill(null))
    setplayer("X")
    setwon(false)
    setfullcell(0)
  }

}
