import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collections(locations); //check this
    this.state = {
      name: '',
      canal: '',
      closesttown: '',
      comment: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, canal, closesttown, comment } = this.state;
    this.ref.add({
      name,
      canal,
      closesttown,
      comment
    }).then((docRef) => {
      this.setState({
        name: '',
        canal: '',
        closesttown: '',
        comment: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name, canal, closesttown, comment } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Header/>
            <h3 className="panel-title">
              ADD ENTRY
            </h3>
          </div> 
          <div className="panel-body">
            <h4><Link to={`/trackers/{this.props.match.params.id}`} className="btn btn-primary">Return to Tracker List</Link></h4>
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
                <label for="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              
                <button type="submit"  className="btn btn-success">Submit</button>
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStringEntry;