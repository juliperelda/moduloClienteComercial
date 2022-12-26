import { Button, Card, Form, Input, Modal, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'
import './capacidad.css';

export const EditarCapacidad = () => {

    var objData = []

    let history = useHistory();

    //! UseContext
    const { dataContext, setDataContext, isCosecha, setIsCosecha } = useContext(GlobalContext)

    //! UseState
    const [isData, setIsData] = useState({});
    const [isVista, setIsVista] = useState(false);
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isDataSet, setIsDataSet] = useState({});
    const [isVistaEditar, setIsVistaEditar] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataEdit, setIsDataEdit] = useState({});
    const [isPrueba, setIsPrueba] = useState(false);

    const [IsVisible, setIsVisible] = useState();
    

    //! Funciones


    const traeData = () => {
        if (localStorage.getItem("data")) {
            setIsDataSet(JSON.parse(localStorage.getItem("data")).objData)
        }
    }

    // useEffect(() => {
    //     const fetchData = () => {
    //         traeData()
    //     }
    //     fetchData()
    // }, [])

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


    const handEdit = () => {
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

        if (totalPropias <= inputPropias & totalAlquiladas <= inputAlquiladas) {
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
            // setDataContext(null)
            history.goBack()

        } else {
            // alert("El total de Has. de Rubros supera a las Has. Propias en general")
            setIsActiveModal(true)
        }

    }

    const handleInputChangeEdit = (event) => {

        setDataContext({ //Crea el objeto de lo que escribo en los campos
            ...dataContext,
            cosecha: isCosecha ? isCosecha : null,
            [event.target.name]: event.target.value
        })
        console.log(dataContext)

    }

    const recuperaCosecha = (event) => {
        setIsCosecha(event)
    }

    const salir = () => {
        setIsVista(false)
        setDataContext(null)
    }

    const cerrar = () => {
        setIsActiveModal(false)
    }

    return (
        <>
            <div className='divContainerAddCosecha'>
                <Card className='cardRubros'>

                    <h3>Editar Cosecha/Rubro</h3>

                    <hr />
                    &nbsp;

                    <div className='agCosecha'>
                        <div className='agRubroPropias'>
                            <Form>

                                <h3 style={{ 'color': 'green' }}>PROPIAS</h3>
                                <Form.Item
                                    name="inputPropias"
                                    initialValue={dataContext.propias}
                                >
                                    <Input
                                        className='input-unidad'
                                        type="number"
                                        placeholder="0"
                                        name='propias'
                                        // defaultValue={dataContext.propias}
                                        onChange={handleInputChangeEdit}
                                    />
                                </Form.Item>
                                &nbsp;
                                &nbsp;
                                <div>
                                    <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                                    <Form.Item
                                        name="inputAgricultura"
                                        initialValue={dataContext.agricultura}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='agricultura'
                                            // defaultValue={dataContext.agricultura}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                                    <Form.Item
                                        name="inputGanaderia"
                                        initialValue={dataContext.ganaderia}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='ganaderia'
                                            // defaultValue={dataContext.ganaderia}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                                    <Form.Item
                                        name="inputTambo"
                                        initialValue={dataContext.tambo}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='tambo'
                                            // defaultValue={dataContext.tambo}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                                    <Form.Item
                                        name="inputMixto"
                                        initialValue={dataContext.mixto}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='mixto'
                                            // defaultValue={dataContext.mixto}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div className='agRubroAlquiladas'>
                            <Form>
                                <h3 style={{ 'color': 'green' }}>ALQUILADAS</h3>
                                <Form.Item
                                    name="inputAlquiladas"
                                    initialValue={dataContext.alquiladas}
                                >
                                    <Input
                                        className='input-unidad'
                                        type="number"
                                        placeholder="0"
                                        name='alquiladas'
                                        // defaultValue={dataContext.alquiladas}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>
                                &nbsp;
                                &nbsp;
                                <div>
                                    <h3 style={{ 'paddingTop': '15px' }}>AGRICULTURA</h3>
                                    <Form.Item
                                        name="inputAgriculturaA"
                                        initialValue={dataContext.agriculturaA}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='agriculturaA'
                                            // defaultValue={dataContext.agriculturaA}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>GANADERIA</h3>
                                    <Form.Item
                                        name="inputGanaderiaA"
                                        initialValue={dataContext.ganaderiaA}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='ganaderiaA'
                                            // defaultValue={dataContext.ganaderiaA}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>TAMBO</h3>
                                    <Form.Item
                                        name="inputTamboA"
                                        initialValue={dataContext.tamboA}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='tamboA'
                                            // defaultValue={dataContext.tamboA}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                    &nbsp;
                                    <h3 style={{ 'paddingTop': '15px' }}>MIXTO</h3>
                                    <Form.Item
                                        name="inputMixtoA"
                                        initialValue={dataContext.mixtoA}
                                    >
                                        <Input
                                            className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='mixtoA'
                                            // defaultValue={dataContext.mixtoA}
                                            onChange={(e) => handleInputChangeEdit(e)}
                                        />
                                    </Form.Item>
                                </div>
                            </Form>
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
                            onClick={() => handEdit()}
                        > Actualizar
                        </Button>
                    </div>
                </Card >
                {
                    isActiveModal ?
                        (
                            <Modal title="" open={isActiveModal} onCancel={cerrar} footer={null} centered >
                                <h2>VALOR INCORRECTO</h2>
                                <p>Revise la cantidad de Has. Total con las Has. de los Rubros</p>
                            </Modal>
                        )
                        : ('')
                }
            </div >
        </>
    )
}
