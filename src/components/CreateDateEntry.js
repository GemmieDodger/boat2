import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';
import DatePicker from "react-datepicker";
import './stylesheet.css';
 
import "react-datepicker/dist/react-datepicker.css";

class CreateDateEntry extends Component {

  constructor(props) {
    super(props);
    this.col = firebase.firestore().collection('trackers').doc(this.props.match.params.id).collection('entries');
    this.state = {
      date: new Date(),
      quantity: '',
      //dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
      comments: '',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleDateChange(startDate) {
    this.setState({
      date: startDate
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { date, quantity, comments } = this.state;
    this.col.add({
      date,
      quantity,
      comments
    }).then((docRef) => {
      this.setState({
        date: '',
        quantity: '',
        comments: ''
      });
      this.props.history.push(`/showdates/${this.props.match.params.id}`)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  
  render() {
    const { date, quantity, comments } = this.state;
    return (
      <div>
        <Header/>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    ADD ENTRY
                  </h3>
                </div> 
                <div className="panel-body">
                  <h4><Link to={`/showdates/${this.props.match.params.id}`} className="btn btn-primary return">Return to Tracker</Link></h4>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label for="date">Date:</label>
                      <DatePicker name="date" selected={this.state.date} value={date} onChange={this.handleDateChange} dateFormat="dd/MM/yyyy"/>
                    </div> 
                    <div className="form-group">
                      <label for="quantity">Quantity:</label>
                      <input type="number" className="form-control" name="quantity" value={quantity} onChange={this.onChange} placeholder="How many?" />                
                    </div>
                    <div className="form-group">
                      <label for="comments">Comments:</label>
                      <textArea className="form-control" name="comments" onChange={this.onChange} placeholder="any further notes?" cols="80" rows="3">{comments}</textArea>
                    </div>
                      <button type="submit"  className="btn btn-success">Submit</button>
                  
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default CreateDateEntry;