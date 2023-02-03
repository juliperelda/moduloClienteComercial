/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GlobalContext } from "../../context/GlobalContext";

const Evolucion = () => {
  const { idCliente, infoEvo, setInfoEvo, update, setUpdate } = useContext(GlobalContext);

  const [isDataStorage, setIsDataStorage] = useState([]);

  const [sortedData, setSortedData] = useState([]);


  useEffect(() => {
    const fetchData = () => {
      if (localStorage.getItem("data")) {
        // Make a copy of the data from local storage and sort it in ascending order by the value of the 'cosecha' key
        const data = [...JSON.parse(localStorage.getItem("data")).objData];
        const sortedData = data.sort((a, b) => a.cosecha - b.cosecha);
        setIsDataStorage(data);
        setSortedData(sortedData);
      } else {
        setSortedData(null);
      }
    };
    fetchData();
  }, []);
  /* FIN Probando ordenar de menor a mayor*/

  // Armo un array con lo que recupero del localstorage
  const arrayData = [];
  /*USO EL sortedData para ordenar de mayor y menor y para que funcione la animacion de los graficos*/
  if (sortedData) {
    sortedData.forEach(function (data) {
      arrayData.push(data);
    });
  }

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
        {value}
      </text>
    );
  };

  /*-----------------------------------*/
  const [isValorPropias, setIsValorPropias] = useState(true);
  const [isValorAlquiladas, setIsValorAlquiladas] = useState(true);
  /*-----------------------------------*/

  const handleLegendClick = (x) => {
    console.log(x);
    console.log("click");
    if (x.value === "Propias") {
      console.log("seleccionaste propias");
      setIsValorPropias(!isValorPropias);
    }

    if (x.value === "Alquiladas") {
      console.log("seleccionaste alquiladas");
      setIsValorAlquiladas(!isValorAlquiladas);
    }
  };
  /*-----------------------------------*/

  //*Llama y trae los datos de la consulta php

  function InfoGrafEvol(idCliente) {
    const data = new FormData();
    data.append("idC", idCliente);
    fetch("../com_graEvolucionData.php", {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        var objetoData = JSON.parse(data);
        setInfoEvo(objetoData);
      });
    });
  }

  useEffect(() => {
    if (idCliente) {
      InfoGrafEvol(idCliente);
    }
  }, [idCliente, update]);


  const [dataForChart, setDataForChart] = useState([]);

  useEffect(() => {
    if (infoEvo.length > 0) {
      setDataForChart(
        infoEvo.map((item) => {
          var suma = Math.trunc(item.ahxs_propias) + Math.trunc(item.ahxs_alquiladas);
          console.log(suma);
          return {
            cosecha: item.acos_desc,
            propias: item.ahxs_propias,
            alquiladas: item.ahxs_alquiladas,
            total: Math.trunc(item.ahxs_propias) + Math.trunc(item.ahxs_alquiladas),
          };
        })
      );
    }
  }, [infoEvo]);

  const getIntroOfPage = (valor0, valor1) => {
    var suma = Math.trunc(valor0) + Math.trunc(valor1);
      return suma;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{border:"3px solid #fafafa", backgroundColor:"#FFFF", padding:"10px"}}>
          <p className="label" style={{fontWeight:"600"}}>{`Cosecha: ${label}`}</p>
          <p className="propias" style={{color:"#a3ef95",fontWeight:"600"}}>{`Propias: ${payload[0].value}`}</p>
          <p className="alquiladas" style={{color:"#434348",fontWeight:"600"}}>{`Alquiladas: ${payload[1].value}`}</p>
          <p className="total" style={{color:"grey",fontWeight:"600"}}>{"Total: " + getIntroOfPage(payload[0].value,payload[1].value)}</p>
          {/* <p className="total" style={{color:"grey"}}>{getIntroOfPage(label)}</p> */}
        </div>
      );
    }
  
    return null;
  };



  return (
    <>
      <ResponsiveContainer className="" width="100%" height={/*400*/ 250}>
        <BarChart
          width={500}
          height={300}
          data={dataForChart} //ORIGINAL
          // data={data} // PRUEBA
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cosecha" />
          <YAxis
            label={{ value: "Has.", angle: -90, position: "insideLeft" }}
          />
          <Tooltip 
          content={CustomTooltip}
          />
          <Legend
            iconType="circle"
            onClick={(x) => handleLegendClick(x)}
            wrapperStyle={{ fontWeight: "bold", color: "#000000" }}
          />
          {isValorPropias ? (
            <Bar
              dataKey="propias"
              name="Propias"
              stackId="a"
              barSize={50}
              fill="#a9ff96"
              key={"propias"}
              //label={renderCustomBarLabel}
              isAnimationActive={true}
            />
          ) : (
            <Bar
              dataKey={0}
              name="Propias"
              stackId="a"
              barSize={50}
              fill="#a9ff96"
              key={"propias"}
              //label={renderCustomBarLabel}
              isAnimationActive={true}
            />
          )}
          {isValorAlquiladas ? (
            <Bar
              dataKey="alquiladas"
              name="Alquiladas"
              stackId="a"
              barSize={50}
              fill="#434348"
              key={"alquiladas"}
              //label={renderCustomBarLabel}
              isAnimationActive={true}
            />
          ) : (
            <Bar
              dataKey={0}
              name="Alquiladas"
              stackId="a"
              barSize={50}
              fill="#434348"
              key={"alquiladas"}
              //label={renderCustomBarLabel}
              isAnimationActive={true}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Evolucion;
