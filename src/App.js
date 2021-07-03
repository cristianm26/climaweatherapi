import React, { useEffect, useState } from 'react'
import Clima from './Components/Clima'
import Error from './Components/Error'
import Formulario from './Components/Formulario'
import Header from './Components/Header'

const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  //extraer ciudad y pais 
  const { ciudad, pais } = busqueda;

  const [consultar, setConsultar] = useState(false);


  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '567c79495f43c6394ae44704d5250b10';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false)

        // Detecta si hubo resultados correctos en la consulta
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false)
        }
      }

    }
    consultarApi();
    // eslint-disable-next-line
  }, [consultar])

  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <>
      <Header
        titulo='Clima React App'
      />

      <div className="contenedor-form" >
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
