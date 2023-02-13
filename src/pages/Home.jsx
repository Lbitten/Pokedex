import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import PokeCard from '../components/PokeCard'
import { Skeletons } from '../components/Skeleton'

export const Home = () => {
     const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        getPokemon();
    }, [])

    const getPokemon = () => {
        var endpoints = [];
        for( var i = 1; i< 152; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));

    }

    const pokeFilter =(name) =>{
        var filtered = [];
        if(name===''){
            getPokemon();
        }
            for(var i in pokemons){
                if (pokemons[i].data.name.includes(name)){
                        filtered.push(pokemons[i]);
                }
            }
        setPokemons(filtered);
        

    }
    
  return (
    <div>
        <NavBar pokeFilter={pokeFilter} />
        <Container maxWidth='false'>
            <Grid container>
                {pokemons.length===0 ? <Skeletons /> :
                    pokemons.map((pokemon, key) => 
                        <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                            <PokeCard name={pokemon.data.name} image ={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                        </Grid>
                        )
                
                }
                
            </Grid>
            
        </Container>
        
    </div>
  )
}
