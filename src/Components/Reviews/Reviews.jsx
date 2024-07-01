import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from '../../axios/axios';
import { useRecoilState } from 'recoil';
import { movieDataState } from '../../Atoms/movieAtom';
import './Reviews.css';
import AddReviews from '../Admin/Movie/AddReviews/AddReviews';



const Reviews = () => {

    const [movie, setMovie] = useRecoilState(movieDataState)

    const [reviews, setReviews] = useState([])



    useEffect(() => {
        let isMounted = true;

        if (movie) {
            const fetchData = async () => {
                console.log("Fetching reviews");
                try {
                    const response = await axios.get(`/api/v1/movie/${movie.id}/reviews`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    if (isMounted) {
                        setReviews(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }


        return () => {
            isMounted = false;
        };
    }, [movie]);




    const handleDeleteMovie = async (id) => {
        console.log(id)
        try {
            console.log(id);
            const response = await axios.delete(`/api/v1/movie/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });

            alert(response.data.data)
            window.location.reload()
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("An error occurred while deleting the review. Please try again.");
        }
    };


    return (
        <>
             <section className='reviews py-4'>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12}>
                        <div className='review_container p-3'>
                            <div className='review_content'>
                                <h3>Reviews ({reviews && reviews.length})</h3>
                                {reviews && reviews.length > 0 ? (
                                    reviews.map ((review) => ( 
                                        <div  className="review_para d-flex justify-content-between align-items-start mb-3" key={review._id}>
                                            <p className="flex-grow-1">{review.content}</p>
                                            <Button className="delete_button" onClick={() => handleDeleteMovie(review._id)}>Delete
                                              
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available.</p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={10}>
                    <AddReviews />
                    </Col>
                </Row>
            </Container>
        </section>
        </>

    )
}

export default Reviews