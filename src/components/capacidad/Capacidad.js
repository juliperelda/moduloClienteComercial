import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Popover, Select, Space, Table, Tooltip } from "antd";
import { EditOutlined, InfoCircleOutlined, PieChartOutlined, PlusCircleOutlined, TableOutlined } from "@ant-design/icons";
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
        width: "20%",
        align: "right",
    },
    {
        title: <span style={{ color: "#00b33c" }}>ALQUILER</span>,
        dataIndex: "alquiler",
        key: "alquiler",
        editable: true,
        width: "20%",
        align: "right",
    },
    {
        title: <span style={{ color: "#00b33c" }}>TOTAL</span>,
        dataIndex: "total",
        key: "total",
        editable: true,
        width: "20%",
        align: "right",
    },
    {
        title: <span style={{ color: "#00b33c" }}>(%)</span>,
        dataIndex: "porcentaje",
        key: "porcentaje",
        editable: true,
        width: "20%",
        align: "right",
    },
];

const Capacidad = ({ listadoCosechas, cosechaActiva }) => {

    const URL = process.env.REACT_APP_URL;

    // console.log('listadoCosechas: ', listadoCosechas);
    // console.log('cosechaActiva: ', cosechaActiva);
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
        setIsValorPorcentaje,
        iconTable,
        setIconTable,

        estadin, setEstadin,
        estadin1, setEstadin1,

        prueba, setPrueba,
        refrescarTable, setRefrescarTable,
    } = useContext(GlobalContext);

    const [selectedValue, setSelectedValue] = useState(localStorage.getItem("cosechaActiva"));

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        setIsSelectEditDisabled(true)
        setAppStage(1);

    };

    var result = {};
    let capacidad = [];

    //! INICIO - PROBANDO
    useEffect(() => {
        if (infoCap.length > 0) {
            generaData(infoCap);
        }
        // generaData()
    }, [infoCap, idCliente])

    useEffect(() => {
        if (infoCap.length > 0) {
            generaData(infoCap);
        }
        // generaData()
    }, [])
    //! FIN - PROBANDO


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

        // console.log('ahxs_propias: ', parseInt(infoCap[0].ahxs_propias));
        // console.log('ahxs_alquiladas: ', parseInt(infoCap[0].ahxs_alquiladas));
        // console.log('porcentaje Agricultura: ', result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%');
        // console.log('porcentaje ganaderia: ', result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%')

        capacidad = [
            {
                key: 1,
                categoria: "AGRICULTURA",
                propias: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.propio) : 0,
                alquiler: result.AGRICULTURA ? Math.trunc(result.AGRICULTURA.alquilado) : 0,
                total: result.AGRICULTURA ? parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado) : 0,
                // porcentaje: result.AGRICULTURA ? (((result.AGRICULTURA ? (parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%' : 0 + '%'
                // porcentaje: result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%'
                porcentaje: result.AGRICULTURA ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 2,
                categoria: "GANADERIA",
                propias: result.GANADERIA ? Math.trunc(result.GANADERIA.propio) : 0,
                alquiler: result.GANADERIA ? Math.trunc(result.GANADERIA.alquilado) : 0,
                total: result.GANADERIA ? parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado) : 0,
                // porcentaje: result.GANADERIA ? (((result.GANADERIA ? (parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%' : 0 + '%'
                // porcentaje: result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%'
                porcentaje: result.GANADERIA ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.GANADERIA.propio) + parseInt(result.GANADERIA.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 3,
                categoria: "TAMBO",
                propias: result.TAMBO ? Math.trunc(result.TAMBO.propio) : 0,
                alquiler: result.TAMBO ? Math.trunc(result.TAMBO.alquilado) : 0,
                total: result.TAMBO ? parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado) : 0,
                // porcentaje: result.TAMBO ? (((result.TAMBO ? (parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%' : 0 + '%'
                // porcentaje: result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%'
                porcentaje: result.TAMBO ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.TAMBO.propio) + parseInt(result.TAMBO.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 4,
                categoria: "MIXTO",
                propias: result.MIXTO ? Math.trunc(result.MIXTO.propio) : 0,
                alquiler: result.MIXTO ? Math.trunc(result.MIXTO.alquilado) : 0,
                total: result.MIXTO ? parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado) : 0,
                // porcentaje: result.MIXTO ? (((result.MIXTO ? (parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado)) : 0) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%' : 0 + '%'
                // porcentaje: result.AGRICULTURA ? ((parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) !== 0 ? (((parseInt(result.AGRICULTURA.propio) + parseInt(result.AGRICULTURA.alquilado)) / (parseInt(infoCap[0].ahxs_propias || 0) + parseInt(infoCap[0].ahxs_alquiladas || 0)) * 100).toFixed(0)) : 0) + '%' : 0 + '%'
                porcentaje: result.MIXTO ?
                    (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                        (((parseInt(result.MIXTO.propio) + parseInt(result.MIXTO.alquilado)) /
                            (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0))) * 100).toFixed(0) + '%' :
                        0 + '%' :
                    0 + '%'
            },
            {
                key: 5,
                categoria: (
                    <>
                        <strong>TOTAL </strong>
                        <InfoCircleOutlined
                            title="El total puede diferir porque no es sumatoria del desglose por rubro."
                            style={{ color: "#00b33c" }}
                        />
                    </>
                ),
                // propias: <strong>{Math.trunc(infoCap[0].ahxs_propias)}</strong>,
                // alquiler: <strong>{Math.trunc(infoCap[0].ahxs_alquiladas)}</strong>,
                // total: <strong>{parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)}</strong>,
                // porcentaje: <strong>{ (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) !== 0 ? (((parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) / (parseInt(infoCap[0].ahxs_propias) + parseInt(infoCap[0].ahxs_alquiladas)) * 100).toFixed(0)) + '%' : 0 + '%'}</strong>
                propias: <strong>{Math.trunc(infoCap[0]?.ahxs_propias || 0)}</strong>,
                alquiler: <strong>{Math.trunc(infoCap[0]?.ahxs_alquiladas || 0)}</strong>,
                total: <strong>{parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)}</strong>,
                porcentaje: <strong>{(parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) !== 0 ?
                    (((parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) /
                        (parseInt(infoCap[0]?.ahxs_propias || 0) + parseInt(infoCap[0]?.ahxs_alquiladas || 0)) * 100).toFixed(0)) :
                    0}% </strong>,
            },
        ];
        // console.log('result', result)
        // console.log('capacidad', capacidad)
        return result;
    };



    const addCosecha = () => {
        setAppStage(2);
        setIsSelectEditDisabled(false);
    };

    const verGrafico = () => {
        if (iconTable === false) {
            setAppStage(3)
            setIconTable(!iconTable);
        } else {
            setAppStage(0)
            setIconTable(!iconTable);
        }
    }

    const handleStage = () => {
        switch (appStage) {
            case 0:
                return (
                    <Table
                        columns={columns}
                        dataSource={capacidad} //Original
                        pagination={false}
                    />
                );
            case 1:
                return <EditarCapacidad />;
            case 2:
                return <NuevaCapacidad />;
            case 3:
                return <GraficoCapacidad porcentajes={capacidad} />;
            default:
                return (
                    <Table
                        columns={columns}
                        dataSource={capacidad} //Original
                        pagination={false}
                    />
                );
        }
    };

    //* FUNCION QUE TRAE LOS DATOS DE TABLA RUBROS
    function rubros() {
        // Trae la información  con GET
        // fetch("../com_traerRubros.php", {
        fetch(`${URL}com_traerRubros.php`, {
            method: "GET",
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                // console.log('objetoData1: ', objetoData)
                setInfoRubros(objetoData);
                // console.log('infoR')
            });
        });
    }
    //* FUNCION QUE TRAE LOS DATOS DE COSECHA ACTIVA Y LAS QUE SE PUEDEN VISUALIZAR DEL CLIENTE
    function cosechas(idCliente) {
        const data = new FormData();
        data.append("idC", idCliente);
        // fetch("../com_traerCosechas.php", {
        fetch(`${URL}com_traerCosechas.php`, {
            method: "POST",
            body: data,
        }).then(function (response) {
            response.text().then((resp) => {
                const data = resp;
                const objetoData = JSON.parse(data);
                // console.log('objetoData2: ', objetoData)
                setCosechas(objetoData);

            });
        });
    }

    var cosecha = parseInt(selectedValue);
    // console.log('cosechaActiva', cosechaActiva);
    // console.log('selectedValue', selectedValue);
    //* EJECUTA LAS FUNCIONES QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CAPACIDAD PRODUCTIVA INICIAL
    useEffect(() => {
        // if (idCliente) {
        if (estadin1) {
            const data = new FormData();
            data.append("idC", idCliente);
            data.append("cosecha", cosecha);
            // fetch("com_tabCapacidadData.php", {
            fetch(`${URL}com_tabCapacidadData.php`, {
                method: "POST",
                body: data,
            }).then(function (response) {
                response.text().then((resp) => {
                    const data = resp;
                    // console.log('data: ', data)
                    // setInfoCap(data);
                    const objetoData = JSON.parse(data);
                    setInfoCap(objetoData);
                    // console.log('objetoData3: ', objetoData)
                });
            });
            cosechas(idCliente);
            rubros();
            // console.log('Entro al useEffect original')
        }
        // }
    }, [idCliente, cosecha, update, selectedValue]);

    //! INICIO - PROBANDO
    useEffect(() => {
        // if (idCliente) {
        if (!estadin1) {
            const data = new FormData();
            data.append("idC", idCliente);
            data.append("cosecha", cosechaActiva);
            // fetch("com_tabCapacidadData.php", {
            fetch(`${URL}com_tabCapacidadData.php`, {
                method: "POST",
                body: data,
            }).then(function (response) {
                response.text().then((resp) => {
                    const data = resp;
                    // console.log('data - INICIO: ', data)
                    // setInfoCap(data);
                    const objetoData = JSON.parse(data);
                    setInfoCap(objetoData);
                    // console.log('objetoData3 - INFOINICIO: ', objetoData)
                });
            });
            cosechas(idCliente);
            rubros();


            setSelectedValue(cosechaActiva);
            setEstadin1(true);
            // setPrueba(false)
            // console.log('Entro al useEffectProbando')
        }
        // }
    }, [estadin, cosechaActiva /*, update*/, prueba]);
    //! FIN - PROBANDO

    if (infoCap.length > 0) {
        generaData(infoCap);
        setIsButtonDisabled(true);
    } else {
        setIsButtonDisabled(false);
    }

    if (infoCap.length > 0 || selectedValue !== cosechaActiva) { //!Esto es para que solamente se pueda agregar cosecha si es la cosecha activa.
        setIsButtonDisabled(true);
    } else {
        setIsButtonDisabled(false);
    }

    var titleBtnEditar = ''
    if (selectedValue === cosechaActiva) {
        if (infoCap.length > 0) {
            // generaData(infoCap);
            setIsButtonEditDisabled(false);
            titleBtnEditar = 'Editar'

        } else {
            setIsButtonEditDisabled(true);
        }
    } else {
        setIsButtonEditDisabled(true);
        titleBtnEditar = 'Solamente se puede modificar la cosecha activa.'
    }

    if (infoCosechas.length > 0) {
        localStorage.setItem("cosechaActiva", infoCosechas[0].acos_desc);
        localStorage.setItem("idCosecha", infoCosechas[0].acos_id);
    }


    //!Este useEffect es para cuando se edita o se agrega nueva cosecha - Sirve para refrescar la table.
    useEffect(() => {
        if (refrescarTable) {
            generaData(infoCap)
            setRefrescarTable(false)
        }
    }, [refrescarTable, infoCap])


    return (
        <>
            <div className="divDropdown">
                <div className="divTitle-select">
                    <div className="divTitle">
                        <h1 className="titulos" style={{ marginBottom: "11px" }}>
                            CAPACIDAD PRODUCTIVA
                        </h1>
                    </div>
                    {/* <div className="divSelectAndEdit"> */}
                    <div className="divSelect">
                        {/* <Form>
                                <Form.Item
                                    initialValue={initial}
                                > */}
                        <Select
                            className="selectCosecha"
                            style={{ width: '80px', /*marginLeft: "30px", marginTop: "-8px"*/ }}
                            onChange={(value) => { setSelectedValue(value); localStorage.setItem("idCosechaSelec", value) }}
                            // defaultValue={(infoCosechas[0].acos_desc).toString()}
                            defaultValue={cosechaActiva && cosechaActiva}
                            // value={cosechaActiva && cosechaActiva}
                            // value={selectedValue}
                            disabled={isSelectEditDisabled}
                        >
                            {listadoCosechas.length > 0 && listadoCosechas.map((cosecha) => {
                                return (
                                    <Select.Option key={cosecha.acos_desc} value={cosecha.acos_desc}>{cosecha.acos_desc}</Select.Option>
                                )
                            })}
                        </Select>
                        {/* </Form.Item>
                            </Form> */}
                    </div>
                    {/* {selectedValue} */}
                    {/* </div> */}
                </div>
                <div className="divBotonera">
                    <Button
                        style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                        className="btnEditCosecha"
                        icon={<EditOutlined title={titleBtnEditar} />}
                        onClick={() => editarCosecha()}
                        // onChange={(e) => recuperaCosecha(e)}
                        disabled={isButtonEditDisabled}
                    />
                    {
                        !iconTable
                            ?
                            <Button
                                style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                                className="btnGraficoCosecha"
                                icon={<PieChartOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                                onClick={() => {
                                    verGrafico();
                                }}
                            // disabled={isButtonDisabled}
                            />
                            // </Button>
                            :
                            <Button
                                style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                                className="btnGraficoCosecha"
                                icon={<TableOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                                onClick={() => {
                                    verGrafico();
                                }}
                            // disabled={isButtonDisabled}
                            />
                    }
                    <Button
                        style={{ alignItems: "center", boxShadow: "none !important", outline: "0", border: "none !important", marginTop: "-8px" }}
                        className="btnAddCosecha"
                        icon={<PlusCircleOutlined style={{ "--antd-wave-shadow-color": "transparent !important" }} />}
                        onClick={() => {
                            addCosecha();
                        }}
                        disabled={isButtonDisabled}
                    // <TableOutlined />
                    />
                </div>
            </div>

            {<>{handleStage()}</>}
        </>
    );
};

export default Capacidad;