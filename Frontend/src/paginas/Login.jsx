import { useContext, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthProvider.jsx'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    //Manejo del Use Context
    const {setAuth} = useContext(AuthContext)

    //Paso 1
    const [form , setForm] = useState({
        email:"",
        password:""
    })
    //Paso 2
    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    // Paso 3
    const handleSubmit = async (e) =>{
        e.preventDefault() //no se permite que se recargue en el formulario 
            const url = form.password.includes("vet") ? 
            `${import.meta.env.VITE_BACKEND_URL}/paciente/login`
            : 
            `${import.meta.env.VITE_BACKEND_URL}/login`
            try {
                const respuesta = await axios.post(url,form)
                localStorage.setItem('token',respuesta.data.token)
                const rol = form.password.includes("vet") ? "paciente" : "veterinario";
                localStorage.setItem('rol', rol);
                setAuth(respuesta.data)
                console.log(respuesta)
                toast.success(respuesta.data.msg)
                navigate('/dashboard')
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            
            }
            
        
    }
    return (
        <>
            <ToastContainer />
            <div className="w-1/2 h-screen bg-[url('/public/images/doglogin.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">
                
                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Welcome back</h1>
                    <small className="text-gray-400 block my-4 text-sm">Welcome back! Please enter your details</small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input name='email' value={form.email || ""} onChange={handleChange} type="email" placeholder="Enter you email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input name='password' value={form.password || ""} onChange={handleChange}  type="password" placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button  className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>

                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-black hover:text-white">
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" />
                        Sign in with Google
                    </button>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-blue-600 hover:text-white">
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" />
                        Sign in with Google
                    </button>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">Forgot your password?</Link>
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Register</Link>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Login