import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, Footer, Index, Recipe, ViewRecipe, RecipeCategories } from './components';
import { GlobalProvider } from './context/Global';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <div className="container relative min-h-screen mx-auto">
          <div className="content-wrap">
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route exact path="/recipes/random" component={Recipe}/>
              <Route exact path="/recipes/:id/view" component={ViewRecipe}/>
              <Route exact path="/recipes/categories" component={RecipeCategories}/>
            </Switch>
          </div>
        <Footer />
        </div> 
      </Router>
    </GlobalProvider>
  );
}

export default App;
