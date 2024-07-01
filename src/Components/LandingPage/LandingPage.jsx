import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LandingNav from '../Navbars/LandingNav';
import '../LandingPage/LandingPage.css';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className='bg'>
        <LandingNav />
        <Container className="d-flex justify-content-center align-items-center py-5">
          <Row className="main-content py-md-5 text-center">
            <Col xs={12} className="py-1">
              <h1 className='land-h1 text-capitalize pt-md-5'>
                Unlock your movie marathon.<span className='h1-main'> Unlimited & reviewed.</span>
              </h1>
            </Col>
            <Col xs={12}>
              <p className='p_main text-capitalize pt-md-2'>
                Review revolution! Join the movement. Read insightful reviews, write your own, and make a difference in the movie community.
              </p>
            </Col>
            <Col xs={12} className="text-center mt-4">
              <Button className='btn-land text-decoration px-3 py-2 fs-3 fw-bolder' onClick={() => navigate('/home')}>
                Explore Now
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="fea-main px-4 py-5">
        <Row className="fea-content d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 gap-lg-0 py-5">
          <Col xs={12} lg={6} className="text-center text-white">
            <h3 className='features'>Reviews for everything. Explore a universe of opinions.</h3>
          </Col>
          <Col xs={12} lg={6} className="text-center">
            <img 
              src="https://st3.depositphotos.com/1688079/13153/i/450/depositphotos_131534948-stock-photo-movie-reviews-yellow-square-button.jpg" 
              alt="image" 
              className="main-img img-fluid" 
            />
          </Col>
        </Row>
        
        <Row className="fea-content d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 gap-lg-0 mt-5 py-5">
          <Col xs={12} lg={6} className="order-lg-2 text-center text-lg-start">
            <h3 className='features'>You can choose your favorite movie.</h3>
          </Col>
          <Col xs={12} lg={6} className="order-lg-1 text-center">
            <img 
              src="https://previews.123rf.com/images/christitze/christitze1702/christitze170218187/72547698-favorites-red-text-on-typography-background-3d-rendered-royalty-free-stock-image-this-image-can-be.jpg" 
              alt="image" 
              className="main-img img-fluid" 
            />
          </Col>
        </Row>
        
        <Row className="fea-content d-flex flex-column flex-lg-row justify-content-around align-items-center gap-4 gap-lg-0 mt-5">
          <Col xs={12} lg={6} className="text-center">
            <h3 className='features'>Everyone can create an account.</h3>
          </Col>
          <Col xs={12} lg={6} className="text-center">
            <img 
              src="https://cdn.pixabay.com/photo/2023/09/22/12/18/profile-8268938_960_720.png" 
              alt="image" 
              className="main-img img-fluid mt-3 mb-3" 
            />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default LandingPage;
