import React, { Component } from 'react';
import NavTop from '../components/NavTop';
import { Container, Row, Col, Card } from 'reactstrap';
import GigSetList from '../components/GigSetList';
import Lyrics from '../components/Lyrics'
import Loading from "../components/Loading/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Auth0Profile from '../components/Auth0Provider/Auth0Profile';
import API from '../utils/API';

class LaunchedPage extends Component {
  state = {
    gigs: [],
    setlists: [],
    songs: []
  }

  componentDidMount() {
    API.getGigs()
      .then(res => this.setState({ gigs: res.data }))
      .catch(err => console.log(err));
    API.getSetlists()
      .then(res => this.setState({ setlists: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <NavTop />
        <Container>
          <Row>
            <Col sm="4">
            <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
              <GigSetList data={this.state} />
            </Card>
            </Col>

            <Col>
              <Lyrics data={this.state} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default withAuthenticationRequired(LaunchedPage, {
  onRedirecting: () => <Loading />,
});


