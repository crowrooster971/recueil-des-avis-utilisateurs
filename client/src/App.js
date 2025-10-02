import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AvisForm from './components/AvisForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/soumettre-avis" component={AvisForm} />
      </Switch>
    </Router>
  );
}

export default App;