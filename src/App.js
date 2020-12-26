import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('trackers');
    this.unsubscribe = null;
    this.state = {
      trackers: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const trackers = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      trackers.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      trackers
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              MY TRACKERS
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Tracker</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.trackers.map(tracker =>
                  <tr>
                    <td><Link to={`/show/${tracker.key}`}>{tracker.title}</Link></td>
                    <td>{tracker.description}</td>
                    <td>{tracker.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;