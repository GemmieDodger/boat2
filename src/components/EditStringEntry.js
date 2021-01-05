import React, { Component } from 'react';
import firebase from '../Firebase';
// import { Link } from 'react-router-dom';
import Header from './Header';
import './stylesheet.css';

class EditStringEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      canal: '',
      closesttown: '',
      comments: '',
      path: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(this.props.match.params.entryId);
    ref.get().then((doc) => {
      if (doc.exists) {
        const entry = doc.data();
        this.setState({
          key: doc.id,
          name: entry.name,
          canal: entry.canal,
          closesttown: entry.closesttown,
          comments: entry.comments,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({tracker:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, canal, closesttown, comments } = this.state;

    const updateRef = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(this.props.match.params.entryId);
    updateRef.set({
      name,
      canal,
      closesttown,
      comments
    }).then((docRef) => {
      this.setState({
        key: '',
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
    return (
      <div>
        <Header/>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    EDIT ENTRY
                  </h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label for="name">Name:</label>
                      <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder={this.state.name} />
                    </div>
                    <div className="canal">
                      <label for="description">Canal:</label>
                      <input type="text" className="form-control" name="canal" value={this.state.canal} onChange={this.onChange} placeholder={this.state.canal} />
                    </div>
                    <div className="form-group">
                      <label for="closesttown">Closest Town:</label>
                      <input type="text" className="form-control" name="closesttown" value={this.state.closesttown} onChange={this.onChange} placeholder={this.state.closesttown} />
                    </div>
                    <div className="form-group">
                      <label for="comments">Comments:</label>
                      <textarea type="text" className="form-control" name="comments" value={this.state.comments} onChange={this.onChange} placeholder={this.state.comments} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default EditStringEntry;