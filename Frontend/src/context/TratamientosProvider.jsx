import axios from "axios";
import { createContext, useState } from "react";
//Creacion del grupo 
const tratamientosContext = createContext()

//Integrantes
const TratamientosProvider=({children})=>{
    const [tratamientos, setTratamientos] = useState([])
    const [modal, setModal]=useState(false)

    const handleModal = ()=> {
        setModal(!modal)
    }
    const registrarTratamiento =async(datos)=>{
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)
            setTratamientos([respuesta.data.tratamiento,...tratamientos])
            console.log(respuesta)
        } catch (error) {
            console.log(error);
        }
    }
    const eliminarTratamiento =async(id)=>{
        try {
            const confirmar = confirm("Vas a eliminar el tratamiento de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                try {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
                    const options={
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    await axios.delete(url,options)
                    const tratamientosActualizados= tratamientos.filter(rt=>rt._id!== id)
                    setTratamientos(tratamientosActualizados)
                    console.log(respuesta)
                } catch (error) {
                    console.log(error);
                }
            } 
            }catch (error) {
                setMensaje({ respuesta: response.data?.msg, tipo: false })
        }
    }
    const cambiarTratamiento =async(id)=>{
        try {
            const confirmar = confirm("Vas a cambiar el estado, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                try {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
                    const options={
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    await axios.post(url,{},options)
                    const tratamientosActualizados= tratamientos.filter(rt=>rt._id!== id)
                    setTratamientos(tratamientosActualizados)
                    console.log(respuesta)
                } catch (error) {
                    console.log(error);
                }
            } 
            }catch (error) {
                setMensaje({ respuesta: response.data?.msg, tipo: false })
        }
    }

    return(
        <tratamientosContext.Provider value={
            {
                //contenido del mensaje
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamiento,
                eliminarTratamiento,
                cambiarTratamiento
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )
}
export{TratamientosProvider}
export default tratamientosContext