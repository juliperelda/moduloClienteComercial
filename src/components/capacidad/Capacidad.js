/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
    } = useContext(GlobalContext);

    const [isHayData, setIsHayData] = useState(false);
    const [selectedValue, setSelectedValue] = useState(localStorage.getItem("cosechaActiva"));

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        setAppStage(1);
    };

    // useEffect(() => {
    //     const fetchData = () => {
    //         // pruebaSaveData()
    //         infoTabCapacidad()
    //     }
    //     fetchData()
    // }, [])

    // const recuperaCosecha = (event) => {
    //     cosechaSelect = event;
    //     setIsCosecha(cosechaSelect);

    //     generaData();
    // };

    var result = {};
    let capacidad = [];

    const generaData = (infoCap) => {

        // Iterar sobre cada objeto del array
        infoCap.forEach(info => {
            // Verificar si ya existe el arubro_desc en el objeto result
            if (!result[info.arubro_desc]) {
                result[info.arubro_desc] = {};
            }

            // Verificar la condición y asignar el valor correspondiente
            if (info.condicion === "P") {
                result[info.arubro_desc].propio = info.has;
            } else {
                result[info.arubro_desc].alquilado = info.has;
            }
        });


        capacidad = result;

        capacidad = [
            {
                key: 1,
                categoria: "AGRICULTURA",
                propias: result.AGRICULTURA ? result.AGRICULTURA.propio : undefined,
                alquiler: result.AGRICULTURA ? result.AGRICULTURA.alquilado : undefined,
            },
            {
                key: 2,
                categoria: "GANADERIA",
                propias: result.GANADERIA ? result.GANADERIA.propio : undefined,
                alquiler: result.GANADERIA ? result.GANADERIA.alquilado : undefined,
            },
            {
                key: 3,
                categoria: "TAMBO",
                propias: result.TAMBO ? result.TAMBO.propio : undefined,
                alquiler: result.TAMBO ? result.TAMBO.alquilado : undefined,
            },
            {
                key: 4,
                categoria: "MIXTO",
                propias: result.MIXTO ? result.MIXTO.propio : undefined,
                alquiler: result.MIXTO ? result.MIXTO.alquilado : undefined,
            },
            {
                key: 5,
                categoria: "TOTAL",
                propias: <strong>{infoCap[0].ahxs_propias}</strong>,
                alquiler: <strong>{infoCap[0].ahxs_alquiladas}</strong>,
            },
        ];

        console.log(capacidad);


        return result;

    };


    const addCosecha = (infoCap) => {
        setAppStage(2);
        // if (infoCap.length <= 0) {
        //     setIsButtonDisabled(true);
        //     return;
        // }
        // setIsButtonDisabled(false);
    };



    var objData = [];

    const handleStage = () => {
        switch (appStage) {
            case 0:
                return (
                    <Table
                        // style={{fontsize: "10px !important"}}
                        columns={columns}
                        dataSource={capacidad} //Original
                        // dataSource={data} //Para probar
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
                        // style={{fontSize: "10px !important"}}
                        columns={columns}
                        dataSource={capacidad} //Original
                        // dataSource={data} //Para probar
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
    function cosechas(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
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
    var cosecha = parseInt(selectedValue);
    // console.log("variable cosecha: ", cosecha)

    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO
    useEffect(() => {
        if (idCliente) {
            //infoTabCapacidad(idCliente, cosecha);
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
            cosechas(idCliente);
            rubros();
        }
    }, [idCliente, cosecha]);

    if (infoCap.length > 0) {
        // console.log("infoCap desde Capacidad: ", infoCap);
        // console.log("infoCap[0] desde Capacidad: ", infoCap[0].condicion);
        generaData(infoCap);

        setIsButtonEditDisabled(false);
        setIsButtonDisabled(true);

    } else {
        setIsButtonEditDisabled(true);
        setIsButtonDisabled(false);
    }

    // if (infoRubros.length > 0) {
    //     console.log("infoRubros desde Capacidad: ", infoRubros);
    //     console.log("infoRubros[0] desde Capacidad: ", infoRubros[0].arubro_desc);
    // }

    if (infoCosechas.length > 0) {
        localStorage.setItem("cosechaActiva", infoCosechas[0].acos_desc);
        // console.log("infoCosechas desde Capacidad: ", infoCosechas);
        // console.log("infoCosechas[0] desde Capacidad: ", infoCosechas[0].acos_desc);
    }


    // useEffect(() => {
    //     if (infoCap[0].ahxs_alquiladas === 0) {
    //       setIsButtonEditDisabled(false);
    //       setIsButtonDisabled(true);
    //     } else {
    //       setIsButtonEditDisabled(true);
    //       setIsButtonDisabled(false);
    //     }
    //   }, [infoCap]);



    /*-----------PARA PROBAR--------------*/
    // const data = [
    //     {
    //         key: '1',
    //         categoria: 'AGRICULTURA',
    //         propias: 200,
    //         alquiler: 300,
    //     },
    //     {
    //         key: '2',
    //         categoria: 'GANADERIA',
    //         propias: 300,
    //         alquiler: 200,
    //     },
    //     {
    //         key: '3',
    //         categoria: 'TAMBO',
    //         propias: 250,
    //         alquiler: 400,
    //     },
    //     {
    //         key: '4',
    //         categoria: 'MIXTO',
    //         propias: 250,
    //         alquiler: 200,
    //     },
    //     {
    //         key: '5',
    //         categoria: 'TOTAL',
    //         propias: 1000,
    //         alquiler: 1100,
    //     },
    // ];
    /*------------------------------------*/
    // const setSelect = () => {
    //     localStorage.setItem("cosechaActiva", infoCosechas.acos_desc)
    // }
    return (
        <>
            <div className="divDropdown">
                <Select
                    className="selectCosecha"
                    style={{ width: '80px' }}
                    onChange={(value) => setSelectedValue(value)}
                    defaultValue={selectedValue}
                >
                    {infoCosechas.length > 0 && infoCosechas.map((cosecha) => {
                        return (
                            <Select.Option key={cosecha.acos_desc} value={cosecha.acos_desc}>{cosecha.acos_desc}</Select.Option>
                        )
                    })}

                </Select>
                <Button
                    style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important" }}
                    className="btnEditCosecha"
                    icon={<EditOutlined />}
                    onClick={() => editarCosecha()}
                    // onChange={(e) => recuperaCosecha(e)}
                    disabled={isButtonEditDisabled}
                />
                <Button
                    style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important" }}
                    className="btnAddCosecha"
                    icon={<PlusCircleOutlined style={{"--antd-wave-shadow-color": "transparent !important"}}/>}
                    onClick={() => {
                        addCosecha(infoCap);
                    }}
                    disabled={isButtonDisabled}
                />
            </div>

            {<>{handleStage()}</>}
        </>
    );
};

export default Capacidad;
