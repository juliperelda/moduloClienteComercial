/* eslint-disable react-hooks/exhaustive-deps */
import Card from "antd/es/card/Card";
import React, { useState, useContext, useEffect } from "react";
// import Capacidad from './capacidad/Capacidad';
import Capacidad from "../capacidad/Capacidad";
import Evolucion from "../evolucion/Evolucion";
import "./analitica.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { useHistory } from "react-router-dom";
import { NuevaCapacidad } from "../capacidad/NuevaCapacidad";
import { EditarCapacidad } from "../capacidad/EditarCapacidad";
import InfoGrafEvol from "../../ConsultasPHP/InfoGrafEvol";
// import { useNavigate } from 'react-router-dom';

const Analitica = () => {
  var objData = [];

  // const [isVista, setIsVista] = useState(false);
  // const [isVistaEditar, setIsVistaEditar] = useState(false);

  const {
    idCliente,
    infoEvo,
    setInfoEvo,
    dataContext,
    setDataContext,
    isCosecha,
    setIsCosecha,
    appStage,
    setAppStage,
  } = useContext(GlobalContext);

  let history = useHistory();

  // const addCosecha = () => {
  //     setIsVista(true);
  //     setIsVistaEditar(false);
  //     setDataContext(null)
  //     history.push("/addCapacidad");
  // };

  // const handleStage = () => {
  //     switch (appStage) {
  //       case 0:
  //       return <Capacidad />;
  //       case 1:
  //       return <EditarCapacidad />;
  //       case 2:
  //       return <NuevaCapacidad />;
  //       default:
  //       return <Capacidad />;
  //     }
  //   };

  function InfoGrafEvol(idCliente) {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch("../com_graEvolucionData.php", {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        console.log("PARA GRAFICO EVOLUCION");
        const data = resp;
        const objetoData = JSON.parse(data);
        console.log(objetoData);
        setInfoEvo(objetoData);
      });
    });
  }

  useEffect(() => {
    if (idCliente) {
        InfoGrafEvol(idCliente)
    }
    return console.log(infoEvo);
    
  }, [idCliente, infoEvo, setInfoEvo]);

  return (
    <>
      <div className="divContainer">
        <Card className="cardGrafico" style={{ width: "50%" }}>
          <h1 className="titulos">EVOLUCIÓN PRODUCTIVA</h1>
          <Evolucion />
        </Card>
        <Card className="cardTable" style={{ width: "50%" }}>
          <h1 className="titulos" style={{ marginBottom: "11px" }}>
            CAPACIDAD PRODUCTIVA
          </h1>
          {/* <div>{<>{handleStage()}</>}</div>; */}
          <Capacidad />
        </Card>
      </div>
    </>
  );
};
export default Analitica;
