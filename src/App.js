import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './containers/Home';
import Post from './containers/Post';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:subject/:id">
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
