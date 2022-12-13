import Card from 'antd/es/card/Card';
import React, { useEffect, useState, useContext } from 'react';
import Capacidad from './capacidad/Capacidad';
import Evolucion from './evolucion/Evolucion';
import './analitica.css';
import { DownOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Input, Modal, Select, Space } from 'antd';
import { Option } from 'antd/es/mentions';
import { GlobalContext } from '../../context/GlobalContext';



const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer">
                2223
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer">
                2122
            </a>
        ),
        key: '1',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer">
                2021
            </a>
        ),
        key: '2',
    },

];


const Analitica = () => {
    var objData = []
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isData, setIsData] = useState({});
    const [isDataEdit, setIsDataEdit] = useState({});
    const [isDataSet, setIsDataSet] = useState({});
    // const [isCosecha, setIsCosecha] = useState();
    const [isVista, setIsVista] = useState(false);
    const [isVistaEditar, setIsVistaEditar] = useState(false);
    const [isPrueba, setIsPrueba] = useState(false);


    const { dataContext, setDataContext, isCosecha, setIsCosecha } = useContext(GlobalContext)

    console.log(isCosecha)

    const traeData = () => {
        if (localStorage.getItem("data")) {
            setIsDataSet(JSON.parse(localStorage.getItem("data")).objData)
        }
    }

    useEffect(() => {
        const fetchData = () => {
            traeData()
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = () => {
            if (dataContext) {
                setIsVista(true);
                setIsVistaEditar(true);
            } else {
                // setIsVista(false);
                setIsVistaEditar(false);
            }
        }
        fetchData()
    })


    const handleOk = () => {
        // setIsModalOpen(false);
        setIsVista(false)

        if (isData.cosecha !== null) {

            if (localStorage.getItem("data")) {
                objData = [
                    ...isDataSet,
                    isData
                ]
            } else {
                objData = [
                    isData
                ]
            }

            localStorage.setItem('data', JSON.stringify({ objData }))

        } else {
            alert("Se debe ingresar la cosecha")
        }
    };

    const handEdit = () => {

        isDataSet.forEach(function (data) {

            if (parseInt(data.cosecha) !== parseInt(isCosecha)) {

                objData = [
                    ...objData,
                    data
                ]

            }

        })

        objData = [
            ...objData,
            dataContext
        ]

        localStorage.setItem('data', JSON.stringify({ objData }))

        setIsVista(false)
        setDataContext(null)

    }

    const handleInputChange = (event) => {

        setIsData({ //Crea el objeto de lo que escribo en los campos
            ...isData,
            cosecha: isCosecha ? isCosecha : null,
            [event.target.name]: event.target.value
        })
    }

    const handleInputChangeEdit = (event) => {

        setDataContext({ //Crea el objeto de lo que escribo en los campos
            ...dataContext,
            cosecha: isCosecha ? isCosecha : null,
            [event.target.name]: event.target.value
        })

    }

    const recuperaCosecha = (event) => {
        setIsCosecha(event)
        // console.log(event)
    }
    const addCosecha = () => {
        setIsVista(true);
        setIsVistaEditar(false);
        setDataContext(null)
    };

    // const editCosecha = () => {
    //     setIsVista(true);
    //     setIsVistaEditar(true);
    // }

    const salir = () => {
        setIsVista(false)
        setDataContext(null)
    }

    // -----------------------------------------------------

    return (
        <>
            {!isVista ? (
                <div className='divContainer'>
                    <Card className='cardGrafico' style={{ width: "50%" }}>
                        <h1>Evolutiva</h1>
                        <Evolucion />
                    </Card>
                    <Card className='cardTable' style={{ width: "50%" }}>
                        <h1>Capacidad</h1>
                        <Capacidad />
                        <div className='divBtnAddCosecha'>
                            <Button
                                className='btnAddCosecha'
                                icon={<PlusCircleOutlined />}
                                onClick={() => addCosecha()}
                            />
                        </div>
                        {/* <div className='divBtnAddCosecha'>
                            <Button
                                className='btnAddCosecha'
                                icon={<EditOutlined />}
                                onClick={() => editCosecha()}
                            />
                        </div> */}
                    </Card>
                </div>
            ) : (
                <>
                    <div className='divContainerAddCosecha'>
                        <Card className='cardRubros'>
                            {
                                isVistaEditar === true ? (<h3>Editar Cosecha/Rubro</h3>) : (<h3>Cargar Cosecha/Rubro</h3>)
                            }
                            {/* <h3>Cargar Cosecha/Rubro</h3> */}
                            <hr style={{
                                'text-decoration': 'underline'
                            }} />
                            &nbsp;
                            {
                                isVistaEditar === true ?
                                    ('') :
                                    (<div>
                                        <h4>Seleccione Cosecha:</h4>
                                        <Select
                                            defaultValue="[Seleccionar Cosecha]"
                                            placeholder="Seleccione Cosecha"
                                            name='cosecha'
                                            onChange={(e) => recuperaCosecha(e)}
                                            style={{ width: 200 }}
                                        >
                                            <Select.Option value="2223">2223</Select.Option>
                                            <Select.Option value="2122">2122</Select.Option>
                                            <Select.Option value="2021">2021</Select.Option>
                                        </Select>
                                    </div>)
                            }
                            <div className='agCosecha'>
                                <div className='agRubroPropias'>
                                    <Form>

                                        <h3 style={{ 'color': 'green' }}>PROPIAS</h3>
                                        <Form.Item
                                            // label="Username"
                                            name="inputPropias"
                                            rules={[{ required: true, message: 'Por favor ingrese un valor' }]}
                                        >
                                            <Input
                                                className='input-unidad'
                                                placeholder="0"
                                                name='propias'
                                                defaultValue={isVistaEditar ? dataContext.propias : null}
                                                onChange={isVistaEditar ? handleInputChangeEdit : (e) => handleInputChange(e)}
                                            />
                                        </Form.Item>
                                        &nbsp;
                                        &nbsp;
                                        <div>
                                            <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                                            <Input
                                                className='input-unidad'
                                                type="number"
                                                placeholder="0"
                                                name='agricultura'
                                                // value={isVistaEditar ? dataContext.agricultura : null}
                                                defaultValue={isVistaEditar ? dataContext.agricultura : null}
                                                onChange={isVistaEditar ? handleInputChangeEdit : (e) => handleInputChange(e)}
                                            />
                                            &nbsp;
                                            <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                                            <Input
                                                className='input-unidad'
                                                placeholder="0"
                                                name='ganaderia'
                                                defaultValue={isVistaEditar ? dataContext.ganaderia : null}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            &nbsp;
                                            <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                                            <Input
                                                className='input-unidad'
                                                placeholder="0"
                                                name='tambo'
                                                defaultValue={isVistaEditar ? dataContext.tambo : null}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            &nbsp;
                                            <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                                            <Input
                                                className='input-unidad'
                                                placeholder="0"
                                                name='mixto'
                                                defaultValue={isVistaEditar ? dataContext.mixto : null}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </Form>
                                </div>
                                <div className='agRubroAlquiladas'>

                                    <h3 style={{ 'color': 'green' }}>ALQUILADAS</h3>
                                    <Input
                                        className='input-unidad'
                                        placeholder="0"
                                        name='alquiladas'
                                        defaultValue={isVistaEditar ? dataContext.alquiladas : null}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    &nbsp;
                                    &nbsp;
                                    <div>
                                        <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                                        <Input
                                            className='input-unidad'
                                            placeholder="0"
                                            name='agriculturaA'
                                            defaultValue={isVistaEditar ? dataContext.agriculturaA : null}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        &nbsp;
                                        <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                                        <Input
                                            className='input-unidad'
                                            placeholder="0"
                                            name='ganaderiaA'
                                            defaultValue={isVistaEditar ? dataContext.ganaderiaA : null}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        &nbsp;
                                        <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                                        <Input
                                            className='input-unidad'
                                            placeholder="0"
                                            name='tamboA'
                                            defaultValue={isVistaEditar ? dataContext.tamboA : null}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        &nbsp;
                                        <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                                        <Input
                                            className='input-unidad'
                                            placeholder="0"
                                            name='mixtoA'
                                            defaultValue={isVistaEditar ? dataContext.mixtoA : null}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {isPrueba === true ? (<label style={{ 'color': 'red' }}>Se superó el total de Has.</label>) : ('')}
                            </div>
                            <div className='AddCosecha'>
                                <Button
                                    className='btnAddCosechaData'
                                    onClick={() => salir()}
                                > Salir
                                </Button>
                                {
                                    isVistaEditar === true ?

                                        (
                                            <Button
                                                className='btnAddCosechaData'
                                                onClick={() => handEdit()}
                                            > Actualizar
                                            </Button>)

                                        :

                                        (<Button
                                            className='btnAddCosechaData'
                                            onClick={() => handleOk()}
                                        > Guardar
                                        </Button>)
                                }
                            </div>
                        </Card>
                    </div >
                </>
            )
            }
        </>
    );
}
export default Analitica;