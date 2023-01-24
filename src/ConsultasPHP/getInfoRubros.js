<button onClick={() => rubros()}>INFO EVO</button>



const rubros = () => {
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