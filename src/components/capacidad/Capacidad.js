import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory } from 'react-router-dom';
import './capacidad.css';



const columns = [
    {
        title: '',
        dataIndex: 'categoria',
        key: 'categoria',
        render: (text, record) => (
            <span>
                {record.categoria === 'TOTAL' ? <strong>TOTAL</strong> : text}
            </span>
        )
    },
    {
        title: <span style={{ color: '#00b33c' }}>PROPIAS</span>,
        dataIndex: 'propias',
        key: 'propias',
        editable: true,
        width: '30%',
        align: 'right',
    },
    {
        title: <span style={{ color: '#00b33c' }}>ALQUILER</span>,
        dataIndex: 'alquiler',
        key: 'alquiler',
        editable: true,
        width: '30%',
        align: 'right',
    },
];

const Capacidad = () => {
    const [isPrueba, setIsPrueba] = useState();
    const [isPrueba1, setIsPrueba1] = useState();
    const [editarPrueba, setIsEditarPrueba] = useState(false);
    const [isData, setIsData] = useState({});
    const [isActiveModal, setIsActiveModal] = useState(false);
    const [isDataSet, setIsDataSet] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataEdit, setIsDataEdit] = useState({});
    const [IsVisible, setIsVisible] = useState();



    const prueba = () => {
        setIsEditarPrueba(true)
        setIsPrueba1(true)
    }


    let history = useHistory();

    const [isDataStorage, setIsDataStorage] = useState([]);
    const [isDataTable, setIsDataTable] = useState([]);
    // const [isCosecha, setIsCosecha] = useState();
    const [isCosechaEdit, setIsCosechaEdit] = useState();

    const { dataContext, setDataContext, isCosecha, setIsCosecha } = useContext(GlobalContext)

    let cosechaSelect = 2021


    const editarCosecha = () => {
        isDataStorage.forEach(function (data) {
            if (parseInt(data.cosecha) === parseInt(isCosecha)) {
                setDataContext(data)
            }
        })
        setIsPrueba(true)
        prueba()
        // history.push('/editCapacidad')
    }




    const traeData = () => {
        if (localStorage.getItem("data")) {
            setIsDataSet(JSON.parse(localStorage.getItem("data")).objData)
            setIsDataStorage(JSON.parse(localStorage.getItem("data")).objData)
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
            setIsPrueba(false)
            // setDataContext(null)
            // history.goBack()
            // console.log(isCosecha)
            // console.log(isDataSet)
            console.log(objData)
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
        // console.log(event)
        // console.log(event.target.value)
        // console.log(isDataSet)
    }


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
                setIsPrueba1(false)
            } else {
                alert("El total de Has. de Rubros supera a las Has. Propias en general")
                setIsActiveModal(true)
            }
            // setIsActiveModal(false)
        } else {
            alert("Se debe ingresar la cosecha")
        }
    };

    const handleInputChange = (event) => {

        setIsData({ //Crea el objeto de lo que escribo en los campos
            ...isData,
            cosecha: isCosecha ? isCosecha : null,
            [event.target.name]: event.target.value
        })
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



    /* -----------------------------------*/
    const [isVista, setIsVista] = useState(false);
    const [isVistaEditar, setIsVistaEditar] = useState(false);

    const addCosecha = () => {
        setIsVista(true);
        setIsVistaEditar(false);
        setDataContext(null)
        // history.push("/addCapacidad");

        setIsPrueba1(false)
    };
    /* -----------------------------------*/


    /* ---------------EDITAR--------------------*/


    var objData = []

    const salir = () => {
        setIsPrueba(false)
    }

    const cerrar = () => {
        setIsActiveModal(false)
    }

    /* ------------------FIN EDITAR-----------------*/





    return (
        <>
            <div className='divDropdown'>
                <Select
                    className='selectCosecha'
                    defaultValue="Seleccionar Cosecha"
                    placeholder="Seleccione Cosecha"
                    name='cosecha'
                    bordered={true}
                    onChange={(e) => recuperaCosecha(e)}
                >
                    <Select.Option value="2223">2223</Select.Option>
                    <Select.Option value="2122">2122</Select.Option>
                    <Select.Option value="2021">2021</Select.Option>
                    <Select.Option value="1920">1920</Select.Option>
                </Select>
                <Button
                    style={{ alignItems: "center" }}
                    className='btnEditCosecha'
                    icon={<EditOutlined />}
                    // onClick={() => addCosecha()/*showModal()*/}
                    onClick={() => editarCosecha()}
                    onChange={(e) => recuperaCosecha(e)}
                />
                <Button
                    className='btnAddCosecha'
                    icon={<PlusCircleOutlined />}
                    onClick={() => { addCosecha(); history.push("/addCapacidad") }}
                />
            </div>

            {
                !isPrueba || !isPrueba1 ?
                    (
                        <Table columns={columns}
                            dataSource={isDataTable}
                            pagination={false} />
                    )
                    : 
                    (
                        <>
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
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.agricultura}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }
                                            </td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.agriculturaA}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }

                                            </td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td className="prueba1">GANADERÍA</td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.ganaderia}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }
                                            </td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.ganaderiaA}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }

                                            </td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td className="prueba1">TAMBO</td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.tambo}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }
                                            </td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.tamboA}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }

                                            </td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td className="prueba1">MIXTO</td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.mixto}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }
                                            </td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.mixtoA}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }

                                            </td>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <td className="prueba" style={{ 'font-weight': 'bold' }}>TOTAL</td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={handleInputChangeEdit}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.propias}
                                                                    onChange={handleInputChangeEdit}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }

                                            </td>
                                            <td className="prueba">
                                                {
                                                    !isPrueba1 ?
                                                        (
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
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        :
                                                        (
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
                                                                    defaultValue={dataContext.alquiladas}
                                                                    onChange={(e) => handleInputChangeEdit(e)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                }
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
                                {
                                    !isPrueba1 ?
                                        (
                                            <Button
                                                className='btnAddCosechaData'
                                                onClick={() => handleOk()}
                                            > Guardar
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button
                                                className='btnAddCosechaData'
                                                onClick={() => handEdit()}
                                            > Actualizar
                                            </Button>
                                        )
                                }
                            </div>
                        </>
                    )
            }
        </>

    );
};

export default Capacidad;