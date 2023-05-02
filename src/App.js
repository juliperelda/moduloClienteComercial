import "./App.css";
import React, { useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Analitica from './components/analisis/Analitica';

function App() {
  const [dataContext, setDataContext] = useState({
    agricultura: "",
      agriculturaA: "",
      ganaderia: "",
      ganaderiaA: "",
      tambo: "",
      tamboA: "",
      mixto: "",
      mixtoA: "",
      cosecha: ""
  });
  const [isCosecha, setIsCosecha] = useState();
  const [appStage, setAppStage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonEditDisabled, setIsButtonEditDisabled] = useState(true);
  const [isSelectEditDisabled, setIsSelectEditDisabled] = useState(false);

  //* Id de cliente que se obtine desde local storage
  const idC = localStorage.getItem("cliente");
  const [idCliente, setIdCliente]=useState(idC);
  // const [idCliente, setIdCliente]=useState('2049');

  //! ESTADOS QUE ALMACENAN INFO QUE SE TRAE DESDE BASE DE DATOS
  const [infoEvo, setInfoEvo]=useState({});
  const [infoRubros, setInfoRubros]=useState({});
  const [infoCap, setInfoCap]=useState({});
  const [infoCosechas, setCosechas]=useState([]);
  const [infoEdit, setInfoEdit]=useState({});
  const [update, setUpdate] = useState(false);
  const [iconTable, setIconTable] = useState(false);

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
      idCliente, setIdCliente,
      infoCosechas,setCosechas,
      infoEdit, setInfoEdit,
      update, setUpdate,
      isSelectEditDisabled, setIsSelectEditDisabled,
      iconTable, setIconTable,
    }}>
      
      <Analitica/>

    </GlobalContext.Provider>
  );
}


export default App;
