import { Button, Card, Form, Input, Modal, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'


export const NuevaCapacidad = () => {

    var objData = []

    let history = useHistory();

    //! UseContext
    const { dataContext, setDataContext, isCosecha, setIsCosecha } = useContext(GlobalContext)


    //! UseState
    const [isData, setIsData] = useState({});
    const [isVista, setIsVista] = useState(false);
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isDataSet, setIsDataSet] = useState({});

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


    /*--------------------------------*/


    //! Funciones
    const handleOk = () => {

        let inputPropias = document.getElementById("inputPropias").value;
        let inputAgricultura = document.getElementById("inputAgricultura").value;
        let inputGanaderia = document.getElementById("inputGanaderia").value;
        let inputTambo = document.getElementById("inputTambo").value;
        let inputMixto = document.getElementById("inputMixto").value;
        let totalPropias = parseInt(inputAgricultura) + parseInt(inputGanaderia) + parseInt(inputTambo) + parseInt(inputMixto)

        let inputAlquiladas = document.getElementById("inputAlquiladas").value;
        let inputAgriculturaA = document.getElementById("inputAgriculturaA").value;
        let inputGanaderiaA = document.getElementById("inputGanaderiaA").value;
        let inputTamboA = document.getElementById("inputTamboA").value;
        let inputMixtoA = document.getElementById("inputMixtoA").value;
        let totalAlquiladas = parseInt(inputAgriculturaA) + parseInt(inputGanaderiaA) + parseInt(inputTamboA) + parseInt(inputMixtoA)


        if (isData.cosecha !== null) {
            if (totalPropias <= inputPropias && totalAlquiladas <= inputAlquiladas) {
                if (localStorage.getItem("data")) {
                    objData = [
                        ...isDataSet,
                        isData
                    ]
                    // }
                } else {
                    objData = [isData]
                }


                localStorage.setItem('data', JSON.stringify({ objData }))
                setIsVista(false)
                history.goBack()
            } else {
                alert("El total de Has. de Rubros supera a las Has. Propias en general")
                setIsActiveModal(true)
            }
            // setIsActiveModal(false)
        } else {
            alert("Se debe ingresar la cosecha")
        }
    };

    const recuperaCosecha = (event) => {
        setIsCosecha(event)
        // console.log(event)
    }

    const handleInputChange = (event) => {

        setIsData({ //Crea el objeto de lo que escribo en los campos
            ...isData,
            cosecha: isCosecha ? isCosecha : null,
            [event.target.name]: event.target.value
        })
    }

    const salir = () => {
        setIsVista(false)
        setDataContext(null)
    }

    const cerrar = () => {
        setIsActiveModal(false)
    }

    return (
        <div className='divContainerAddCosecha'>
            <Card className='cardRubros'>
                <div className='divContainerTitles'>
                    <h3>Cargar Cosecha/Rubro</h3>

                    <hr />
                    &nbsp;
                    <h4>Seleccione Cosecha:</h4>
                    <Select
                        defaultValue="[Seleccionar Cosecha]"
                        placeholder="Seleccione Cosecha"
                        name='cosecha'
                        onChange={(e) => recuperaCosecha(e)}
                        style={{ width: 200 }}
                        bordered={false}
                    >
                        <Select.Option value="2223">2223</Select.Option>
                        <Select.Option value="2122">2122</Select.Option>
                        <Select.Option value="2021">2021</Select.Option>
                    </Select>
                </div>
                <div className='agCosecha'>
                    <div className='agRubroPropias'>
                        <Form>
                            <h3 style={{ 'color': 'green' }}>PROPIAS</h3>
                            <Form.Item
                                // label="Username"
                                name="inputPropias"
                                rules={[{ required: false, message: 'Por favor ingrese un valor' }]}
                            >
                                <Input
                                    className='input-unidad'
                                    placeholder="0"
                                    name='propias'
                                    // defaultValue={isVistaEditar ? dataContext.propias : null}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Item>
                            &nbsp;
                            &nbsp;
                            <div>
                                <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                                <Form.Item
                                    name="inputAgricultura"
                                >
                                    <Input
                                        className='input-unidad'
                                        type="number"
                                        placeholder="0"
                                        name='agricultura'
                                        // value={isVistaEditar ? dataContext.agricultura : null}
                                        // defaultValue={isVistaEditar ? dataContext.agricultura : null}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Form.Item>
                                &nbsp;
                                <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                                <Form.Item
                                    name="inputGanaderia"
                                >
                                    <Input
                                        className='input-unidad'
                                        placeholder="0"
                                        name='ganaderia'
                                        // defaultValue={isVistaEditar ? dataContext.ganaderia : null}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Form.Item>
                                &nbsp;
                                <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                                <Form.Item
                                    name="inputTambo"
                                >
                                    <Input
                                        className='input-unidad'
                                        placeholder="0"
                                        name='tambo'
                                        // defaultValue={isVistaEditar ? dataContext.tambo : null}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Form.Item>
                                &nbsp;
                                <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                                <Form.Item
                                    name="inputMixto"
                                >
                                    <Input
                                        className='input-unidad'
                                        placeholder="0"
                                        name='mixto'
                                        // defaultValue={isVistaEditar ? dataContext.mixto : null}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className='agRubroAlquiladas'>
                        <h3 style={{ 'color': 'green' }}>ALQUILADAS</h3>
                        <Form.Item
                            name="inputAlquiladas"
                        >
                            <Input
                                className='input-unidad'
                                placeholder="0"
                                name='alquiladas'
                                // defaultValue={isVistaEditar ? dataContext.alquiladas : null}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Item>
                        &nbsp;
                        &nbsp;
                        <div>
                            <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                            <Form.Item
                                name="inputAgriculturaA"
                            >
                                <Input
                                    className='input-unidad'
                                    placeholder="0"
                                    name='agriculturaA'
                                    // defaultValue={isVistaEditar ? dataContext.agriculturaA : null}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Item>
                            &nbsp;
                            <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                            <Form.Item
                                name="inputGanaderiaA"
                            >
                                <Input
                                    className='input-unidad'
                                    placeholder="0"
                                    name='ganaderiaA'
                                    // defaultValue={isVistaEditar ? dataContext.ganaderiaA : null}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Item>
                            &nbsp;
                            <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                            <Form.Item
                                name="inputTamboA"
                            >
                                <Input
                                    className='input-unidad'
                                    placeholder="0"
                                    name='tamboA'
                                    // defaultValue={isVistaEditar ? dataContext.tamboA : null}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Item>
                            &nbsp;
                            <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                            <Form.Item
                                name="inputMixtoA"
                            >
                                <Input
                                    className='input-unidad'
                                    placeholder="0"
                                    name='mixtoA'
                                    // defaultValue={isVistaEditar ? dataContext.mixtoA : null}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className='AddCosecha'>
                    <Button
                        className='btnAddCosechaData'
                        onClick={() => history.goBack()}
                    > Salir
                    </Button>
                    <Button
                        className='btnAddCosechaData'
                        onClick={/*(data) => setIsDatoPrueba(data)}*/() => handleOk()}
                    > Guardar
                    </Button>
                </div>
            </Card>
            {
                isActiveModal ?
                    (
                        <Modal title="" open={isActiveModal} onOk={cerrar}>
                            <h2>VALOR INCORRECTO</h2>
                            <p>Revise la cantidad de Has. Total con las Has. de los Rubros</p>
                        </Modal>
                    )
                    : ('')
            }
        </div >
    )
}
