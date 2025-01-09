import { Navigate } from "react-router-dom";
//funcion creada se le llama en app
export const PrivateRoute =({children})=>{

    const autenticado = localStorage.getItem('token')

    return (autenticado) ? children: <Navigate to='/login'/>
}
