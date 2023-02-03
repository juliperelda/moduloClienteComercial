/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Button, Popover, Select, Space, Table, Tooltip } from "antd";
import { EditOutlined, InfoCircleOutlined, PieChartOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { GlobalContext } from "../../context/GlobalContext";
import "./capacidad.css";
import { EditarCapacidad } from "./EditarCapacidad";
import { NuevaCapacidad } from "./NuevaCapacidad";
import { GraficoCapacidad } from "./GraficoCapacidad";

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
    {
        title: <span style={{ color: "#00b33c" }}>TOTAL</span>,
        dataIndex: "total",
        key: "total",
        editable: true,
        width: "30%",
        align: "right",
    },
    {
        title: <span style={{ color: "#00b33c" }}>(%)</span>,
        dataIndex: "porcentaje",
        key: "porcentaje",
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
        update,
        setUpdate,
        setInfoEdit,
        isSelectEditDisabled,
        setIsSelectEditDisabled,
        isValorPorcentaje,
        setIsValorPorcentaje
    } = useContext(GlobalContext);

    const [isHayData, setIsHayData] = useState(false);
    const [selectedValue, setSelectedValue] = useState(localStorage.getItem("cosechaActiva"));

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        setIsSelectEditDisabled(!isSelectEditDisabled)
        setAppStage(1);
    };


    var result = {};
    let capacidad = [];

    const generaData = (infoCap) => {

        setInfoEdit(infoCap);
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
            // {
            //     key: 1,
            //     categoria: "AGRICULTURA",
            //     propias: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.propio) : 0,
            //     alquiler: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.alquilado) : 0,
            //     total: (
            //         <>
            //             {result.AGRICULTURA ? parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado) : 0} 
            //             {' '}
            //             ({((result.AGRICULTURA ? (parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)}%)
            //         </>
            //     ),
            // },
            {
                key: 1,
                categoria: "AGRICULTURA",
                propias: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.propio) : 0,
                alquiler: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.alquilado) : 0,
                total: result.AGRICULTURA ? parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado) : 0,
                porcentaje: (((result.AGRICULTURA ? (parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 2,
                categoria: "GANADERIA",
                propias: result.GANADERIA ? Math.trunc(result.GANADERIA.propio) : 0,
                alquiler: result.GANADERIA ? Math.trunc(result.GANADERIA.alquilado) : 0,
                total: result.GANADERIA ? parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado) : 0,
                porcentaje: (((result.GANADERIA ? (parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 3,
                categoria: "TAMBO",
                propias: result.TAMBO ? Math.trunc(result.TAMBO.propio) : 0,
                alquiler: result.TAMBO ? Math.trunc(result.TAMBO.alquilado) : 0,
                total: result.TAMBO ? parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado) : 0,
                porcentaje: (((result.TAMBO ? (parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'
            },
            {
                key: 4,
                categoria: "MIXTO",
                propias: result.MIXTO ? Math.trunc(result.MIXTO.propio) : 0,
                alquiler: result.MIXTO ? Math.trunc(result.MIXTO.alquilado) : 0,
                total: result.MIXTO ? parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado) : 0,
                porcentaje: (((result.MIXTO ? (parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%'

            },
            {
                key: 5,
                categoria: (
                    <>
                        <strong>TOTAL </strong>
                        <InfoCircleOutlined
                            title="El total puede diferir porque no es sumatoria del desglose por Rubro."
                            style={{ color: "#00b33c" }}
                        />
                    </>
                ),
                propias: <strong>{Math.trunc(infoCap[0].ahxs_propias)}</strong>,
                alquiler: <strong>{Math.trunc(infoCap[0].ahxs_alquiladas)}</strong>,
                total: <strong>{parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)}</strong>

            },
        ];

        // console.log(capacidad);
        return result;

    };

    useEffect(() => {
        setIsValorPorcentaje({
            porcentajeAgricultura: { name: "agricultura", porcentaje: (((capacidad.AGRICULTURA ? (parseInt(capacidad.AGRICULTURA.propio) + parseInt(capacidad.AGRICULTURA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) },
            porcentajeGanaderia: { name: "ganaderia", porcentaje: (((capacidad.GANADERIA ? (parseInt(capacidad.GANADERIA.propio) + parseInt(capacidad.GANADERIA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) },
            porcentajeTambo: { name: "tambo", porcentaje: (((capacidad.TAMBO ? (parseInt(capacidad.TAMBO.propio) + parseInt(capacidad.TAMBO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) },
            porcentajeMixto: { name: "mixto", porcentaje: (((capacidad.MIXTO ? (parseInt(capacidad.MIXTO.propio) + parseInt(capacidad.MIXTO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) },
        });

        console.log("Desde capacidad: ", isValorPorcentaje)
    }, [])



    const addCosecha = () => {
        setAppStage(2);
    };

    const verGrafico = () => {
        setAppStage(3);
    }

    // const data = [
    //     {
    //       key: '1',
    //       propias: 100,
    //       alquilas: 150,
    //       total: 250
    //     },
    //     {
    //       key: '2',
    //       propias: 100,
    //       alquilas: 150,
    //       total: 250
    //     },
    //   ];


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
            case 3:
                return <GraficoCapacidad />;
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



    var cosecha = parseInt(selectedValue);


    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CAPACIDAD PRODUCTIVA INICIAL
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
    }, [idCliente, cosecha, update]);

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
        localStorage.setItem("idCosecha", infoCosechas[0].acos_id);
        // console.log("infoCosechas desde Capacidad: ", infoCosechas);
        // console.log("infoCosechas[0] desde Capacidad: ", infoCosechas[0].acos_desc);
    }


    // useEffect(() => {

    // }, [])



    return (
        <>
            <div className="divDropdown">
                <h1 className="titulos" style={{ marginBottom: "11px" }}>
                    CAPACIDAD PRODUCTIVA
                </h1>
                <Select
                    className="selectCosecha"
                    style={{ width: '80px', marginLeft: "30px", marginTop: "-8px" }}
                    onChange={(value) => { setSelectedValue(value); localStorage.setItem("idCosechaSelec", value) }}
                    defaultValue={selectedValue}
                    disabled={isSelectEditDisabled}
                >
                    {infoCosechas.length > 0 && infoCosechas.map((cosecha) => {
                        return (
                            <Select.Option key={cosecha.acos_desc} value={cosecha.acos_desc}>{cosecha.acos_desc}</Select.Option>
                        )
                    })}

                </Select>
                <Button
                    style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                    className="btnEditCosecha"
                    icon={<EditOutlined />}
                    onClick={() => editarCosecha()}
                    // onChange={(e) => recuperaCosecha(e)}
                    disabled={isButtonEditDisabled}
                />
                <Button
                    style={{ boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                    className="btnAddCosecha"
                    icon={<PieChartOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                    onClick={() => {
                        verGrafico();
                    }}
                    disabled={isButtonDisabled}
                >
                </Button>
                <Button
                    style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                    className="btnAddCosecha"
                    icon={<PlusCircleOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                    onClick={() => {
                        addCosecha();
                    }}
                    disabled={isButtonDisabled}
                />
            </div>

            {<>{handleStage()}</>}
        </>
    );
};

export default Capacidad;