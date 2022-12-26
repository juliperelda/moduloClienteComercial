import React, { useEffect, useState , useContext} from 'react';
import { Button, Select, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory } from 'react-router-dom';
import './capacidad.css';

const columns = [
    {
        title: '',
        dataIndex: 'categoria',
        key: 'categoria',
    },
    {
        title: 'PROPIAS',
        dataIndex: 'propias',
        key: 'propias',
    },
    {
        title: 'ALQUILER',
        dataIndex: 'alquiler',
        key: 'alquiler',
    },
];

const Capacidad = () => {

    let history = useHistory();

    const [isDataStorage, setIsDataStorage] = useState([]);
    const [isDataTable, setIsDataTable] = useState([]);
    // const [isCosecha, setIsCosecha] = useState();
    const [isCosechaEdit, setIsCosechaEdit] = useState();

    const {dataContext, setDataContext, isCosecha, setIsCosecha} = useContext ( GlobalContext )

    let cosechaSelect = 2021

    const traeData = () => {
        if (localStorage.getItem("data")) {
            setIsDataStorage(JSON.parse(localStorage.getItem("data")).objData)
        }
    }

    useEffect(() => {
        const fetchData = () => {
            traeData()
        }
        fetchData()
    }, [])

    const editarCosecha = () => {
            isDataStorage.forEach(function (data) {
                if (parseInt(data.cosecha) === parseInt(isCosecha)){
                    setDataContext(data)
                }
            })

            history.push('/editCapacidad')
    }

    const recuperaCosecha = (event) => {
        cosechaSelect = parseInt(event)
        setIsCosecha(cosechaSelect)

        generaData()
    }

    const generaData = () => {
        var arrayData = []
        let propioAgricultura = 0
        let alqAgricultura = 0
        let propioGanaderia = 0
        let alqGanaderia = 0
        let propioTambo = 0
        let alqTambo = 0
        let propioMixto = 0
        let alqMixto = 0
        let propioTotal = 0
        let alqTotal = 0

        if (isDataStorage) {

            if (cosechaSelect !== 0) {

                // if (isDataStorage.data. === recuperaCosecha())
                isDataStorage.forEach(function (data) {

                    if (parseInt(data.cosecha) === cosechaSelect) {
                        propioAgricultura += parseInt(data.agricultura)
                        alqAgricultura += parseInt(data.agriculturaA)
                        propioGanaderia += parseInt(data.ganaderia)
                        alqGanaderia += parseInt(data.ganaderiaA)
                        propioTambo += parseInt(data.tambo)
                        alqTambo += parseInt(data.tamboA)
                        propioMixto += parseInt(data.mixto)
                        alqMixto += parseInt(data.mixtoA)
                        propioTotal += parseInt(data.propias)
                        alqTotal += parseInt(data.alquiladas)
                        // console.log(parseInt(data.agricultura));
                        setIsDataTable(arrayData = [
                            {
                                key: 1,
                                categoria: "AGRICULTURA",
                                propias: propioAgricultura,
                                alquiler: alqAgricultura
                            },
                            {
                                key: 2,
                                categoria: "GANADERIA",
                                propias: propioGanaderia,
                                alquiler: alqGanaderia
                            },
                            {
                                key: 3,
                                categoria: "TAMBO",
                                propias: propioTambo,
                                alquiler: alqTambo
                            },
                            {
                                key: 4,
                                categoria: "MIXTO",
                                propias: propioMixto,
                                alquiler: alqMixto
                            },
                            {
                                key: 5,
                                categoria: "TOTAL",
                                propias: propioTotal,
                                alquiler: alqTotal
                            }
                        ])
                    }
                })
            }
        }
        console.log(arrayData)
    }
    return (
        <>
            <div className='divDropdown'>
                <Select
                    className='selectCosecha'
                    defaultValue="Seleccionar Cosecha"
                    placeholder="Seleccione Cosecha"
                    name='cosecha'
                    bordered={false}
                    onChange={(e) => recuperaCosecha(e)}
                >
                    <Select.Option value="2223">2223</Select.Option>
                    <Select.Option value="2122">2122</Select.Option>
                    <Select.Option value="2021">2021</Select.Option>
                </Select>
                <Button
                    className='btnEditCosecha'
                    icon={<EditOutlined />}
                    // onClick={() => addCosecha()/*showModal()*/}
                    onClick = {() => editarCosecha()}
                />
            </div>

            <Table columns={columns} dataSource={isDataTable} pagination={false} />
        </>

    );
};

export default Capacidad;