import React, { Component } from 'react';
import NavTop from '../components/NavTop';
import { Container, Row, Col } from 'reactstrap';
import GigSetList from '../components/GigSetList';
import Lyrics from '../components/Lyrics'

const LaunchedPage = () => {
    return (
      <div>
        <NavTop />
        <Container>
        <Row>
          <Col sm="4">
           <GigSetList/>
          </Col>
          <Col>
          <Lyrics/>
          </Col>
        </Row>
        </Container>
      </div>
    );
  };


export default LaunchedPage;

