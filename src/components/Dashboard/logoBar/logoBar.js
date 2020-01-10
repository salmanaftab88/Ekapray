import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from './image/logo.png';
import './css/css.css';
export default class Example extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="logo-align">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}