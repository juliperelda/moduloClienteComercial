import "./App.css";
import React, { useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
// import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Analitica from './components/analisis/Analitica';
import Capacidad from './components/capacidad/Capacidad';
import { EditarCapacidad } from './components/capacidad/EditarCapacidad';
import { NuevaCapacidad } from './components/capacidad/NuevaCapacidad';

function App() {
  const [dataContext, setDataContext] = useState();
  const [isCosecha, setIsCosecha] = useState();
  const [appStage, setAppStage] = useState();



  // const handleStage = () => {
  //   switch (appStage) {
  //     case 0:
  //     return <Analitica />;
  //     case 1:
  //     return <EditarCapacidad />;
  //     case 2:
  //     return <NuevaCapacidad />;
  //     default:
  //     return <Analitica />;
  //   }
  // };


  return (
    <GlobalContext.Provider value={{
      dataContext, setDataContext,
      isCosecha, setIsCosecha,
      appStage, setAppStage,
    }}>
      
      {/* <div>{<>{handleStage()}</>}</div>; */}
      {/* <BrowserRouter> */}
      {/* <AppRouter /> */}
      <Analitica/>
      {/* </BrowserRouter> */}

    </GlobalContext.Provider>
  );
}
export default App;
