import React, { Component } from 'react';
import firebase from '../Firebase';
// import { Link } from 'react-router-dom';
import Header from './Header';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      boat: '',
      path: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('trackers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const tracker = doc.data();
        this.setState({
          key: doc.id,
          title: tracker.title,
          description: tracker.description,
          boat: tracker.boat
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, boat } = this.state;

    const updateRef = firebase.firestore().collection('trackers').doc(this.state.key);
    updateRef.set({
      title,
      description,
      boat
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        boat: ''
      });
      if (this.state.title === 'location') {
        this.setState({
          path: 'showstrings',
        }) 
      } else {
        this.setState({
          path: 'showdates',
        })
          
      }
      this.props.history.push(`/${this.state.path}/${this.props.match.params.id}`)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Header/>
            <h3 className="panel-title">
              EDIT TRACKER
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="title">Title:</label>
                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder={this.state.title} />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder={this.state.description} />
              </div>
              <div className="form-group">
                <label for="boat">Boat name:</label>
                <input type="text" className="form-control" name="boat" value={this.state.boat} onChange={this.onChange} placeholder={this.state.boat} />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;