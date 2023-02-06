/* eslint-disable no-unused-vars */
import { Button,Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./capacidad.css";

export const NuevaCapacidad = () => {
  var objData = [];

  //! UseContext
  const {
    dataContext,
    setDataContext,
    isCosecha,
    setIsCosecha,
    appStage,
    setAppStage,
    isButtonDisabled,
    setIsButtonDisabled,
    update,
    setUpdate,
  } = useContext(GlobalContext);

  //! UseState
  const [isData, setIsData] = useState({});
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isDataSet, setIsDataSet] = useState({});

  //! Funciones
  const traeData = () => {
    if (localStorage.getItem("data")) {
      setIsDataSet(JSON.parse(localStorage.getItem("data")).objData);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      traeData();
    };
    fetchData();
  }, []);

  const handleOk = () => {
    let inputPropias = document.getElementById("inputPropias").value;
    let inputAgricultura = document.getElementById("inputAgricultura").value;
    let inputGanaderia = document.getElementById("inputGanaderia").value;
    let inputTambo = document.getElementById("inputTambo").value;
    let inputMixto = document.getElementById("inputMixto").value;
    let totalPropias =
      parseInt(inputAgricultura) +
      parseInt(inputGanaderia) +
      parseInt(inputTambo) +
      parseInt(inputMixto);

    let inputAlquiladas = document.getElementById("inputAlquiladas").value;
    let inputAgriculturaA = document.getElementById("inputAgriculturaA").value;
    let inputGanaderiaA = document.getElementById("inputGanaderiaA").value;
    let inputTamboA = document.getElementById("inputTamboA").value;
    let inputMixtoA = document.getElementById("inputMixtoA").value;
    let totalAlquiladas =
      parseInt(inputAgriculturaA) +
      parseInt(inputGanaderiaA) +
      parseInt(inputTamboA) +
      parseInt(inputMixtoA);

    if (isData.cosecha !== null) {
      if (totalPropias <= inputPropias && totalAlquiladas <= inputAlquiladas) {
        if (localStorage.getItem("data")) {
          objData = [...isDataSet, isData];
        } else {
          objData = [isData];
        }

        localStorage.setItem("data", JSON.stringify({ objData }));
        setAppStage(0);

        let cli = localStorage.getItem("cliente");

        newCap(cli, isData);

        setUpdate(!update);

      } else {
        alert(
          "El total de Has. de Rubros supera a las Has. Propias en general"
        );
        setIsActiveModal(true);
      }
    } else {
      alert("Se debe ingresar la cosecha");
    }
  };

  const handleInputChange = (event) => {
    setIsData({
      //Crea el objeto de lo que escribo en los campos
      ...isData,
      cosecha: localStorage.getItem("idCosechaSelec")
        ? localStorage.getItem("idCosechaSelec")
        : null,
      [event.target.name]: event.target.value,
    });
  };

  //console.log(isData);

  //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA COSECHA
  function newCap(cli, isData) {
    const data = new FormData();
    data.append("idC", cli);
    data.append("idCos", isData["cosecha"]);
    data.append("cantAP", isData["agricultura"]);
    data.append("cantAA", isData["agriculturaA"]);
    data.append("cantGP", isData["ganaderia"]);
    data.append("cantGA", isData["ganaderiaA"]);
    data.append("cantTP", isData["tambo"]);
    data.append("cantTA", isData["tamboA"]);
    data.append("cantMP", isData["mixto"]);
    data.append("cantMA", isData["mixtoA"]);
    data.append("totalP", isData["propias"]);
    data.append("totalA", isData["alquiladas"]);
    fetch("../com_newCapacidad.php", {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
        // const objetoData = JSON.parse(data);
        // console.log("Nueva capacidad: ", objetoData)
      });
    });
  }

  const salir = () => {
    setIsButtonDisabled(false);
    setDataContext(null);
    setUpdate(!update);
    setAppStage(0);
  };

  return (
    <>
      <div className="divNuevaCapacidad">
        <div className="cont">
          <table>
            <thead>
              <tr>
                <th className="encabezadoVacio" style={{ width: "385px" }}></th>
                <th className="encabezados" style={{ "text-align": "right" }}>
                  PROPIAS
                </th>
                <th className="encabezados" style={{ "text-align": "right" }}>
                  ALQUILER
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">AGRICULTURA</td>
                <td className="celdaInput">
                  <Form.Item name="inputAgricultura">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="agricultura"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputAgriculturaA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="agriculturaA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">GANADERIA</td>
                <td className="celdaInput">
                  <Form.Item name="inputGanaderia">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="ganaderia"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputGanaderiaA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="ganaderiaA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">TAMBO</td>
                <td className="celdaInput">
                  <Form.Item name="inputTambo">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="tambo"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputTamboA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="tamboA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaRubro">MIXTO</td>
                <td className="celdaInput">
                  <Form.Item name="inputMixto">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="mixto"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputMixtoA">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="mixtoA"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="celdaInput" style={{ "font-weight": "bold" }}>
                  TOTAL
                </td>
                <td className="celdaInput">
                  <Form.Item name="inputPropias">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="propias"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </td>
                <td className="celdaInputAlquiladas">
                  <Form.Item name="inputAlquiladas">
                    <Input
                      className="inputTable"
                      type="number"
                      placeholder="0"
                      name="alquiladas"
                      style={{ textAlign: "right" }}
                      defaultValue={0}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Item>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="contBotonesNuevaCapacidad">
          <div>
            <Button className="btnAddCosechaData" onClick={() => handleOk()}>
              {" "}
              Guardar
            </Button>
          </div>
          <div>
            <Button className="btnAddCosechaData" onClick={() => salir()}>
              {" "}
              Cancelar
            </Button>
          </div>
        </div>
        {isActiveModal ? (
          // <Modal title="" open={isActiveModal} onOk={cerrar}>
          // <h2>VALOR INCORRECTO</h2>
          <p style={{ color: "red" }}>
            Revise la cantidad de Has. Total con las Has. de los Rubros
          </p>
        ) : (
          // </Modal>
          ""
        )}
      </div>
    </>
  );
};
