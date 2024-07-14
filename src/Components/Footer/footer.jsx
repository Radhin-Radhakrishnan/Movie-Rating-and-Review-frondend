import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';
import { Link } from 'react-router-dom';
import { activeLinkState } from '../../Atoms/activeLinkAtom';
import { useRecoilState } from 'recoil';

const Footer = () => {
  const [activeLink, setActiveLink] = useRecoilState(activeLinkState);

  return (
    <footer className="footer py-5 py-lg-3 px-1">
      <Container>
        <Row>
          <Col md={12}>
            <div className="footer_section py-3 py-md-3 text-center text-md-left">
              <h3 className="text-capitalize py-3">Framerate</h3>
              <p>
                Framerate offers everything you need for movie reviews, ratings, and recommendations. Dive into the newest films, uncover hidden gems, and join our lively community of movie enthusiasts to share your thoughts.
              </p>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center justify-content-md-start">
            <div className="footer_section pt-2 pb-1 py-md-3">
              <h3 className="text-capitalize py-3 text-center text-md-left">Quick Links</h3>
              <ul className="list-unstyled text-center text-md-left">
                <li className="mb-1" onClick={() => {
                  setActiveLink("home");
                  window.scrollTo(0, 0);
                }}>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li className="mb-1" onClick={() => {
                  setActiveLink("movie");
                  window.scrollTo(0, 0);
                }}>
                  <Link to={"/movies"}>Movies</Link>
                </li>
                <li className="mb-1" onClick={() => {
                  setActiveLink("reviews");
                  window.scrollTo(0, 0);
                }}>
                  <Link to={"/user/reviews"}>Reviews</Link>
                </li>
                <li className="mb-1" onClick={() => {
                  setActiveLink("favorites");
                  window.scrollTo(0, 0);
                }}>
                  <Link to={"/user/favorites"}>Favorites</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center justify-content-md-start">
            <div className="footer_section pt-2 pb-1 py-md-3">
              <h3 className="text-capitalize py-3 text-center text-md-left">Contact Us</h3>
              <p>Email: info@Framerate.com</p>
              <p>Phone: 123-456-7890</p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer_bottom">
        <Container>
          <Row>
            <Col md={12}>
              <p className="text-center mt-2 text-white">
                &copy; 2024 Framerate. All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
