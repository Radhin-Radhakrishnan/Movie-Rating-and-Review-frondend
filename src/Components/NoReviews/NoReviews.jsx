import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './NoReview.css';
import { Link } from 'react-router-dom';

const NoReviews = () => {
  return (
    <div className='noReview_section pb-5'>
      <Container className='d-flex justify-content-center align-items-center pb-5'>
        <div className='content'>
          <h1>No Reviews have been added yet!</h1>
          <p>Be the first to review your favorite movies and share your thoughts with the community.</p>
        </div>
      </Container>
    </div>
  );
};

export default NoReviews;
