import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory } from 'react-router-dom';
import './capacidad.css';
import { EditarCapacidad } from './EditarCapacidad';
import { NuevaCapacidad } from './NuevaCapacidad';


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
    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // const [isButtonEditDisabled, setIsButtonEditDisabled] = useState(true);




    const prueba = () => {
        setIsEditarPrueba(true)
        setIsPrueba1(true)
    }


    let history = useHistory();

    const [isDataStorage, setIsDataStorage] = useState([]);
    const [isDataTable, setIsDataTable] = useState([]);
    // const [isCosecha, setIsCosecha] = useState();
    const [isCosechaEdit, setIsCosechaEdit] = useState();

    const { dataContext, setDataContext, isCosecha, setIsCosecha, appStage, setAppStage, isButtonDisabled, setIsButtonDisabled, isButtonEditDisabled, setIsButtonEditDisabled } = useContext(GlobalContext)

    let cosechaSelect = 2021

    
    const editarCosecha = () => {
        /*-----------COMO LO TENIA ANTES-----------------------*/
        setIsButtonEditDisabled(true)
        isDataStorage.forEach(function (data) {
            if (parseInt(data.cosecha) === parseInt(isCosecha)) {
                setDataContext(data)
            }
        })
        setIsVisible(false);
        setIsPrueba(true)
        prueba()
        setAppStage(1)
        // // history.push('/editCapacidad')
        /*-----------FIN - COMO LO TENIA ANTES-----------------------*/
        // if (!isCosecha) {
        //     // setIsVisible(true);
        //     // setTimeout(() => {
        //     //     setIsVisible(false);
        //     // }, 5000);
        //     // return;
        //     setIsButtonEditDisabled(true)
        // }
        // // setIsVisible(false);

        // let dataExist = false;
        // // if (localStorage.getItem("data")) {
        // isDataStorage.forEach(function (data) {
        //     if (parseInt(data.cosecha) === parseInt(isCosecha)) {
        //         dataExist = true;
        //         setDataContext(data)
        //     }
        // });
        // // }

        // if (!dataExist) {
        //     setIsVisibleError(true);
        //     setTimeout(() => {
        //         setIsVisibleError(false);
        //     }, 5000);
        //     return;
        // }
        // setIsVisibleError(false);

        // setIsPrueba(true);
        // prueba();
        // setAppStage(1);
        // history.push('/editCapacidad');
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
    const [IsVisibleError, setIsVisibleError] = useState(false);
    const [ValorExiste, setValorExiste] = useState(false);


    const addCosecha = () => {
        // setIsVista(true);
        // setIsVistaEditar(false);
        // setDataContext(null)
        // history.push("/addCapacidad");
        setAppStage(2)
        if (isCosecha) {
            setIsButtonDisabled(true)
            // setValorExiste(true);
            // setTimeout(() => {
            //     setValorExiste(false);
            // }, 5000);
            return;
        }
        setIsPrueba1(true)
        setIsButtonDisabled(false)
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


    const handleSelectChange = (value) => {
        setIsCosecha(value);
        let dataExist = false;
        let dataExistEdit = true;
        if (localStorage.getItem("data")) {
            const dataStorage = JSON.parse(localStorage.getItem("data")).objData;
            dataStorage.forEach(function (data) {
                if (parseInt(data.cosecha) === parseInt(value)) {
                    dataExist = true;
                    dataExistEdit = false;
                }
            });
        }
        setIsButtonDisabled(dataExist); // false
        setIsButtonEditDisabled(dataExistEdit); // true
    }




    const handleStage = () => {
        switch (appStage) {
            case 0:
                return <Table columns={columns} dataSource={isDataTable} pagination={false} />;
            case 1:
                return <EditarCapacidad />;
            case 2:
                return <NuevaCapacidad />;
            default:
                return <Table columns={columns} dataSource={isDataTable} pagination={false} />
        }
    };



    //* FUNCION QUE TRAE LOS DATOS DE TABLA RUBROS
    function rubros() {
        // Trae la información  con GET
        fetch('../com_traerRubros.php', {
            method: 'GET'
        }).then(function(response) {
           response.text().then(resp => {
              console.log('INFO RUBROS');
              const data = resp;
              const objetoData = JSON.parse(data);
      
              console.log(objetoData);
          });
        })
    } 




    return (
        <>
            <div className='divDropdown'>
                <Select
                    className='selectCosecha'
                    defaultValue="Seleccionar Cosecha"
                    placeholder="Seleccione Cosecha"
                    name='cosecha'
                    bordered={true}
                    onChange={(e) => {recuperaCosecha(e); handleSelectChange(e)}} value={isCosecha}
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
                    onClick={() => editarCosecha() /*handEdit()*/}
                    onChange={(e) => recuperaCosecha(e)}
                    disabled={isButtonEditDisabled}
                />
                <Button
                    className='btnAddCosecha'
                    icon={<PlusCircleOutlined />}
                    onClick={() => { addCosecha()/*; history.push("/addCapacidad")*/ }}
                    disabled={isButtonDisabled}
                />
            </div>

            {<>{handleStage()}</>}

        </>

    );
};

export default Capacidad;