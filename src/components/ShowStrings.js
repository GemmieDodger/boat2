import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
import Header from './Header';

class ShowStrings extends Component {
  constructor(props) {
    super(props);
    this.col = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('locations');
    this.unsubscribe = null;
    this.state = {
      tracker: {},
      key: '',
      locations: [],
    };
  }
//check tracker exists + set state
  componentDidMount() {
    const ref = firebase.firestore().collection('trackers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          tracker: doc.data(),
          key: doc.id,
          isLoading: false
        });        

      } else {

        console.log("No such document!");
      }
    });
    this.unsubscribe = this.col.onSnapshot(this.onCollectionUpdate);
  }
//delete tracker
  delete(id){
    firebase.firestore().collection('trackers').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  onCollectionUpdate = (querySnapshot) => {
    const locations = [];
    querySnapshot.forEach((doc) => {
      const { name, canal, closesttown ,comments } = doc.data();
      locations.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        canal,
        closesttown,
        comments,
      });
    });
    this.setState({
      locations
   });
   console.log(this.state.tracker)
   console.log(this.state.locations);
  }

//   componentDidMount() {
//     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//   }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Header/>
            <h3 className="panel-title">
              {this.state.tracker.title}
            </h3>
            <Link to={`/edit/${this.state.key}`}><h5>{this.state.tracker.description}</h5></Link>
          </div>
          <div className="panel-body">
            <h4><Link to={`/showstrings/${this.props.match.params.id}/createstringentry`}>Add new entry</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Canal</th>
                  <th>Closest Town</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {this.state.locations?.map(location =>
                  <tr>
                    <td><Link to={`${this.state.tracker.key}/locations/${location.key}`}>{location.name}</Link></td>
                    <td>{location.canal}</td>
                    <td>{location.closesttown}</td>
                    <td>{location.comments}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp; */}
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete Tracker</button>
        </div>
      </div>
    );
  }
}

export default ShowStrings;