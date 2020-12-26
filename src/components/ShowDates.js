import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
import Header from './Header';

class ShowDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracker: {},
      key: ''
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
//   onCollectionUpdate = (querySnapshot) => {
//     const trackers = [];
//     querySnapshot.forEach((doc) => {
//       const { title, description, author } = doc.data();
//       trackers.push({
//         key: doc.id,
//         doc, // DocumentSnapshot
//         title,
//         description,
//         author,
//       });
//     });
//     this.setState({
//       trackers
//    });
//   }

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
          </div>
          <div className="panel-body">
            <h4><Link to="/createDateEntry">Add new entry</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Comment</th>
                </tr>
              </thead>
              {/* <tbody>
                {this.state.tracker.entries.map(entry =>
                  <tr>
                    <td><Link to={`${this.state.tracker.key}/showDates/${entry.key}`}>{entry.date}</Link></td>
                    <td>{entry.comment}</td>
                  </tr>
                )}
              </tbody> */}
            </table>
          </div>
          <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  }
}

export default ShowDates;