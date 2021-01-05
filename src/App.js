import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('trackers');
    this.unsubscribe = null;
    this.state = {
      trackers: [],
      path: '',
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const trackers = [];
    querySnapshot.forEach((doc) => {
      const { title, description, boat } = doc.data();
      trackers.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        boat,
      });
    });
    console.log(trackers);
    this.setState({
      trackers
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

 checkType(key, title) {
    if (title === 'Location') {
      console.log(title)
        this.setState({
          path: `/showstrings/${key}`})
      } else {
        this.setState({
          path: `/showdates/${key}`})
    }
  }

  render() {
    return (
      <div>
        <Header/>
          
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    MY TRACKERS
                  </h3>
                </div>
                <div className="panel-body">
                  <h4 className="btn btn-success"><Link to="/create">Add Tracker</Link></h4>
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Boat Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.trackers.map(tracker =>
                        <tr>
                          <td><Link onClick={
                            () => this.checkType(tracker.key, tracker.title)} to={this.state.path}>
                            {tracker.title}</Link></td>
                          <td>{tracker.description}</td>
                          <td>{tracker.boat}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        
      </div>
    );
  }
}

export default App;