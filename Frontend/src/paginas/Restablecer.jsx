import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Restablecer() {
    //Paso 1 Variable
    const {token}=useParams()
    //Paso 1 VVariable
    const [form, setForm] = useState({
        password:"",
        confirmpassword:""
    })  
    

    
    const [tokenback, setTokenback] = useState(false) 
     //Paso 2 Backend
     
    const verifytoken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}` 
        const respuesta = await axios.get(url)
        //console.log(respuesta)
        setTokenback(true)
        toast.success(respuesta.data.msg)
      } catch (error) {
        //console.log(error)
        toast.error(error.response.data.msg)
      }
    }
    useEffect(()=>{
        verifytoken()
    },[])
    //Paso 2
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
   //Paso 3 Presentar
   const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
        const respuesta = await axios.post(url,form)
        //console.log(respuesta)
        toast.success(respuesta.data.msg)
    } catch (error) { 
        //console.log(error)
        toast.error(error.response.data.msg)
    }
    }
  return (
    <div>
      <ToastContainer />
        {
            tokenback &&
            <form onSubmit={handleSubmit} >
        <label >Password</label>
        <input name='password' value={form.password } onChange={handleChange} type="password" />

        <label >Confirm Password</label>
        <input name='confirmpassword' value={form.confirmpassword} onChange={handleChange} type="password" />

        <button>Enviar</button>
        </form>
        }
      
    </div>
  )
}


