import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { CiLocationArrow1 } from 'react-icons/ci';
import axios from '../../../../axios/axios';
import { useRecoilState } from 'recoil';
import { movieDataState } from '../../../../Atoms/movieAtom';
import './AddReviews.css';

const AddReviews = () => {
  const [movie, setMovie] = useRecoilState(movieDataState);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwt_token");
    console.log(token);

    if (!token) {
      alert("Please log in to submit a review");
      setContent("");
      setRate("");
      return;
    }
console.log("hitting");
    try {
      const response = await axios.post(`/api/v1/movie/${movie.id}/reviews`, {
        content: content,
        mediaRating: rate,
        mediaTitle: movie.title
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        alert("Review posted successfully");
        setContent("");
        setRate("");
        window.location.reload();
      } else {
        console.error("Error submitting review:", response.data);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="addReviews py-4">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={12}>
            <div className="review_posting_section p-4 shadow-sm rounded">
              <h4 className="text-center text-capitalize mb-4">Post Your Reviews</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="reviewContent">

                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your reviews..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="movieRating">
                  <Form.Control
                    type="number"
                    placeholder="Rate out of 5"
                    value={rate}
                    onChange={(e) => setRate(Math.min(e.target.value, 5))}
                    required
                    max={5}
                  />
                  <Form.Text className="text-muted">Rate the movie out of 5</Form.Text>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" className="d-flex align-items-center justify-content-center w-100 rounded-pill">
                    <CiLocationArrow1 className="me-2"/> Post
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddReviews;
