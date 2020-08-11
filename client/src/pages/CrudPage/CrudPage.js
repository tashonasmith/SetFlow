import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import NavTop from '../../components/NavTop';
import GigList from "../../components/GigList"
import GigSetList from '../../components/GigSetList';
import GigInputSubmit from '../../components/GigInputSubmit'
import SetlistInputSubmit from '../../components/SetlistInputSubmit'
import AddSong from '../../components/AddSong';
import AllSetList from '../../components/AllSetList';
import SongsGigDash from '../../components/SongsGigDash';
import Loading from "../../components/Loading/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Auth0Profile from '../../components/Auth0Provider/Auth0Profile';
import API from '../../utils/API';


class CrudPage extends Component {
  state = {
    gigName: "",
    setlistName: "",
    songTitle: "",
    songArtist: "",
    gigs: [],
    setlists: [],
    songs: []
  }

  componentDidMount() {

    API.findOrCreateUserbyemail(this.props.email)
      .then(res => {
        this.setState({ gigs: res.data.gigs, setlists: res.data.setlists })
      })
    // API.getGigs()
    //   .then(res => {
    //     this.setState({ gigs: res.data })
    //     console.log(` getting gigs: ${this.state.gigs}`)
    //   })

    //   .catch(err => console.log(err));
    // API.getSetlists()
    //   .then(res => {
    //     this.setState({ setlists: res.data })
    //     console.log(` getting setlists: ${this.state.setlists}`)
    //   })
    //   .catch(err => console.log(err))
  }

  handleInput = event => {
    const { name, value } = event.target;
    console.log("EventTarget:", event.target)
    this.setState({
      [name]: value
    })
    console.log("name:", name, "value:", value)
  }

  handleGigSubmit = event => {
    event.preventDefault();
    // API.saveGig
    //const { user } = useAuth0();
    const newGig = { gigName: this.state.gigName, user: this.props.email }
    const newAllGigs = { ...this.state.gigs, newGig }
    this.setState({
      // gigName: '', //can't run an empty string until it goes into database
      gigs: newAllGigs
    })
    API.saveGig({ name: this.state.gigName, user: this.props.email })
      .then(res => console.log("response for HandleSubmit:", res.data))
      // .then(res => this.setState({ gigName: res.data }))
      // .then(res => this.loadGigs())
      .catch(err => console.log(err));

    // API.create({
    //   gigs: this.state.
    // })
    //   .then(res => this.loadGigs())
    //   .catch(err => console.log(err));
    // const newGig = { gigName: this.state.gigName }
    // console.log("this is new gig name:", newGig)
    // const allGigs = { ...this.state.gigs, newGig }
    // this.setState({
    //   gigName: "",
    //   gigs: allGigs
    // })
    // API.saveGig({
    //   gigs: this.state.gigs
    // })
    //   .then(res => this.loadGigs())
    //   .catch(err => console.log(err));
  }

  handleSetlistSubmit = event => {
    event.preventDefault();
    const newSetlist = { setlistName: this.state.setlistName, user: this.props.email }
    const newAllSetlists = { ...this.state.setlists, newSetlist }
    this.setState({
      // gigName: '', //can't run an empty string until it goes into database
      gigs: newAllSetlists
    })
      API.saveSetlist({ name: this.state.setlistName, user: this.props.email })
      .then(res => console.log("response for HandleSubmit:", res.data))
      // .then(res => this.setState({ gigName: res.data }))
      // .then(res => this.loadGigs())
      .catch(err => console.log(err));
  }

  loadSetlists = () => {
    API.getSetlistsByUser()
      .then(res =>
        this.setState({ setlists: res.data })
      )
      .catch(err => console.log(err));
  }

  loadGigs = () => {
    API.getGigsByUser()
      .then(res =>
        this.setState({ gigs: res.data })
      )
      .catch(err => console.log(err));
  }

  render() {
    console.log("THis is the CRUD email prop from auth0",this.props.email)
    return (
      <div style={{
        backgroundColor: "black",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        zIndex: "1000"
      }}>
        <NavTop />
        {/* <Auth0Profile></Auth0Profile> */}
        <Container>
          <Row>
            <Col sm="4">
              <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
                <GigList className="gigcard" handleGigClick={this.handleGigClick} gigs={this.state.gigs} setlists={this.state.setlists} currentGig={this.state.currentGig} />
                <div className="btn-title">Add Gig:</div>
                <GigInputSubmit gigSubmit={this.handleGigSubmit} gigName={this.state.gigName} onChange={this.handleInput} />
              </Card>
            </Col >
            <Col sm="4">
              <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
                <GigSetList setlists={this.state.setlists} gigs={this.state.gigs} currentGig={this.state.currentGig} handleSetlistClickGigDash={this.handleSetlistClickGigDash} />
              </Card>
            </Col>
            <Col sm="4">
              <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
                <AllSetList currentSetlist={this.state.currentSetlist} handleSetlistClickSetlistDash={this.handleSetlistClickSetlistDash} setlists={this.state.setlists} />
                </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
              <AllSetList currentSetlist={this.state.currentSetlist} handleSetlistClickSetlistDash={this.handleSetlistClickSetlistDash} setlists={this.state.setlists} />
                <SetlistInputSubmit setSubmit={this.handleSetlistSubmit} setlistName={this.state.setlistName} onChange={this.handleInput} />
              </Card>

            </Col >
            <Col sm="4">
              <Card body style={{ backgroundColor: "#080939", border: "solid 3px #cea935", color: "#cea935", margin: "20px" }}>
                <SongsGigDash data={this.state} />
              </Card>

            </Col>
            <Col sm="4">
              <AddSong />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuthenticationRequired(CrudPage, {
  onRedirecting: () => <Loading />,
});