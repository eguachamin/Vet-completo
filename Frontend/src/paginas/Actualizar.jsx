import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Formulario} from '../componets/Formulario.jsx'


const Actualizar = () => {
    const [paciente, setPaciente]= useState({})

    const {id}= useParams()
    const consultarPaciente = async () => {
      try {
        //Paso obtener token 
        const token = localStorage.getItem('token')
        //endpoint
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`
        //cabeceras
        const options ={
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        //respuesta del backend
        const respuesta= await axios.get(url,options)
        setPaciente(respuesta.data.paciente)
    }
      catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      //2 opciones
        consultarPaciente()
        //2da opcion 
        //realizar la logica directo desde const consulta pacientes toda esa logica 
    },[])


    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>PACIENTE</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar un paciente</p>
            {
                Object.keys(paciente).length !=0 && <Formulario paciente={paciente}/>
            }
            
        </div>
    )
}

export default Actualizar