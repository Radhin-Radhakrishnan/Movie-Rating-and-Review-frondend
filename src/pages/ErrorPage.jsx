import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorPage= () =>{
  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col md={12}>
          <Card className=" text-white text-center shadow-lg p-3 mb-5 bg-danger rounded">
            <Card.Body>
              <Card.Title as="h1">Oops!</Card.Title>
              <Card.Text>
                Sorry, an unexpected error has occurred.
              </Card.Text> 
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default ErrorPage;