import { Tooltip } from 'antd';
import { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export const GraficoCapacidad = ({porcentajes}) => {

  console.log(porcentajes);
  
  console.log(porcentajes[0].porcentaje);



    const data = [
        { name: 'Agricultura', value: parseInt(porcentajes[0].porcentaje) },
        { name: 'Ganaderia', value: parseInt(porcentajes[1].porcentaje) },
        { name: 'Tambo', value: parseInt(porcentajes[2].porcentaje) },
        { name: 'Mixto', value: parseInt(porcentajes[3].porcentaje) },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <>
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"10px"}}>
      <PieChart width={300} height={250} margin={{ top: 13, left: 50 }}>
          <Pie
            data={data ? data : null}
            cx={100}
            cy={100}
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

    </div>
    </>
  )
}
