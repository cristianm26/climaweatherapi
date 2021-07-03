import React, { useState } from 'react'
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    //state del formulario


    const [error, setError] = useState(false)
    //extraer ciudad y pais 
    const { ciudad, pais } = busqueda;

    // función que coloca los elementos en el state
    const hadleChange = (e) => {
        //actualizar el state
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario da submit al form 
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validar
        if (ciudad.trim() === '' || pais.trim() === '') {
            setError(true)
            return;
        }
        setError(false)
        setConsultar(true)


    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <Error mensaje="Todos Los Campos Son Obligatorios" /> : null}
            <div className="input-field col s12" >
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={hadleChange}
                />
                <label htmlFor="ciudad" >Ciudad:</label>
            </div>

            <div className="input-field col s12" >
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={hadleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="EC">Ecuador</option>
                </select>
                <label htmlFor="pais" >País:</label>
            </div>

            <div className="input-field col s12">
                <button type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" >Buscar Clima</button>
            </div>

        </form>
    )
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired,
}

export default Formulario
