import { Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts';
import { GlobalContext } from '../../context/GlobalContext';

export const GraficoCapacidad = () => {


    const {
        appStage,
        setAppStage,
        infoCap, 
        setInfoCap,
        iconTable,
        setIconTable,
        isValorPorcentaje, 
        setIsValorPorcentaje,
        isPrueba, 
        setIsPrueba,
    } = useContext(GlobalContext);

    
    useEffect(() => {
      console.log("Desde GraficoCapacidad infoCap: ", infoCap)
      console.log("Desde GraficoCapacidad isPrueba: ", isPrueba)

    }, [])
    
    // const [isPruebaPorcentaje, setIsPruebaPorcentaje] = useState({
    //     porcentajeAgricultura: {name: "agriculturaPorcentaje", porcentaje: null},
    //     porcentajeGanaderia: {name: "ganaderiaPorcentaje", porcentaje: (((isPrueba[0].result.GANADERIA ? (parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0))},
    //     porcentajeTambo: {name: "tamboPorcentaje", porcentaje: null},
    //     porcentajeMixto: {name: "mixtoPorcentaje", porcentaje: null},
    // });

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
    <PieChart width={800} height={400}>
        <Pie
          data={isValorPorcentaje}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
        <Tooltip />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  )
}
