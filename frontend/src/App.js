import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import clienteAxios from './config/axios';

//Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';


function App() {
  //State de la App
  const [ getCitas , setCitas ] = useState([]);
  const [ getConsultar, setConsultar ] = useState(true);

  useEffect( () => {
      if(getConsultar){
          const consultarAPI = async () => {
            const respuesta = await clienteAxios.get('/pacientes');
            //console.log(respuesta.data);
            //Colocar en el state
            setCitas(respuesta.data);
            //deshabilitar la consulta
            setConsultar(false);
          }
          consultarAPI();
      }
  }, [getConsultar] );



  return (
    <Router>
      <Switch>
          <Route
            exact 
            path="/"
            component={ () => <Pacientes citas={getCitas}/>}
          />

          <Route
            exact 
            path="/nueva"
            component={ () => <NuevaCita setConsultar={setConsultar}/>}
          />

          <Route
            exact
            path="/cita/:id"
            render={props => {
                const cita = getCitas.filter(cita => cita._id === props.match.params.id);
                console.log(cita);
                return(
                  <Cita cita={cita[0]} 
                        setConsultar={setConsultar}/>
                );
            }}
          />
      </Switch>
    </Router>
  );
}

export default App;
