import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './MovieReviews.css';

import axios from '../../../axios/axios';

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/users/${userId}/reviews`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data)

                setReviews(response.data);
            } catch (error) {
                console.log("Fetching error: ", error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <section className='movieReviews_section py-2'>
            <Container>
                <div className="review_container px-3 py-3">
                    <div className="main_header mb-4">
                        <h1 className='text-capitalize'>List of reviews</h1>
                    </div>
                    <Row>

                        {reviews && reviews.map((review) => (
                            <Col key={review._id} lg={6} md={12} className='mb-4'>
                                <Card className="review_content">
                                    <Card.Body>
                                        <Card.Title className='review_header'>{review.mediaTitle}</Card.Title>
                                        <Card.Text className='review_para'>{review.content}</Card.Text>
                                    </Card.Body>
                                </Card>
                              
                            </Col>
                        ))}
                    </Row>
                    <Link className='fav-links text-decoration-none' to={`/admin/users/${userId}/favorites`} > View Favorites </Link>
                </div>
            </Container>
        </section>
    );
};

export default MovieReviews;
