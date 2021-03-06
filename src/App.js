import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
     <Switch>
       <Route exact path="/" component={Home} />
       <Route component={NotFound} />
     </Switch>
    );
  }
}

export default App;
