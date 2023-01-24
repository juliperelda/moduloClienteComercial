/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function GetInfoGrafEvol(idCliente) {
  const { setInfoEvo } = useContext(GlobalContext);

  const data = new FormData();
  data.append("idC", idCliente);
  fetch("../com_graEvolucionData.php", {
    method: "POST",
    body: data,
  }).then(function (response) {
    response.text().then((resp) => {
      console.log("PARA GRAFICO EVOLUCION");
      const data = resp;
      const objetoData = JSON.parse(data);
      //console.log(objetoData);
      setInfoEvo(objetoData);
    });
  });
}

export default GetInfoGrafEvol;
