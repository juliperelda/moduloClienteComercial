import { Tooltip, Empty } from 'antd';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import './capacidad.css'


export const GraficoCapacidad = ({ porcentajes }) => {

  console.log(porcentajes);

  if (!porcentajes || !Array.isArray(porcentajes) || porcentajes.length === 0) {
    return <Empty style={{ marginTop: "20%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  // console.log(porcentajes[0].porcentaje);


  const data = [
    { name: 'Agricultura', value: parseInt(porcentajes[0].porcentaje) },
    { name: 'Ganaderia', value: parseInt(porcentajes[1].porcentaje) },
    { name: 'Tambo', value: parseInt(porcentajes[2].porcentaje) },
    { name: 'Mixto', value: parseInt(porcentajes[3].porcentaje) },
  ];

  // const data = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];

  const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

  const CustomTooltip = () => {
    return (
      <div className="custom-tooltip" style={{ border: "3px solid grey", backgroundColor: "#FFFF", padding: "10px", borderRadius: "4px" }}>
        <p>Hola</p>
        {/* <p className="porcentaje" style={{ color: "#a3ef95", fontWeight: "500" }}>{`Has.: ${porcentajes.porcentaje(Math.trunc(payload[0].value))}%`}</p>
        <p className="hectareas" style={{ color: "#a3ef95", fontWeight: "500" }}>{`Porcentaje: ${porcentajes.total(Math.trunc(payload[1].value))}`}</p>
        <p className="porcentaje" style={{ color: "#a3ef95", fontWeight: "500" }}>{`Has.: ${porcentajes.porcentaje(Math.trunc(payload[6].value))}%`}</p>
        <p className="hectareas" style={{ color: "#a3ef95", fontWeight: "500" }}>{`Porcentaje: ${porcentajes.total(Math.trunc(payload[4].value))}`}</p> */}
      </div>
    );

    return null;
  };


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
        <PieChart width={300} height={250} margin={{ left: 50 }}>
          <Legend iconType="circle" margin={{ top: 50 }} />
          <Pie
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
            {data.map((entry, index) => (

              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </div>
    </>
  )
}
