import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

class CreateStringEntry extends Component {

  constructor(props) {
    super(props);
    this.col = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries');
    this.state = {
      name: '',
      canal: '',
      closesttown: '',
      comments: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, canal, closesttown, comments } = this.state;
    this.col.add({
      name,
      canal,
      closesttown,
      comments
    }).then((docRef) => {
      this.setState({
        name: '',
        canal: '',
        closesttown: '',
        comments: ''
      });
      this.props.history.push(`/showStrings/${this.props.match.params.id}`)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name, canal, closesttown, comments } = this.state;
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
            <h4><Link to={`/trackers/${this.props.match.params.id}`} className="btn btn-primary">Return to Tracker</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="name">Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label for="canal">Canal:</label>
                <input type="text" className="form-control" name="canal" value={canal} onChange={this.onChange} placeholder="Canal" />                
              </div>
              <div className="form-group">
                <label for="closesttown">Closest Town:</label>
                <input type="text" className="form-control" name="closesttown" value={closesttown} onChange={this.onChange} placeholder="Closest Town" />
              </div>
              <div className="form-group">
                <label for="comments">Comments:</label>
                <textArea className="form-control" name="comments" onChange={this.onChange} placeholder="Comments" cols="80" rows="3">{comments}</textArea>
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