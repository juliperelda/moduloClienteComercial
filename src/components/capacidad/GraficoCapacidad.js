import { Tooltip, Empty } from 'antd';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import './capacidad.css'


export const GraficoCapacidad = ({porcentajes}) => {

  console.log(porcentajes);

  if (!porcentajes || !Array.isArray(porcentajes) || porcentajes.length === 0) {
    return <Empty style={{marginTop:"20%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}/>;
  }
 
  // console.log(porcentajes[0].porcentaje);


    const data = [
        { name: 'Agricultura', value: parseInt(porcentajes[0].porcentaje)},
        { name: 'Ganaderia', value: parseInt(porcentajes[1].porcentaje) },
        { name: 'Tambo', value: parseInt(porcentajes[2].porcentaje) },
        { name: 'Mixto', value: parseInt(porcentajes[3].porcentaje) },
      ];
      const COLORS = ['#00C49F','#0088FE','#FFBB28', '#FF8042'];

  return (
    <>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <PieChart width={400} height={250}>
              <Legend iconType="circle" layout="vertical" align="left" verticalAlign="top"/>
              <Pie
              className='pie'
                data={data}
                cx={100}
                cy={100}
                innerRadius={40}
                outerRadius={60}
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
