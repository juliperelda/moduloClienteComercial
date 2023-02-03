import { Tooltip } from 'antd';
import React, { useContext } from 'react'
import { Cell, Pie, PieChart } from 'recharts';
import { GlobalContext } from '../../context/GlobalContext';

export const GraficoCapacidad = () => {


    const {
        appStage,
        setAppStage,
        infoCap, 
        setInfoCap,
        isValorPorcentaje, 
        setIsValorPorcentaje
    } = useContext(GlobalContext);
    console.log("Desde GraficoCapacidad: ", infoCap)


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
