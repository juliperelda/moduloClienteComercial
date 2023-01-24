import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function InfoGrafEvol(idCliente) {
    
    const { infoEvo, setInfoEvo } = useContext(GlobalContext);

    useEffect(() => {

      if (idCliente) {

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
                console.log(objetoData);
                setInfoEvo(objetoData);
  
            });
        });
        
      }
    
      return console.log(infoEvo);

    }, [idCliente, infoEvo, setInfoEvo])    

};

export default InfoGrafEvol;

// function getInfoGrafEvol(idC) {
//     const data = new FormData();
//     data.append("idC", idC);
//     fetch("../com_graEvolucionData.php", {
//         method: "POST",
//         body: data,
//     }).then(function (response) {
//         response.text().then((resp) => {
//         console.log("PARA GRAFICO EVOLUCION");
//         const data = resp;
//         const objetoData = JSON.parse(data);
//         console.log(objetoData);
//         return objetoData;
//         });
//     });
// };


