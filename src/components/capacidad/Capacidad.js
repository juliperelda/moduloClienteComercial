import React, { useEffect, useState, useContext } from "react";
import { Button, Select, Table } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../context/GlobalContext";
import "./capacidad.css";
import { EditarCapacidad } from "./EditarCapacidad";
import { NuevaCapacidad } from "./NuevaCapacidad";

const columns = [
    {
        title: "",
        dataIndex: "categoria",
        key: "categoria",
        render: (text, record) => (
            <span>
                {record.categoria === "TOTAL" ? <strong>TOTAL</strong> : text}
            </span>
        ),
    },
    {
        title: <span style={{ color: "#00b33c" }}>PROPIAS</span>,
        dataIndex: "propias",
        key: "propias",
        editable: true,
        width: "30%",
        align: "right",
    },
    {
        title: <span style={{ color: "#00b33c" }}>ALQUILER</span>,
        dataIndex: "alquiler",
        key: "alquiler",
        editable: true,
        width: "30%",
        align: "right",
    },
];

const Capacidad = () => {

    const [isData, setIsData] = useState({});
    const [isDataStorage, setIsDataStorage] = useState([]);
    const [isDataTable, setIsDataTable] = useState([]);
    const [isDataSet, setIsDataSet] = useState({});

    const {
        dataContext,
        setDataContext,
        isCosecha,
        setIsCosecha,
        appStage,
        setAppStage,
        isButtonDisabled,
        setIsButtonDisabled,
        isButtonEditDisabled,
        setIsButtonEditDisabled,
        idCliente,
        infoRubros,
        setInfoRubros,
        infoCap,
        setInfoCap,
        infoCosechas,
        setCosechas,
        infoEvo, 
        setInfoEvo
    } = useContext(GlobalContext);

    let cosechaSelect = 2021;

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        isDataStorage.forEach(function (data) {
            if (parseInt(data.cosecha) === parseInt(isCosecha)) {
                setDataContext(data);
            }
        });
        setAppStage(1);
    };

    const traeData = () => {
        if (localStorage.getItem("data")) {
            setIsDataSet(JSON.parse(localStorage.getItem("data")).objData);
            setIsDataStorage(JSON.parse(localStorage.getItem("data")).objData);
        }
    };

    useEffect(() => {
        const fetchData = () => {
            traeData();
        };
        fetchData();
    }, []);

    const recuperaCosecha = (event) => {
        cosechaSelect = parseInt(event);
        setIsCosecha(cosechaSelect);

        generaData();
    };

    // 
    const generaData = () => {
        var arrayData = [];
        let propioAgricultura = 0;
        let alqAgricultura = 0;
        let propioGanaderia = 0;
        let alqGanaderia = 0;
        let propioTambo = 0;
        let alqTambo = 0;
        let propioMixto = 0;
        let alqMixto = 0;
        let propioTotal = 0;
        let alqTotal = 0;

        if (isDataStorage) {
            if (cosechaSelect !== 0) {
                isDataStorage.forEach(function (data) {
                    if (parseInt(data.cosecha) === cosechaSelect) {
                        propioAgricultura += parseInt(data.agricultura);
                        alqAgricultura += parseInt(data.agriculturaA);
                        propioGanaderia += parseInt(data.ganaderia);
                        alqGanaderia += parseInt(data.ganaderiaA);
                        propioTambo += parseInt(data.tambo);
                        alqTambo += parseInt(data.tamboA);
                        propioMixto += parseInt(data.mixto);
                        alqMixto += parseInt(data.mixtoA);
                        propioTotal += parseInt(data.propias);
                        alqTotal += parseInt(data.alquiladas);
                        // console.log(parseInt(data.agricultura));
                        setIsDataTable(
                            (arrayData = [
                                {
                                    key: 1,
                                    categoria: "AGRICULTURA",
                                    propias: propioAgricultura,
                                    alquiler: alqAgricultura,
                                },
                                {
                                    key: 2,
                                    categoria: "GANADERIA",
                                    propias: propioGanaderia,
                                    alquiler: alqGanaderia,
                                },
                                {
                                    key: 3,
                                    categoria: "TAMBO",
                                    propias: propioTambo,
                                    alquiler: alqTambo,
                                },
                                {
                                    key: 4,
                                    categoria: "MIXTO",
                                    propias: propioMixto,
                                    alquiler: alqMixto,
                                },
                                {
                                    key: 5,
                                    categoria: "TOTAL",
                                    propias: propioTotal,
                                    alquiler: alqTotal,
                                },
                            ])
                        );
                    }
                });
            }
        }
        console.log(arrayData);
    };

    const addCosecha = () => {
        setAppStage(2);
        if (isCosecha) {
            setIsButtonDisabled(true);
            return;
        }
        setIsButtonDisabled(false);
    };

    var objData = [];

    const handleStage = () => {
        switch (appStage) {
            case 0:
                return (
                    <Table
                        columns={columns}
                        dataSource={isDataTable} // ESto es con la data del localstorage
                        // dataSource={setInfoRubros} // o setInfoCap
                        pagination={false}
                    />
                );
            case 1:
                return <EditarCapacidad />;
            case 2:
                return <NuevaCapacidad />;
            default:
                return (
                    <Table
                        columns={columns}
                        dataSource={isDataTable} // ESto es con la data del localstorage
                        // dataSource={setInfoRubros} // o setInfoCap
                        pagination={false}
                    />
                );
        }
    };

    //* FUNCION QUE TRAE LOS DATOS DE TABLA RUBROS
    function rubros() {
        // Trae la información  con GET
        fetch("../com_traerRubros.php", {
            method: "GET",
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                setInfoRubros(objetoData);
            });
        });
    }

    //* FUNCION QUE TRAE LOS DATOS DE COSECHA ACTIVA Y LAS QUE SE PUEDEN VISUALIZAR DEL CLIENTE

    const [selectedValue, setSelectedValue] = useState(infoCosechas.length > 0 && infoCosechas[0].acos_desc);

    var cosecha = selectedValue;

    function cosechas(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        data.append("cosecha", selectedValue); // PRUEBA
        fetch("../com_traerCosechas.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                setCosechas(objetoData);
            });
        });
    }


    // * FUNCION QUE TRAE LOS DATOS PARA LLENAR TABLA CAPACIDAD PRODUCTIVA INICIAL

    function infoTabCapacidad(idCliente, cosecha) {
        const data = new FormData();
        data.append("idC", idCliente);
        data.append("cosecha", cosecha);
        fetch("../com_tabCapacidadData.php", {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                setInfoCap(objetoData);
            });
        });
    }
    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO
    useEffect(() => {
        if (idCliente) {
            infoTabCapacidad(idCliente, cosecha);
            cosechas(idCliente);
            rubros();
            // setSelectedValue(infoCosechas.length > 0 && infoCosechas[0].acos_desc);
        }
    }, [idCliente]);

    if (infoCap.length > 0) {
        console.log("infoCap desde Capacidad: ", infoCap);
        console.log("infoCap[0] desde Capacidad: ", infoCap[0].condicion);
    }

    if (infoRubros.length > 0) {
        console.log("infoRubros desde Capacidad: ", infoRubros);
        console.log("infoRubros[0] desde Capacidad: ", infoRubros[0].arubro_desc);
    }

    if (infoCosechas.length > 0) {
        console.log("infoCosechas desde Capacidad: ", infoCosechas);
        console.log("infoCosechas[0] desde Capacidad: ", infoCosechas[0].acos_desc);
    }



    //*-----------------------------------------------------------------------*//
    
    
    return (
        <>
            <div className="divDropdown">
                {/* <Select
                    className="selectCosecha"
                    style={{ width: '80px' }}
                >
                    {infoCosechas.length > 0 && infoCosechas.map((cosecha) => {
                        return (
                            <Select.Option key={cosecha.acos_desc} value={cosecha.acos_desc}>{cosecha.acos_desc}</Select.Option>
                        )
                    })}

                </Select> */}


                <Select
                    className="selectCosecha"
                    style={{ width: '80px' }}
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e)}
                    >

                    {infoCosechas.length > 0 && infoCosechas.map((cosecha) => {
                        return (
                            <Select.Option key={cosecha.acos_desc} value={cosecha.acos_desc}>{cosecha.acos_desc}</Select.Option>
                        )
                    })}
                </Select>




            <Button
                style={{ alignItems: "center" }}
                className="btnEditCosecha"
                icon={<EditOutlined />}
                onClick={() => editarCosecha()}
                onChange={(e) => recuperaCosecha(e)}
                disabled={isButtonEditDisabled}
            />
            <Button
                className="btnAddCosecha"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                    addCosecha();
                }}
                disabled={isButtonDisabled}
            />
        </div>

            { <>{handleStage()}</> }
        </>
    );
};

export default Capacidad;
