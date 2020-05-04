import React from 'react';
import { Index } from './components';
import { GlobalProvider } from './context/Global';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Index />
      </div>
    </GlobalProvider>
  );
}

export default App;
