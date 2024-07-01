import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import './Favorite.css'
import axios from '../../axios/axios'
import { imageUrl } from '../../urls/urls'
import NoFavorites from '../NoFavorites/NoFavorites'
import Preloader from '../Preloader/Preloader'


const Favorite = () => {

    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(true);


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
            // Display an error message to the user or handle the error appropriately
            alert("An error occurred while deleting the review. Please try again.");
        }

    }
    return (
        <section className='favorites_container py-5'>
            {loading && <Preloader />}
            {!loading && (
                <Container>
                    {isFavorite ? (
                        favorites && favorites.map((favorite) => (
                            <Row className='favorite_box' key={favorite.id}>
                                <Col lg={4} sm={12} className='my-4'>
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={favorite.mediaImage.startsWith('/') ? `${imageUrl}${favorite.mediaImage}` : favorite.mediaImage}
                                            alt="favorite_image"
                                            className='favorite_img'
                                        />
                                    </Card>
                                </Col>
                                <Col lg={8} sm={12} className='d-flex flex-column justify-content-between mt-3'>
                                    <div>
                                        <h4 className='movie_title'>{favorite.mediaTitle}</h4>
                                       
                                    </div>
                                    <Button
                                        className='delete_button align-self-end mt-3 mb-4 mt-lg-0'
                                        onClick={() => deleteFavoriteMovie(favorite._id)}
                                    >
                                        <MdDeleteOutline className="delete_icon" />
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <NoFavorites />
                    )}
                </Container>
            )}
        </section>
    )
}

export default Favorite