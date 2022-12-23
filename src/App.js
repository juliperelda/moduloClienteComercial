
import './App.css';
import React, { useState } from 'react';
import { GlobalContext } from './context/GlobalContext';
// import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App() {

  const [dataContext, setDataContext] = useState();
  const [isCosecha, setIsCosecha] = useState();

  return (
    <GlobalContext.Provider value={{
      dataContext, setDataContext,
      isCosecha, setIsCosecha,
    }}>
      
      {/* <BrowserRouter> */}
      <AppRouter />
      {/* </BrowserRouter> */}
    </GlobalContext.Provider>
  );
}

export default App;
