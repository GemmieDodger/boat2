import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
import Header from './Header';
import './stylesheet.css';

class ShowStrings extends Component {
  constructor(props) {
    super(props);
    this.col = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries');
    this.unsubscribe = null;
    this.state = {
      tracker: {},
      key: '',
      entries: [],
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
  deleteEntry(entryId){
    firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(entryId).delete().then(() => {
 
      console.log("Document successfully deleted!");
      this.props.history.push(`/showstrings/${this.props.match.params.id}`)
    }).catch((error) => {
      console.error("Error removing document: ", error);
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
  onCollectionUpdate = (querySnapshot) => {
    const entries = [];
    querySnapshot.forEach((doc) => {
      const { name, canal, closesttown ,comments } = doc.data();
      entries.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        canal,
        closesttown,
        comments,
      });
    });
    this.setState({
      entries
   });
   console.log(this.state.tracker)
   console.log(this.state.entries);
  }

//   componentDidMount() {
//     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//   }

  render() {
    return (
      <div>
        <Header/>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {this.state.tracker.title}
                  </h3>
                  <Link to={`/edit/${this.state.key}`}><h5 className="description">{this.state.tracker.description}</h5></Link>
                </div>
                <div className="panel-body">
                <div className="options">
                  <h4 className="btn btn-success"><Link to={`/showstrings/${this.props.match.params.id}/createstringentry`}>Add new entry</Link></h4>
                  <h4 className="btn btn-primary return"><Link to={`/}`}>Return to Tracker</Link></h4>
                </div>
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Canal</th>
                        <th>Closest Town</th>
                        <th>Comments</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.entries?.map(entry =>
                        <tr> 
                          <td><Link to={`/showstrings/${this.props.match.params.id}/editstringentry/${entry.key}`}>{entry.name}</Link></td>
                          <td>{entry.canal}</td>
                          <td>{entry.closesttown}</td>
                          <td>{entry.comments}</td>
                          <td><button onClick={this.deleteEntry.bind(this, entry.key).bind(this, this.state.tracker.key)} className="btn btn-danger">Delete</button></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp; */}
                  <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger delete-tracker">Delete Tracker</button>
              </div>
            </div>   
        </div>
    );
  }
}

export default ShowStrings;