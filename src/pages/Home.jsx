import React, { useState, useEffect } from 'react';
import Banner from '../Components/Banner/Banner';
import MovieCard from '../Components/MovieCard/MovieCard';
import { newlyAddedMovies, nowPlayingMovies, popularMovies, topRatedMovies,fantasyMovies } from '../urls/urls';
import NewlyAddedMovies from '../Components/NewlyAddedMovies/NewlyAddedMovies';
import Preloader from '../Components/Preloader/Preloader';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        axios.get(popularMovies),
        axios.get(topRatedMovies),
        axios.get(nowPlayingMovies),
        axios.get(newlyAddedMovies),
        axios.get(fantasyMovies)
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className='home'>
      {loading && (
        <>
          <Preloader />
          <Banner />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <NewlyAddedMovies />
        </>
      )}

      {!loading && (
        <>
          <Banner url={popularMovies} />
          <MovieCard title='Popular' url={popularMovies} />
          <MovieCard title='Trending' url={topRatedMovies} />
          <MovieCard title='Top-Rated' url={nowPlayingMovies} />
          <MovieCard title='Fantasy' url={fantasyMovies} />
          <NewlyAddedMovies title='Newly Added' url={newlyAddedMovies} />
        </>
      )}
    </div>
  );
};

export default Home;
