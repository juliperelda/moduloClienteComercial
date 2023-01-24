import "./App.css";
import React, { useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Analitica from './components/analisis/Analitica';

function App() {
  const [dataContext, setDataContext] = useState();
  const [isCosecha, setIsCosecha] = useState();
  const [appStage, setAppStage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonEditDisabled, setIsButtonEditDisabled] = useState(true);

  //* Id de cliente que se obtine desde local storage
  const idC = localStorage.getItem("cliente");
  const [idCliente, setIdCliente]=useState(idC);

  //! ESTADOS QUE ALMACENAN INFO QUE SE TRAE DESDE BASE DE DATOS
  const [infoEvo, setInfoEvo]=useState({});
  const [infoRubros, setInfoRubros]=useState({});
  const [infoCap, setInfoCap]=useState({});

  // setTimeout(() => {
    
  //   const getInfoGrafEvol = (idC) => {
  //     const data = new FormData();
  //     data.append("idC", idC);
  //     fetch("../com_graEvolucionData.php", {
  //         method: "POST",
  //         body: data,
  //     }).then(function (response) {
  //         response.text().then((resp) => {
  //         console.log("PARA GRAFICO EVOLUCION");
  //         const data = resp;
  //         const objetoData = JSON.parse(data);
  //         //console.log(objetoData);
  //         setInfoEvo(objetoData)
  //         });
  //     });
  //   };
  //   getInfoGrafEvol(idCliente);
  //   console.log(infoEvo);    
  // }, 1);




  return (
    <GlobalContext.Provider value={{
      dataContext, setDataContext,
      isCosecha, setIsCosecha,
      appStage, setAppStage,
      isButtonDisabled, setIsButtonDisabled, 
      isButtonEditDisabled, setIsButtonEditDisabled,
      infoEvo, setInfoEvo,
      infoRubros, setInfoRubros,
      infoCap, setInfoCap,
      idCliente, setIdCliente
    }}>
      
      <Analitica/>

    </GlobalContext.Provider>
  );
}


export default App;
