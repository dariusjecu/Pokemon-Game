import "./Pokemon.css"
import { Pok } from "./App"
import { useEffect, useState } from "react"

interface Props{
  name: string,
    image: string,
    moves: {
        name: string,
        url: string
    }[],
    abilities: {
        name: string,
        url: string
    }[],
    player?: string,
    health?: number,
    energy?: number,
    startGame?: boolean,
    Attack: Function
}

function Pokemon({name, image, abilities, player, health, energy, startGame, Attack}: Props) {

  const [playerHealth, setPlayerHealth] = useState(100)
  const [playerEnergy, setPlayerEnergy] = useState(100)
  const [oneTime, setOneTime] = useState(false)

  if(startGame)
    useEffect(() => {
      setPlayerHealth(Number(health))
      setPlayerEnergy(Number(energy))
      setOneTime(true)
      if(player === "player1")
      {
        document.documentElement.style.setProperty('--player1-health', `${String(playerHealth)}%`);
        document.documentElement.style.setProperty('--player1-energy', `${String(playerEnergy)}%`);
      }
      else
      {
        document.documentElement.style.setProperty('--player2-health', `${String(playerHealth)}%`);
        document.documentElement.style.setProperty('--player2-energy', `${String(playerEnergy)}%`);
      }
    }, [playerHealth, playerEnergy])

  return (
    <div className="pokemon">
      {startGame ? <div className="status">
                    <div className="health">
                      <h2>Health</h2>
                      <div className="bar"><div className={player === "player1" ? "health1-bar" : "health2-bar"}></div></div>
                    </div>
                    <div className="energy">
                      <h2>Energy</h2>
                      <div className="bar"><div className={player === "player1" ? "energy1-bar" : "energy2-bar"}></div></div>
                    </div>
                  </div> : <></>}
      <img className={player==="player2" ? "flip" : ""} src={image} alt="image" />
      <h1>{name}</h1>
      <div className='abilities'>
        {abilities.map((val, i) => {
            const damage = (i+1)*10
            const lostEnergy = (i+1)*10
            return (
                <div key={i} onClick={() => Attack(player, damage, lostEnergy)} className='ability'>
                    <h1>{val.name}</h1>
                    {startGame ? <h2>{`Damage: ${damage}`}</h2> : <></>}
                    {startGame ? <h2>{`Energy: -${lostEnergy}`}</h2> : <></>}
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Pokemon
