import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { activeLinkState } from '../../Atoms/activeLinkAtom';
import { Container, Navbar } from 'react-bootstrap';
import '../Navbars/Landnav.css';

function LandingNav() {
  const [activeLink, setActiveLink] = useRecoilState(activeLinkState);

  return (
    <Navbar expand="lg" className="display-inline-block">
      <Container className="p-4 d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#" className="nav-bra my-2 my-lg-0 fs-3" style={{ maxHeight: '100px' }}>
          𝐅𝐫𝐚𝐦𝐞 𝐑𝐚𝐭𝐞
        </Navbar.Brand>
        <Link
          to="/login"
          className="nav-btn text-decoration-none rounded-pill px-3 py-2 fw-bold fs-4"
          onClick={() => setActiveLink('login')}
        >
          SIGN IN
        </Link>
      </Container>
    </Navbar>
  );
}

export default LandingNav;
