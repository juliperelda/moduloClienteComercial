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

    //Deberia refrescar una vez cargada la info
    // traer lo del localstorage
    useEffect(() => {
        const fetchData = () => {
            if (localStorage.getItem("data")){
                setIsDataStorage(JSON.parse(localStorage.getItem("data")).objData)
            } else {
                setIsDataStorage(null)
            }
        }
        fetchData()
      }, [])

    // Armo un array con lo que recupero del localstorage
    const arrayData = []
    if (isDataStorage){
        isDataStorage.forEach(function (data) {
            arrayData.push(data)
        })  
    }
    // console.log(arrayData)

    return (
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="propias" stackId="a" fill="#434348" />
                <Bar dataKey="alquiladas" stackId="a" fill="#a9ff96"  />
            </BarChart>
        </ResponsiveContainer>

    );
};

export default Evolucion;