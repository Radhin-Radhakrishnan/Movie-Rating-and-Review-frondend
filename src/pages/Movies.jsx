import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner/Banner'
import MovieCard from '../Components/MovieCard/MovieCard'
import { actionMovies, adventureMovies, animationMovies, comedyMovies, crimeMovies, fantasyMovies } from '../urls/urls'

const Movies = () => {

  return (

    <div className='movies_section'>
      <Banner url={adventureMovies} />
      <MovieCard title='action' url={actionMovies} />
      <MovieCard title='adventure' url={adventureMovies} />
      <MovieCard title='animation' url={animationMovies} />
      <MovieCard title='comedy' url={comedyMovies} />
      <MovieCard title='fantasy' url={fantasyMovies} />
      <MovieCard title='crime' url={crimeMovies} />
    </div>
  )
}

export default Movies