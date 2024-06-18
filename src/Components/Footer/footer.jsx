import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import "../Footer/footer.css"

const Footer = () => {
  return (
    <footer className="footer position-relative py-5 px-3">
    <Container className='text-white'>
      <Row>
        <Col xs={12} md={12} className="mb-4">
          <div className="footer_section text-center">
            <h3 className="text-capitalize py-3">FrameRate</h3>
            <p>
              Framerate is your go-to destination for movie reviews, ratings, and recommendations.
              Explore the latest movies, discover hidden gems, and share your thoughts with our vibrant community of movie enthusiasts.
            </p>
          </div>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <div className="footer_section">
            <h3 className="text-capitalize py-3">Quick Links</h3>
            <ul className="list-unstyled">
              <li className="mb-1">Home</li>
              <li className="mb-1">Movies</li>
              <li className="mb-1">Reviews</li>
              <li className="mb-1">Favorites</li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <div className="footer_section">
            <h3 className="text-capitalize py-3">Contact Us</h3>
            <p>Email: info@framerate.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </Col>
      </Row>
    </Container>
    <div className="footer_bottom py-3">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <p className="mt-2 text-white">
              &copy; 2024 FrameRate . All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="custom-shape-divider-bottom">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
    </div>
  </footer>
  )
}

export default Footer