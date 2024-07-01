import { useEffect,useState } from "react";
import axios from "axios";

const useMovieFetch = ({ url }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (url) {
            axios.get(url)
                .then((response) => {
                    setMovies(response.data.results)

                })
                .catch(error => console.error(error))
        }

    }, [url])

    return movies;
}

export default useMovieFetch