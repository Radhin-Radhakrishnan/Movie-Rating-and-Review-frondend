import { useEffect,useState } from "react";
import axios from "axios";

const useSingleMovieFetch = ({ url }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        if (url) {
            axios.get(url)
                .then((response) => {
                    setMovie(response.data.results.sort(function (a, b) { return 0.5 - Math.random() })[0])

                })
                .catch(error => console.error(error))
        }

    }, [url])

    return movie;
}

export default useSingleMovieFetch