import React,{ useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from '../../axios/axios'

const Favorite = () => {

    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)
  


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/v1/user/favorites', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                    }
                });
                setLoading(false)
                if (response.status === 200) {
                    setFavorites(response.data)
                    setIsFavorite(response.data.length > 0)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }
        fetchData()
    }, [])

    const deleteFavoriteMovie = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`/api/v1/user/favorite/${id}`, {
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

    }
    return (
        <section className='favorites_container py-5'>
            <Container>
                {isFavorite && favorites ? (
                    <Row className="gy-4">
                        {favorites.map((favorite) => (
                            <Col xs={12} md={6} lg={4} key={favorite.id}>
                                <div className="favorite_box p-3">
                                    <div className="left_part d-flex flex-column align-items-center">
                                        <article className='image_box'>
                                            <img 
                                                src={favorite.mediaImage.startsWith('/') ? `${favorite.mediaImage}` : favorite.mediaImage}
                                                alt="favorite_image"
                                                className='favorite_img img-fluid'
                                            />
                                        </article>
                                        <div className="movie_title py-2 px-3 text-center">
                                            <h4>{favorite.mediaTitle}</h4>
                                        </div>
                                    </div>
                                    <div className="right_part d-flex justify-content-center">
                                        <Button variant="danger" className='delete_button' onClick={() => deleteFavoriteMovie(favorite.id)}>
                                            
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No favorites available.</p>
                )}
            </Container>
        </section>
    )
}

export default Favorite