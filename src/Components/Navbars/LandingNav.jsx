import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import "../Navbars/Landnav.css";

function LandingNav() {
  return (
    <Navbar expand="lg" className="rounded mx-2">
      <Container className="p-4 d-flex justify-content-between">
        <Navbar.Brand href="#" className="nav-bra  my-2 my-lg-0 fs-2" style={{ maxHeight: '100px', }}>
          𝐅𝐫𝐚𝐦𝐞 𝐑𝐚𝐭𝐞
        </Navbar.Brand>
        <Button variant=" nav-btn rounded-pill px-3 fw-bold fs-4 ">SIGN UP</Button>
      </Container>
    </Navbar>
  );
}

export default LandingNav;
