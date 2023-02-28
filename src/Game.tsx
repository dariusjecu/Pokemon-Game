import { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import { Pok } from './App'
import "./Game.css"

interface Props{
    startGame: boolean,
    pokemon: Pok[]
}

export default function Game({pokemon, startGame}: Props){

    const [playersHealth, setPlayersHealth] = useState([100, 100])
    const [playersEnergy, setPlayersEnergy] = useState([100, 100])
    const [updateGame, setUpdateGame] = useState(false)

    function Attack(player: string, damage: number, energy: number){

        console.log(player)
        console.log(damage)
        console.log(energy)

        if(player === "player1")
          {
            setPlayersHealth(val => val.map((el, i) => i===1 ? el-damage : el))
            setPlayersEnergy(val => val.map((el, i) => i===0 ? el-energy : el))
          }
        else if(player === "player2")
        {
            setPlayersHealth(val => val.map((el, i) => i===0 ? el-damage : el))
            setPlayersEnergy(val => val.map((el, i) => i===1 ? el-energy : el))
        }

        setUpdateGame(val => val===true ? false : true)
      }

      useEffect(() => {

        document.documentElement.style.setProperty('--player1-health', `${String(playersHealth[0])}%`)
        document.documentElement.style.setProperty('--player1-energy', `${String(playersEnergy[0])}%`)
        document.documentElement.style.setProperty('--player2-health', `${String(playersHealth[1])}%`)
        document.documentElement.style.setProperty('--player2-energy', `${String(playersEnergy[1])}%`)

      }, [updateGame])

    return (
        <div className='game'>
            <div className='player'>
                <h1>Player 1</h1>
                <Pokemon name={pokemon[0].name} image={pokemon[0].image} moves={pokemon[0].moves} abilities={pokemon[0].abilities} player="player1" health={playersHealth[0]} energy={playersEnergy[0]} startGame={startGame} Attack={Attack}/>
            </div>
            <div className='player'>
                <h1>Player 2</h1>
                <Pokemon name={pokemon[1].name} image={pokemon[1].image} moves={pokemon[1].moves} abilities={pokemon[1].abilities} player="player2" health={playersHealth[1]} energy={playersEnergy[1]} startGame={startGame} Attack={Attack}/>
            </div>
        </div>
    )
}