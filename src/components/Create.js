import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('trackers');
    this.state = {
      title: '',
      description: '',
      boat: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, boat } = this.state;
    console.log("on submit beginning")
    console.log(title, description, boat)
    this.ref.add({
      title,
      description,
      boat
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        boat: ''
      });
      this.props.history.push("/")
      console.log("on submit")
      console.log(title, description, boat)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, boat } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Header/>
            <h3 className="panel-title">
              ADD TRACKER
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Return to Tracker List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <textArea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div className="form-group">
                <label for="boat">Boat name:</label>
                <input type="text" className="form-control" name="boat" value={boat} onChange={this.onChange} placeholder="Boat Name" />
              </div>
              
                <button type="submit"  className="btn btn-success">Submit</button>
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;