import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContex = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const {auth} = useAuth();


    useEffect(() => {
        const obtenerPacientes = async () => {
            
            try{
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config);
                setPacientes(data);

            } catch(error) {
                console.log(error)
            }
        } 
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(paciente.id){
            try{
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setPacientes(pacientesActualizado);

            }catch(error){
                console.log(error.response.data.msg);
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                //ELIMINO ESOS DATOS QUE NO NECESITO Y CREO COPIA DE LO QUE SI EN pacienteAlmacenado
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data; 
                // PEDIMOS QUE AGG PRIMERO EL NUEVO PACIENDO Y LUEGO COPIA LOS ANTERIORES
                setPacientes([pacienteAlmacenado, ...pacientes]);  
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente); //SE PUEDE PASAR ASI PORQUE YA ESTOY ITERANDO LOS DATOS EN LISTADO PACIENTE
    }

    const eliminarPaciente = async id =>{
        const confirmar = confirm("¿Confirmas que deseas eliminar el paciente?");

        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);

                setPacientes(pacientesActualizado);

                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContex.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContex.Provider>
    )
}

export default PacientesContex;
