    import React, { useEffect, useState } from 'react';
    import {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend,
        ResponsiveContainer
    } from 'recharts';

    const Evolucion = () => {

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
            //   setIsDataStorage(null);
              setSortedData(null);
            }
          };
          fetchData();
        }, []);
        /* FIN Probando ordenar de menor a mayor*/

        // Armo un array con lo que recupero del localstorage
        const arrayData = []
        // if (isDataStorage) {
        //     isDataStorage.forEach(function (data) {
        //         arrayData.push(data)
        //     })
        // }
        /*USO EL sortedData para ordenar de mayor y menor y para que funcione la animacion de los graficos*/
        if (sortedData) {
            sortedData.forEach(function (data) {
                arrayData.push(data)
            })
        }

        const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
            return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
        }; 



        /*-----------------------------------*/
        const [isValorPropias, setIsValorPropias] = useState(true)
        const [isValorAlquiladas, setIsValorAlquiladas] = useState(true)
        /*-----------------------------------*/

        const handleLegendClick = (x) => {
            console.log(x)
            console.log("click")
            if(x.value === "Propias"){
                console.log("seleccionaste propias");
                setIsValorPropias(!isValorPropias);
            };

            if(x.value === "Alquiladas"){
                console.log("seleccionaste alquiladas");
                setIsValorAlquiladas(!isValorAlquiladas);
            };
        };
        /*-----------------------------------*/



        return (
            <>
                <ResponsiveContainer className="" width="100%" height={400}>
                    <BarChart
                        width={500}
                        height={300}
                        data={arrayData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cosecha" />
                        <YAxis label={{ value: 'Has.', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend iconType="circle" onClick={(x) => handleLegendClick(x)} />
                        {
                          isValorPropias ?(
                              <Bar
                                  dataKey="propias"
                                  name='Propias'
                                  stackId="a"
                                  barSize={100}
                                  fill="#a9ff96"
                                  key={'propias'}
                                  label={renderCustomBarLabel}
                                  isAnimationActive={true}
                              />

                          ) :(
                              <Bar
                                  dataKey={0}
                                  name='Propias'
                                  stackId="a"
                                  barSize={100}
                                  fill="#a9ff96"
                                  key={'propias'}
                                  label={renderCustomBarLabel}
                                  isAnimationActive={true}
                              />
                          )
                        }
                        {
                            isValorAlquiladas ?(
                                <Bar
                                    dataKey="alquiladas"
                                    name='Alquiladas'
                                    stackId="a"
                                    barSize={100}
                                    fill="#434348"
                                    key={'alquiladas'}
                                    label={renderCustomBarLabel}
                                    isAnimationActive={true}
                                />
                            ) :(
                                <Bar
                                    dataKey={0}
                                    name='Alquiladas'
                                    stackId="a"
                                    barSize={100}
                                    fill="#434348"
                                    key={'alquiladas'}
                                    label={renderCustomBarLabel}
                                    isAnimationActive={true}
                                />
                            )
                        }
                    </BarChart>
                </ResponsiveContainer>
            </>
        );
    };

    export default Evolucion;