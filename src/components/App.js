import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';

import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from './../helper';

class App extends Component {

  state = {
    resultado: '',
    datos: {}
  }

  cotizarSeguro = (datos) => {
    const {marca, plan, year} = datos;

    //agregar una base de 2000
    let resultado = 2000;

    //obtener la diferencia de anios
    const diferencia = obtenerDiferenciaAnio(year);

    //por cada anio restar el 3% al valor del Seguro
    resultado -= ( (diferencia * 3) * resultado ) / 100;

    //americano 15% asiatico 5% europeo 30%  de incremento al valor actual

    resultado = calcularMarca(marca) * resultado;


    //plan basico incremente 20% y completo 50%

    let incrementoPlan = obtenerPlan(plan);

    //dependiendo del plan incrementar

    resultado = parseFloat(resultado * incrementoPlan).toFixed(2);

    ///crear objeto para resumen


    const datosAuto = {
      marca : marca,
      plan : plan,
      year : year
    }

    this.setState({
      resultado : resultado,
      datos: datosAuto
    });


  }

  render() {
    return (
      <div className="contenedor">
        <Header
            titulo = 'Cotizador de Seguro de Auto'
          />

        <div className='contenedor-formulario'>

            <Formulario
                cotizarSeguro={this.cotizarSeguro}
              />

            <Resumen
              datos={this.state.datos}
              resultado={this.state.resultado}
              />

              <Resultado
      					resultado={this.state.resultado}
      					/>
        </div>
      </div>
    );
  }
}

export default App;
