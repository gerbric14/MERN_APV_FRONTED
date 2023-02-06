import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

    const {guardarPassword} = useAuth();

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        psw_actual: '',
        psw_nuevo: ''
    });


    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(campo => campo === '')){
            setAlerta({
                msg: 'Todos los campos son obligatorios', 
                error: true
            })
            return;
        }
        if(password.psw_nuevo.length < 6 ){
            setAlerta({
                msg: 'El password debe tener mínimo 6 caracteres', 
                error: true
            })
            return;
        }
        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);
    }

    const {msg} = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-xl text-center mt-10">Cambiar Password</h2>

        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '}
            <span className=" text-indigo-600 font-bold">Password aquí</span>
        </p>


        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="password-actual"
                            className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input type="password" 
                            className="border bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="Escribe tu password actual"
                            id="password-actual"
                            name="psw_actual"
                            onChange={ e => setPassword({
                                ...password, [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="password-nuevo"
                            className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input type="password" 
                            className="border bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="Escribe tu nuevo password "
                            id="password-nuevo"
                            name="psw_nuevo"
                            onChange={ e => setPassword({
                                ...password, [e.target.name] : e.target.value
                            })}
                        />
                    </div>


                    <input type="submit"
                    className="bg-indigo-600  px-10 p-3 w-full mt-5 text-white uppercase font-bold rounded-lg hover:bg-indigo-800 
                    cursor-pointer transition-colors"
                    value="Guardar Cambios"
                    />
                
                </form>
            </div>
        </div>

  </>
  )
}

export default CambiarPassword