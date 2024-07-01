import React, { useEffect, useState } from 'react'

import './ListOfReview.css'
import { Container,Button } from 'react-bootstrap'
import axios from '../../axios/axios'
import NoReviews from '../NoReviews/NoReviews'
import Preloader from '../Preloader/Preloader'

const ListOfReview = () => {

  const [reviews, setReviews] = useState([])
  const [isReview, setIsReview] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/v1/user/reviews', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
          }
        })
        setLoading(false)
        setReviews(response.data)
        setIsReview(response.data.length > 0)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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

    <section className='listOfReview_section pt-5 px-5 pb-5' >
      {
        loading && (
          <Preloader />
        )
      }
      {
        !loading && (


          <Container>
            <h1 className='review_header text-start text-sm-center'>Your Reviews</h1>
            {
              isReview ? (
                reviews && reviews.map((review) => {
                  return (
                    <div className="listOfReview_box d-flex flex-column  justify-content-start align-items-start gap-2 pt-5  pb-sm-4" key={review._id}>
                      <div className="first_part">

                        <h2 className=''>{review.mediaTitle}</h2>
                      </div>

                      <div className="second_part flex-0.5 py-sm-3">
                        <p>{review.content}</p>
                      </div>
                      <Button className="delete_button" onClick={() => handleDeleteMovie(review._id)}>Delete
                                              </Button>
                    </div>

                  )
                })


              ) : <NoReviews />

            }


          </Container>
        )
      }
    </section >




  )
}

export default ListOfReview