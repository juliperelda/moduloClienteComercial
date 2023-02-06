import { Tooltip } from 'antd';
import { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export const GraficoCapacidad = ({porcentajes}) => {

  console.log(porcentajes);
  
  console.log(porcentajes[0].porcentaje);



    const data = [
        { name: 'Agricultura', value: porcentajes[0].porcentaje },
        { name: 'Ganaderia', value: porcentajes[1].porcentaje },
        { name: 'Tambo', value: porcentajes[2].porcentaje },
        { name: 'Mixto', value: porcentajes[4].porcentaje },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
    <PieChart width={800} height={400}>
        <Pie
          data={data}
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
