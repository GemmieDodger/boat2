import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';
import Header from './Header';
import './stylesheet.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

class ShowDates extends Component {
  if 
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
//delete tracker
  delete(id){
    firebase.firestore().collection('trackers').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  deleteEntry(entryId){
    firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(entryId).delete().then(() => {
 
      console.log("Document successfully deleted!");
      this.props.history.push(`/showdates/${this.props.match.params.id}`)
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const entries = []; 
    querySnapshot.forEach((doc) => {

      const { 
        quantity, 
        comments } = doc.data();
        const date = new Date(doc.data().date.seconds*1000).toLocaleDateString("en-IN");
      entries.push({
        key: doc.id,
        doc, // DocumentSnapshot
        date,
        quantity,
        comments,
      });
    });
    this.setState({
      entries
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
                    {this.state.tracker.title}
                  </h3>
                  <Link to={`/showdates/${this.props.match.params.id}/edit/${this.state.key}`}><h5 className="description">{this.state.tracker.description}</h5></Link>
                </div>
                <div className="panel-body">
                <div className="options">
                  <h4 className="btn btn-success"><Link to={`/showdates/${this.props.match.params.id}/createdateentry`}>Add new entry</Link></h4>
                  <h4 className="btn btn-primary return"><Link to={`/}`} >Return to Tracker</Link></h4>
                </div>
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Comments</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.entries?.map(entry =>
                        <tr>
                          <td><Link to={`/showdates/${this.props.match.params.id}/editdateentry/${entry.key}`}>{entry.date}</Link></td>
                          <td>{entry.quantity}</td>
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


export default ShowDates;