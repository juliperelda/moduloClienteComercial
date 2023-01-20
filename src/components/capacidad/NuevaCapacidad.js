import { Button, Card, Form, Input, Modal, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'
import './capacidad.css';


export const NuevaCapacidad = () => {

    var objData = []

    let history = useHistory();

    //! UseContext
    const { dataContext, setDataContext, isCosecha, setIsCosecha, appStage, setAppStage } = useContext(GlobalContext)


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
                // history.goBack()
                setAppStage(0)
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
        setAppStage(0)
    }

    const cerrar = () => {
        setIsActiveModal(false)
    }

    return (
        <>
            <div className='divNuevaCapacidad'>
                {/* <Card className='cardRubros'> */}
                {/* <div className='divContainerTitles'> */}
                {/* <h3>Cargar Cosecha/Rubro</h3>

                    <hr />
                    &nbsp;
                    <h4>Seleccione Cosecha:</h4> */}
                {/* <Select
                    defaultValue="Seleccionar Cosecha"
                    placeholder="Seleccione Cosecha"
                    name='cosecha'
                    onChange={(e) => recuperaCosecha(e)}
                    style={{ width: 200 }}
                    bordered={true}
                >
                    <Select.Option value="2223">2223</Select.Option>
                    <Select.Option value="2122">2122</Select.Option>
                    <Select.Option value="2021">2021</Select.Option>
                    <Select.Option value="1920">1920</Select.Option>
                </Select> */}
                {/* </div> */}
                {/* <> */}
                <div className='cont'>
                    <table>
                        <thead>
                            <tr>
                                <th className="encabezados1" style={{ 'width': '385px' }}></th>
                                <th className="encabezados" style={{ "text-align": "right" }}>PROPIAS</th>
                                <th className="encabezados" style={{ "text-align": "right" }}>ALQUILER</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="prueba1">AGRICULTURA</td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputAgricultura"
                                    // initialValue={dataContext.agricultura}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='agricultura'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>

                                </td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputAgriculturaA"
                                    // initialValue={dataContext.agriculturaA}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='agriculturaA'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>


                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="prueba1">GANADERÍA</td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputGanaderia"
                                    // initialValue={dataContext.ganaderia}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='ganaderia'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>

                                </td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputGanaderiaA"
                                    // initialValue={dataContext.ganaderiaA}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='ganaderiaA'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>


                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="prueba1">TAMBO</td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputTambo"
                                    // initialValue={dataContext.tambo}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='tambo'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>

                                </td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputTamboA"
                                    // initialValue={dataContext.tamboA}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='tamboA'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>


                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="prueba1">MIXTO</td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputMixto"
                                    // initialValue={dataContext.mixto}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='mixto'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>

                                </td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputMixtoA"
                                    // initialValue={dataContext.mixtoA}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='mixtoA'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>


                                </td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className="prueba" style={{ 'font-weight': 'bold' }}>TOTAL</td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputPropias"
                                    // initialValue={dataContext.propias}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='propias'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>



                                </td>
                                <td className="prueba">

                                    <Form.Item
                                        name="inputAlquiladas"
                                    // initialValue={dataContext.alquiladas}
                                    >
                                        <Input
                                            className="a"
                                            // className='input-unidad'
                                            type="number"
                                            placeholder="0"
                                            name='alquiladas'
                                            style={{ 'textAlign': 'right' }}
                                            defaultValue={0}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </Form.Item>

                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='contBotonesNuevaCapacidad'>
                    <div>
                        <Button
                            className='btnAddCosechaData'
                            onClick={() => salir()}
                        > Salir
                        </Button>

                    </div>
                    <div>
                        <Button
                            className='btnAddCosechaData'
                            onClick={() => handleOk()}
                        > Guardar
                        </Button>

                    </div>


                </div>
                {/* </> */}
                {/* </Card> */}
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
        </>
    )
}
