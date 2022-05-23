import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid="md">
      <Row>
        <Col></Col>
        <Col xs={6}><h1>Welcome to Rodriguez Airlines</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Card  class="shadow-lg p-3 mb-5 bg-body rounded" body>
            Hello, and welcome to the Rodriguez Airlines management app!<br></br>
            Here, you can Add, Delete, and Modify Flight information and Passenger information.
          </Card></Col>
        <Col></Col>
      </Row>
    </Container>

  );
}