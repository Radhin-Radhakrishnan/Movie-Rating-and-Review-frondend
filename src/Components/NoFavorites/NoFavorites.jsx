import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './NoFavorites.css';
import { Link } from 'react-router-dom';

const NoFavorites = () => {
  return (
    <div className='noFavorite_section'>
      <Container fluid className='d-flex justify-content-center align-items-center'>
        <div className='content'>
          <h1>No favorite movies have been added yet!</h1>
          <p>Browse through our collection and add your favorite movies to your list.</p>
          <Link to="/movies">
            <Button className='btn rounded-pill'>Browse Movies</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NoFavorites;
