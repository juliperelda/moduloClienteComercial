import { isVisible } from '@testing-library/user-event/dist/utils';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Surface,
    Symbols,
} from 'recharts';

const Evolucion = () => {

    const [isDataStorage, setIsDataStorage] = useState([]);

    //Deberia refrescar una vez cargada la info
    // traer lo del localstorage
    useEffect(() => {
        const fetchData = () => {
            if (localStorage.getItem("data")) {
                setIsDataStorage(JSON.parse(localStorage.getItem("data")).objData)
            } else {
                setIsDataStorage(null)
            }
        }
        fetchData()
    }, [])

    // Armo un array con lo que recupero del localstorage
    const arrayData = []
    if (isDataStorage) {
        isDataStorage.forEach(function (data) {
            arrayData.push(data)
        })
    }

    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
    };



    /*-----------------------------------*/
    const [isPepe, setIsPepe] = useState(true)
    let v = 0
    /*-----------------------------------*/
    const [selectedItems, setSelectedItems] = useState([]);

    const handleLegendClick = (event) => {
        const { dataKey } = event;
        const index = selectedItems.indexOf(dataKey);
        if (index === -1) {
            setSelectedItems([...selectedItems, dataKey]);
            // const v = 0
        } else {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(index, 1);
            setSelectedItems(newSelectedItems);
        }
    };
    /*-----------------------------------*/




    return (
        <>
            <ResponsiveContainer className="" width="100%" height={400}>
                <BarChart
                    // width="100%"
                    // height="100%"
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
                    <Legend iconType="circle" onClick={handleLegendClick} />
                    {
                        selectedItems.indexOf('propias') === -1 ?
                            <Bar
                                dataKey="propias"
                                stackId="a"
                                barSize={100}
                                fill="#a9ff96"
                                key={'propias'}
                                label={renderCustomBarLabel}
                                isAnimationActive={false}
                            />
                            :
                            <Bar
                                dataKey={v}
                                stackId="a"
                                barSize={100}
                                fill="#a9ff96"
                                key={'propias'}
                                label={renderCustomBarLabel}
                                isAnimationActive={false}
                            />
                    }
                    {
                        selectedItems.indexOf('alquiladas') === -1 ?
                            <Bar
                                dataKey="alquiladas"
                                stackId="a"
                                barSize={100}
                                fill="#434348"
                                key={'alquiladas'}
                                label={renderCustomBarLabel}
                                isAnimationActive={false}
                            />
                            :
                            <Bar
                                dataKey={v}
                                stackId="a"
                                barSize={100}
                                fill="#434348"
                                key={'alquiladas'}
                                label={renderCustomBarLabel}
                                isAnimationActive={false}
                            />
                    }
                    {/* <Bar
                        dataKey="propias"
                        stackId="a"
                        barSize={100}
                        // fill="#434348" 
                        fill={selectedItems.indexOf('propias') === -1 ? '#8884d8' : '#82ca9d'}
                        key={'propias'}
                        label={renderCustomBarLabel}
                        isAnimationActive={false}
                    />
                    {isPepe ?
                        <Bar
                            dataKey="alquiladas"
                            stackId="a"
                            barSize={100}
                            fill="#a9ff96"
                            key={'alquiladas'}
                            label={renderCustomBarLabel}
                            isAnimationActive={false}
                        />
                        :
                        <Bar
                            dataKey="propias"
                            stackId="a"
                            barSize={100}
                            fill="#434348"
                            key={'propias'}
                            label={renderCustomBarLabel}
                            isAnimationActive={false}
                        /> 
                    }*/}

                </BarChart>
            </ResponsiveContainer>

            <Button
                onClick={() => setIsPepe(!isPepe)}>Hola</Button>
        </>
    );
};

export default Evolucion;