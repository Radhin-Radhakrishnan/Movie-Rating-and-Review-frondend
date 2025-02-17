import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import axios from '../../axios/axios';
import './AllReviews.css';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isReview, setIsReview] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/movie/${movieId}/otherReviews`);
        setReviews(response.data.reviews);
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0) {
      setIsReview(true);
    }
  }, [reviews]);

  useEffect(() => {
    console.log({ users });
  }, [users]);

  return (
    isReview ? (
      <section className='othersReview_section py-5'>
        <Container>
          <Row>
            <Col>
              <h1 className='text-capitalize main_header mb-4'>Others Reviews</h1>
            </Col>
          </Row>
          <Row>
          
            {reviews.map((review) => {
              let user = null;
              for (const usersArray of users) {
                user = usersArray.find((u) => u.id === review.user);
                if (user) break;
              }
              console.log("User found:", user);
              const firstName = user ? user.firstName : "Unknown User";

              return (
                <Col xs={12} className="mb-4" key={review._id}>
                  <div className="othersReview_content p-3">
                    <div className="header d-flex align-items-center mb-3">
                   
                      <div>
                        <h3 className='text-capitalize'>{firstName}</h3>
                        <p>Critic's Rating: {review.mediaRating}/5</p>
                      </div>
                    </div>
                    <div className="para">
                      <p>{review.content}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    ) : null
  );
};

export default AllReviews;
