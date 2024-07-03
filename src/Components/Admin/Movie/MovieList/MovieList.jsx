import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from "react-icons/io";
import './MovieList.css';
import { Link } from 'react-router-dom';
import axios from '../../../../axios/axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("jwt_token");
        try {
            const response = await axios.get('/api/v1/admin/movies', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setMovies(response.data);
        } catch (error) {
            console.log("fetching error: ", error);
        }
    };

    const deleteMovie = async (id) => {
        try {
            const response = await axios.delete(`/api/v1/admin/movies/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });
            alert(response.data.message);
            fetchData();
        } catch (error) {
            console.log("Deleting error: ", error);
        }
    };

    return (
        <section className='movieList_section py-2'>
            <Container>
                <Row className="movieList_container py-3 px-1">
                    <div className="main_header pt-2 mt-5">
                        <h1 className='text-capitalize'>List of movies</h1>
                    </div>
                    <Col className="table_section py-1 mt-5">
                        <Table responsive bordered hover variant='dark'>
                            <thead>
                                <tr>
                                    <th className='py-3'>No.</th>
                                    <th className='py-3'>Movie Name</th>
                                    <th className='py-3'>Genre</th>
                                    <th className='py-3'>Description</th>
                                    <th className='py-3'>Image Url</th>
                                    <th className='py-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie, index) => (
                                    <tr key={movie._id}>
                                        <td className='py-2 px-2'>{index + 1}</td>
                                        <td className='py-2 px-2'>{movie.title}</td>
                                        <td className='py-2 px-2'>{movie.mediaGenre}</td>
                                        <td className='py-2 px-2'>{movie.mediaDescription}</td>
                                        <td className='py-2 px-2'>{movie?.mediaImage} {movie?.mediaImageUrl}</td>
                                        <td className='py-2 px-2'>
                                            <Button className='delete_button rounded-pill text-white' onClick={() => deleteMovie(movie._id)}>
                                                Delete<MdDeleteOutline />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-start text-sm-center mt-5">
                            <Link to="/admin/addMovie">
                                <Button className='add_button rounded-pill'>
                                    <IoMdAdd className='me-1' />
                                    Add
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MovieList;
