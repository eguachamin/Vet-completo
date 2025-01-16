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

    return(
        <tratamientosContext.Provider value={
            {
                //contenido del mensaje
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamiento
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )
}
export{TratamientosProvider}
export default tratamientosContext