/* eslint-disable react-hooks/exhaustive-deps */
import Card from "antd/es/card/Card";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Capacidad from "../capacidad/Capacidad";
import Evolucion from "../evolucion/Evolucion";
import "./analitica.css";

const Analitica = () => {

  const URL = process.env.REACT_APP_URL;

  const {
    idCliente,
    setIdCliente,
    setCosechas,
    update,
  } = useContext(GlobalContext);

  // setIdCliente('2049'); // Es para probar de forma local.

  const [listCosechas, setListCosechas] = useState([])
  const [cosechaA, setCosechaA] = useState('')
  useEffect(() => {
    const data = new FormData();
    // data.append("idC", idCliente);
    // fetch("../com_traerCosechas.php", {
    fetch(`${URL}com_traerCosechas.php`, {
      method: "POST",
      body: data,
    }).then(async function (response) {
      await response.text().then((resp) => {
        if (resp) {
          const data = resp;
          const objetoData = JSON.parse(data);
          // console.log('objetoData: ', objetoData)
          // setCosechas(objetoData);
          setCosechaA(objetoData[0].acos_desc)
          setListCosechas(objetoData);
        }
      });
    });
    // localStorage.setItem("idCosechaSelec", cosechaA);

  }, [update, idCliente])


  return (
    <>
      <div className="divContainer">
        <Card className="cardGrafico" style={{ width: "50%", height: "300px" }}>
          <h1 className="titulos">EVOLUCIÓN PRODUCTIVA</h1>
          <Evolucion />
        </Card>
        <Card className="cardTable" style={{ width: "50%", height: "300px" }}>
          {listCosechas && cosechaA && <Capacidad listadoCosechas={listCosechas} cosechaActiva={cosechaA} />}
        </Card>
      </div>
    </>
  );
};
export default Analitica;
