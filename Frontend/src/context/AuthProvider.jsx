import axios from 'axios'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
//Estos se realliza una vez y es para consumir una api privada
//Creacion del grupo de whatsapp (AuthContext)
const AuthContext = createContext()

//Crear el mensaje (AuthProvider)// hijos:Integrantes()
const AuthProvider=({children}) =>{
    const [auth, setAuth]=useState({})

    const perfil = async (token)=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options ={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)

        } catch (error) { 
            console.log(error)
           
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) {
            perfil(token)
        }
    },[])
    
    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            return {respuesta:error.response.data.msg,tipo:false}
        }
    }
    return<AuthContext.Provider value={
        {
            //Contenido del mensaje
            auth,
            setAuth,
            actualizarPerfil
        }
    }>
    {children}
    </AuthContext.Provider>
}

export{
    AuthProvider
}
export default AuthContext