import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid'
import PropTypes from 'prop-types'


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    


    const agregarGasto = e => {
        e.preventDefault();
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false)

        const gasto = {
            nombre,
            cantidad,
            id:shortid.generate()
        }

        //Paso el gasto al componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true)

        //Reseteo el form
        guardarNombre('');
        guardarCantidad(0);



    }
    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agraga tus gastos aqui</h2>

            {error ? <Error mensaje='Ambos campos son obligatorios o presupuesto incorrecto' /> : null}

            <div className='campo'>
                <label>Nombre del gasto</label>
                <input
                    type='text'
                    className='u-full-width'
                    placeholder='Ej. transporte'
                    value={nombre}
                    onChange={ e => guardarNombre(e.target.value)}
                ></input>

            </div>

            <div className='campo'>
                <label>Cantidad del gasto</label>
                <input
                    type='number'
                    className='u-full-width'
                    placeholder='Ej. 300'
                    value={cantidad}
                    onChange={ e => guardarCantidad(parseInt(e.target.value, 10))}
                ></input>

            </div>
            <input
                type='submit'
                className='button-primary u-full-width'
                value='Agregar gasto'
            ></input>

        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
  }
 
export default Formulario;