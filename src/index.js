import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import ShowDates from './components/ShowDates';
import ShowStrings from './components/ShowStrings';
import CreateStringEntry from './components/CreateStringEntry';
import CreateDateEntry from './components/CreateDateEntry';
import EditStringEntry from './components/EditStringEntry';
import EditDateEntry from './components/EditDateEntry';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route exact path='/create' component={Create} />
        <Route exact path='/show/:id' component={Show} />
        <Route exact path='/showdates/:id' component={ShowDates} />
        <Route exact path='/showstrings/:id' component={ShowStrings} />
        <Route exact path='/showstrings/:id/createstringentry' component={CreateStringEntry} />
        <Route exact path='/showdates/:id/createdateentry' component={CreateDateEntry} />
        <Route exact path='/showstrings/:id/editstringentry/:entryId' component={EditStringEntry} />
        <Route exact path='/showdates/:id/editdateentry/:entryId' component={EditDateEntry} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();