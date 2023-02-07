import { Empty } from "antd";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import "./capacidad.css";

export const GraficoCapacidad = ({ porcentajes }) => {
  console.log(porcentajes);

  if (!porcentajes || !Array.isArray(porcentajes) || porcentajes.length === 0) {
    return (
      <Empty
        style={{ marginTop: "20%" }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  console.log(porcentajes[0].porcentaje);

  const data = [
    {
      name: "Agricultura",
      value: parseInt(porcentajes[0].porcentaje),
      namet: "Total",
      has: porcentajes[0].total
    },
    {
      name: "Ganaderia",
      value: parseInt(porcentajes[1].porcentaje),
      namet: "Total",
      has: porcentajes[1].total
    },
    {
      name: "Tambo",
      value: parseInt(porcentajes[2].porcentaje),
      namet: "Total",
      has: porcentajes[2].total
    },
    {
      name: "Mixto",
      value: parseInt(porcentajes[3].porcentaje),
      namet: "Total",
      has: porcentajes[3].total
    },
  ];

  // const data = [
  //   { name: 'Group J', value: 400, name2: 'Agricultura', has: 10 },
  //   { name: 'Group B', value: 300, name2: 'Ganaderia', has: 11 },
  //   { name: 'Group C', value: 300, name2: 'Tambo', has: 12 },
  //   { name: 'Group D', value: 200, name2: 'Mixto', has: 13 },
  // ];

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

  const formatter = (value, name, props) => {
    return (
      <div>
        <p className="label" style={{color:"grey", fontWeight:"500"}}>{`Porcentaje: ${value} %`}</p>
        <p className="label" style={{color:"grey", fontWeight:"500"}}>{`${props.payload.namet}: ${props.payload.has} has.`}</p>
      </div>
    )
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart width={400} height={250}>
          <Legend
            iconType="circle"
            layout="vertical"
            align="left"
            verticalAlign="top"
          />
          <Pie
            className="pie"
            data={data}
            cx={100}
            cy={100}
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={formatter} />
        </PieChart>
      </div>
    </>
  );
};
