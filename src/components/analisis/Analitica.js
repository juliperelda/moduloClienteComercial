/* eslint-disable react-hooks/exhaustive-deps */
import Card from "antd/es/card/Card";
import React from "react";
import Capacidad from "../capacidad/Capacidad";
import Evolucion from "../evolucion/Evolucion";
import "./analitica.css";

const Analitica = () => {
  return (
    <>
      <div className="divContainer">
        <Card className="cardGrafico" style={{ width: "50%", height: "300px" }}>
          <h1 className="titulos">EVOLUCIÓN PRODUCTIVA</h1>
          <Evolucion />
        </Card>
        <Card className="cardTable" style={{ width: "50%", height: "300px" }}>
          <Capacidad />
        </Card>
      </div>
    </>
  );
};
export default Analitica;
