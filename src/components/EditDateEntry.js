import React, { Component } from 'react';
import firebase from '../Firebase';
// import { Link } from 'react-router-dom';
import Header from './Header';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class EditDateEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      date: Date(),
      quantity: '',
      comments: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(this.props.match.params.entryId);
    ref.get().then((doc) => {
      if (doc.exists) {
        const entry = doc.data();
        this.setState({
          key: doc.id,
          date: entry.date,
          quantity: entry.quantity,
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

    const { date, quantity, comments } = this.state;

    const updateRef = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries').doc(this.props.match.params.entryId);
    updateRef.set({
      date,
      quantity,
      comments
    }).then((docRef) => {
      this.setState({
        key: '',
        date: '',
        quantity: '',
        comments: ''
      });
      this.props.history.push(`/showDates/${this.props.match.params.id}`)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Header/>
            <h3 className="panel-title">
              EDIT ENTRY
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label for="date">Date:</label>
                <DatePicker name="date" selected={this.state.date} value={this.state.date} onChange={this.handleDateChange} dateFormat="dd/MM/yyyy"/>
              </div> 
              <div className="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChange} placeholder={this.state.quantity} />                
              </div>
              <div className="form-group">
                <label for="comments">Comments:</label>
                <textarea className="form-control" name="comments" onChange={this.onChange} cols="80" rows="3" placeholder={this.state.comments}/>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDateEntry;