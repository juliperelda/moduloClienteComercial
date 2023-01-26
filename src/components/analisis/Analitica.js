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
        <Card className="cardGrafico" style={{ width: "50%" }}>
          <h1 className="titulos">EVOLUCIÓN PRODUCTIVA</h1>
          <Evolucion />
        </Card>
        <Card className="cardTable" style={{ width: "50%" }}>
          <h1 className="titulos" style={{ marginBottom: "11px" }}>
            CAPACIDAD PRODUCTIVA
          </h1>
          {/* <Capacidad /> */}
        </Card>
      </div>
    </>
  );
};
export default Analitica;
