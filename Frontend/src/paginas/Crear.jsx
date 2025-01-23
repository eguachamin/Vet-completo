import React, { useContext } from 'react'
import { Formulario } from '../componets/Formulario'
import AuthContext from '../context/AuthProvider'
import { Forbidden } from './Forbidden'



const Crear = () => {
    const {auth}= useContext(AuthContext)
    return (
        <div>
            {
                "propietario" in auth 
                    ? (<Forbidden/>)
                    : 
                    (
                        <div>
                            <h1 className='font-black text-4xl text-gray-500'>Pacientes</h1>
                            <hr className='my-4' />
                            <p className='mb-8'>Este módulo te permite registrar un nuevo paciente</p>
                            <Formulario />

                        </div>
                    )
            }
            
        </div>
    )
}

export default Crear