import React, { useEffect } from 'react'
import Movie from '../Components/SingleMovieDetails/Movie'
import MovieImageSwiper from '../Components/MovieImageSwiper/MovieImageSwiper'
import MovieVideoSwiper from '../Components/MovieVideoSwiper/MovieVideoSwiper'
import Reviews from '../Components/Reviews/Reviews'
import MovieCard from '../Components/MovieCard/MovieCard'
import { useRecoilState } from 'recoil'
import { movieDataState } from '../Atoms/movieAtom'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'
import { actionMovies } from '../urls/urls'
import AllReviews from '../Components/AllReviews/AllReviews'







export async function loader({ params }) {
    const response = await axios.get(`${import.meta.env.VITE_TMDB_URL}/movie/${params.movieId}?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = response.data
    return { data };
}
const SingleMoviePage = () => {

    const [movie, setMovie] = useRecoilState(movieDataState)

    const { data } = useLoaderData()


    useEffect(() => {
        if (data) {
            setMovie(data)
        }
    }, [data])


    return (
        <div className='singleMovie_section'>
           
           <Movie/>
           <Reviews/>
           <MovieImageSwiper />
            <MovieVideoSwiper />
            <AllReviews />
          
            <MovieCard title='You May Also Like' url={actionMovies} />
            
        </div>
    )
}

export default SingleMoviePage