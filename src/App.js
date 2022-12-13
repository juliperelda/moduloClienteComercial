
import './App.css';
import React, { useState } from 'react';
import Analitica from './components/analisis/Analitica';
import { GlobalContext } from './context/GlobalContext';


function App() {

  const [dataContext, setDataContext] = useState();
  const [isCosecha, setIsCosecha] = useState();

  return (
    <GlobalContext.Provider value={{ dataContext, setDataContext, isCosecha, setIsCosecha }}>
      <Analitica />
    </GlobalContext.Provider>
  );
}

export default App;
