import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, Footer, Index, Recipe, ViewRecipe } from './components';
import { GlobalProvider } from './context/Global';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <div className="container mx-auto">
          <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/recipes/:id" component={Recipe}/>
            <Route exact path="/recipes/:id/view" component={ViewRecipe}/>
          </Switch>
        </div> 
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
