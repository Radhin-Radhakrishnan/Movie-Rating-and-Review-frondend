import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CiHeart } from "react-icons/ci";
import './Movie.css';
import { movieDataState } from '../../Atoms/movieAtom';
import { useRecoilState } from 'recoil';
import { imageUrl } from '../../urls/urls';
import axios from '../../axios/axios';

const Movie = () => {
    const [movie, setMovie] = useRecoilState(movieDataState);

    const handleFavoriteMovie = async (id) => {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
            alert("Please log in");
            return;
        }
        try {
            const response = await axios.post(`/api/v1/movie/${id}/favorite`, {
                mediaTitle: movie.title,
                mediaImage: movie.backdrop_path
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {movie && (
                <section className='movie_box py-4' style={{ backgroundImage: `url(${imageUrl + movie.backdrop_path})` }}>
                    <Container className='py-4 mt-4'>
                        <div className="movie_container">
                            <Row>
                                <Col lg={6} sm={12} className='text-center'>
                                    <img src={`${imageUrl + movie.backdrop_path}`} className='movie_img' alt="movie" />
                                </Col>
                                <Col lg={6} sm={12}>
                                    <div className="movie_title text-start mt-3 mt-lg-0">
                                        <h1 className='text-capitalize'>{movie.title}</h1>
                                    </div>
                                    <div className="movie_description mt-3 mt-lg-4">
                                        <p>{movie.overview}</p>
                                    </div>
                                    <div className="button_group mt-lg-4">
                                        <Button className='btn rounded-pill py-2' onClick={() => handleFavoriteMovie(movie.id)}>
                                            <CiHeart className="favorite_icon" />
                                            Add To Favorite
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
};

export default Movie;
