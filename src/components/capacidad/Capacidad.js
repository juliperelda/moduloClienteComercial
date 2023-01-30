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

    const [isDataTable, setIsDataTable] = useState([]);


    const [selectedValue, setSelectedValue] = useState(localStorage.getItem("cosechaActiva"));
    const [probando, setprobando] = useState({});

    const editarCosecha = () => {
        setIsButtonEditDisabled(true);
        // isDataStorage.forEach(function (data) {
        //     if (parseInt(data.cosecha) === parseInt(isCosecha)) {
        //         setDataContext(data);
        //     }
        // });
        setAppStage(1);
    };

    // const recuperaCosecha = (event) => {
    //     cosechaSelect = event;
    //     setIsCosecha(cosechaSelect);

    //     generaData();
    // };

    const generaData = (infoCap) => {
        console.log('Entra en generarData')
        // infoCap.map((item) => {
        //     console.log("Condicion:",item.condicion);
        //     console.log("rubro:",item.arubro_desc);
        //     console.log("cantidad:",item.has);
        // })

        let capacidad = [];
        infoCap.map(item => capacidad.push(item));
        console.log('capacidad:', capacidad);

        // var arrayData = [];
        // setprobando('')
        // setprobando(
        //     (arrayData = [
        //         {
        //             key: 1,
        //             categoria: "AGRICULTURA",
        //             propias: prueba.agriculturaPr,
        //             alquiler: prueba.agriculturaAl,
        //         },
        //         {
        //             key: 2,
        //             categoria: "GANADERIA",
        //             propias: prueba.ganaderiaPr,
        //             alquiler: prueba.ganaderiaAl,
        //         },
        //         {
        //             key: 3,
        //             categoria: "TAMBO",
        //             propias: prueba.tamboPr,
        //             alquiler: prueba.tamboAl,
        //         },
        //         {
        //             key: 4,
        //             categoria: "MIXTO",
        //             propias: prueba.mixtoPr,
        //             alquiler: prueba.mixtoAl,
        //         },
        //         // {
        //         //     key: 5,
        //         //     categoria: "TOTAL",
        //         //     propias: propioTotal,
        //         //     alquiler: alqTotal,
        //         // },
        //     ])
        // );
        //console.log(arrayData);

    };

    const addCosecha = () => {
        setAppStage(2);
        if (isCosecha) {
            setIsButtonDisabled(true);
            return;
        }
        setIsButtonDisabled(false);
    };

    const handleStage = () => {
        switch (appStage) {
            case 0:
                return (
                    <Table
                        columns={columns}
                        // dataSource={probando}
                        dataSource={isDataTable}
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
                        // dataSource={probando}
                        dataSource={isDataTable}
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
            // setSelectedValue(infoCosechas.length > 0 && infoCosechas[0].acos_desc);
        }
    }, [idCliente, cosecha]);

    if (infoCap.length > 0) {
        console.log("infoCap desde Capacidad: ", infoCap);
        console.log("infoCap[0] desde Capacidad: ", infoCap[0].condicion);
        generaData(infoCap);
    }

    // if (infoRubros.length > 0) {
    //     console.log("infoRubros desde Capacidad: ", infoRubros);
    //     console.log("infoRubros[0] desde Capacidad: ", infoRubros[0].arubro_desc);
    // }

    if (infoCosechas.length > 0) {
        localStorage.setItem("cosechaActiva",infoCosechas[0].acos_desc);
        // console.log("infoCosechas desde Capacidad: ", infoCosechas);
        // console.log("infoCosechas[0] desde Capacidad: ", infoCosechas[0].acos_desc);
    }


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
                    style={{ alignItems: "center" }}
                    className="btnEditCosecha"
                    icon={<EditOutlined />}
                    // onClick={() => editarCosecha()}
                    // onChange={(e) => recuperaCosecha(e)}
                    disabled={isButtonEditDisabled}
                />
                <Button
                    className="btnAddCosecha"
                    icon={<PlusCircleOutlined />}
                    // onClick={() => {
                    //     addCosecha();
                    // }}
                    disabled={isButtonDisabled}
                />
            </div>

            {<>{handleStage()}</>}
        </>
    );
};

export default Capacidad;
