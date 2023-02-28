import { useState, useEffect } from 'react'
import { NamedAPIResource, PokemonClient } from 'pokenode-ts'
import Pokemon from './Pokemon'
import Game from './Game'
import './App.css'

export interface Ability{
  name: string,
  url: string
}

export interface Move{
  name: string,
  url: string
}

export interface Pok{
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
    Attack?: Function
}

function App() {

  const [pokemon, setPokemon] = useState<Pok[]>([{
    name: "",
    image: "",
    moves: [],
    abilities: []
  },
  {
    name: "",
    image: "",
    moves: [],
    abilities: []
  }])
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [type1, setType1] = useState("normal")
  const [type2, setType2] = useState("normal")
  const [allPokemons1, setAllPokemons1] = useState<string[]>(["pidgey"])
  const [allPokemons2, setAllPokemons2] = useState<string[]>(["pidgey"])
  const [name1, setName1] = useState("pidgey")
  const [name2, setName2] = useState("pidgey")
  const [startGame, setStartGame] = useState(false)

  function Capitalize(val: string): string{
    let newVal = val.split("")
    newVal[0] = newVal[0].toUpperCase()
    const aux = newVal.join("")
    return aux
  }

  useEffect(() => {

    async function GetAllTypes(){
      const res = await fetch("https://pokeapi.co/api/v2/type")
      const data = await res.json()
      const newData = data.results.map((val: Move) => val.name)
      newData.pop()
      newData.pop()
      setPokemonTypes(newData)
    }

    async function GetAllPokemons(type: string){
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      const data = await res.json()
      let newData = data.pokemon.map((val) => val.pokemon.name)
      if(type === type1)
        setAllPokemons1(newData)
      else if(type === type2)
        setAllPokemons2(newData)
    }

    async function Pokemon(name: string){
      const api = new PokemonClient();

      await api
        .getPokemonByName(name)
        .then((data) => {
          const newAbilities: Ability[] = data.abilities.map(val => {
            return {
              name: Capitalize(val.ability.name), 
              url: val.ability.url
            }
          })
          const newMoves: Move[] = data.moves.map(val => {
            return {
              name: Capitalize(val.move.name), 
              url: val.move.url
            }
          })
          const newData: Pok = {
            name: Capitalize(data.name),
            image: data.sprites.back_default,
            moves: newMoves,
            abilities: newAbilities,
          }
          if(name === name1)
            setPokemon(val => val.map((el, i) => i===0 ? newData : el))
          if(name === name2)
            setPokemon(val => val.map((el, i) => i===1 ? newData : el))
        })
    }

    GetAllTypes()
    GetAllPokemons(type1)
    GetAllPokemons(type2)
    Pokemon(name1)
    Pokemon(name2)
    
  }, [type1, type2, name1, name2])

  function TypeChange(event, player: string){
    console.log(event.target.value)
    if(player === "player1")
      setType1(event.target.value)
    else
      setType2(event.target.value)
  }

  function NameChange(player: string){
    if(player === "player1")
    {
      const data = document.getElementById("all-pokemons1")
      setName1(data.value)
    }
    else if(player === "player2")
    {
      const data = document.getElementById("all-pokemons2")
      setName2(data.value)
    }
  }

  return (
    <div className="App">
      {startGame===false ? <div className='main'>
        <div className='player'>
          <h1>Player 1</h1>
          <select name="pokemons-type" onChange={() => TypeChange(event, "player1")}>
            {pokemonTypes.map((val, i) => <option key={i} value={val}>{Capitalize(val)}</option>)}
          </select>
          <select name="all-pokemons" id="all-pokemons1">
            {allPokemons1.map((val, i) => <option key={i} value={val}>{Capitalize(val)}</option>)}
          </select>
          <button onClick={() => {NameChange("player1")}}>Select Pokemon</button>
          <Pokemon name={pokemon[0].name} image={pokemon[0].image} moves={pokemon[0].moves} abilities={pokemon[0].abilities} player="player1"/>
        </div>
        <button className='start' onClick={() => setStartGame(true)}>Start Battle</button>
        <div className='player'>
        <h1>Player 2</h1>
          <select name="pokemons-type" onChange={() => TypeChange(event, "player2")}>
            {pokemonTypes.map((val, i) => <option key={i} value={val}>{Capitalize(val)}</option>)}
          </select>
          <select name="all-pokemons" id="all-pokemons2">
            {allPokemons2.map((val, i) => <option key={i} value={val}>{Capitalize(val)}</option>)}
          </select>
          <button onClick={() => {NameChange("player2")}}>Select Pokemon</button>
          <Pokemon name={pokemon[1].name} image={pokemon[1].image} moves={pokemon[1].moves} abilities={pokemon[1].abilities} player="player2"/>
        </div>
      </div> : <Game pokemon={pokemon} startGame={startGame}/>}
    </div>
  )
}

export default App
