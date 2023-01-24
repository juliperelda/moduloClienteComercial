const idC = localStorage.getItem("cliente");

<button onClick={() => infoTabCapacidad(idC)}>INFO EVO</button>

function infoTabCapacidad(idC){
    const data = new FormData();
    data.append('idC', idC);
    fetch('../com_tabCapacidadData.php', {
        method: 'POST',
        body: data
    }).then(function(response) {
       response.text().then(resp => {
          console.log('PARA INFO TABLA CAPACIDAD') 
          const data = resp;
          const objetoData = JSON.parse(data);
  
          console.log(objetoData);
      });
    })
}