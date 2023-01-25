import { Button, Card, Form, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import './capacidad.css';

export const EditarCapacidad = () => {

    var objData = []

    //! UseContext
    const { dataContext, setDataContext, isCosecha, setIsCosecha, appStage, setAppStage, isButtonEditDisabled, setIsButtonEditDisabled } = useContext(GlobalContext)

    //! UseState
    const [isActiveModal, setIsActiveModal] = useState(false); //Es por si utilizo el modal para el mensaje de que se paso de cantidad en los rubros
    const [isDataSet, setIsDataSet] = useState({});

    //! Funciones
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

            setAppStage(0)

        } else {
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

    const salir = () => {
        setIsButtonEditDisabled(false)
        setDataContext(null)
        setAppStage(0)
    }

    return (
        <>
            <div className='cont'>
                <table>
                    <thead>
                        <tr>
                            <th className="encabezadoVacio" style={{ 'width': '385px' }}></th>
                            <th className="encabezados" style={{ "text-align": "right" }}>PROPIAS</th>
                            <th className="encabezados" style={{ "text-align": "right" }}>ALQUILER</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td className="celdaRubro">AGRICULTURA</td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputAgricultura"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='agricultura'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.agricultura}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputAgriculturaA"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='agriculturaA'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.agriculturaA}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td className="celdaRubro">GANADERÍA</td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputGanaderia"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='ganaderia'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.ganaderia}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputGanaderiaA"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='ganaderiaA'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.ganaderiaA}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td className="celdaRubro">TAMBO</td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputTambo"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='tambo'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.tambo}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputTamboA"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='tamboA'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.tamboA}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td className="celdaRubro">MIXTO</td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputMixto"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='mixto'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.mixto}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>

                            </td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputMixtoA"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='mixtoA'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.mixtoA}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td className="celdaInput" style={{ 'font-weight': 'bold' }}>TOTAL</td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputPropias"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='propias'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.propias}
                                        onChange={handleInputChangeEdit}
                                    />
                                </Form.Item>

                            </td>
                            <td className="celdaInput">

                                <Form.Item
                                    name="inputAlquiladas"
                                >
                                    <Input
                                        className="inputTable"
                                        type="number"
                                        placeholder="0"
                                        name='alquiladas'
                                        style={{ 'textAlign': 'right' }}
                                        defaultValue={dataContext.alquiladas}
                                        onChange={(e) => handleInputChangeEdit(e)}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className='contBotones'>
                <Button
                    className='btnAddCosechaData'
                    onClick={() => salir()}
                > Salir
                </Button>

                <Button
                    className='btnAddCosechaData'
                    onClick={() => handEdit()}
                > Actualizar
                </Button>
            </div>

            {
                isActiveModal ?
                    (
                        // <Modal title="" open={isActiveModal} onCancel={cerrar} footer={null} centered >
                            // <h2>VALOR INCORRECTO</h2>
                            <p style={{'color':'red'}}>Revise la cantidad de Has. Total con las Has. de los Rubros</p>
                        // </Modal>
                    )
                    : ('')
            }

        </>
    )
}
