import { useContext } from "react"; //SIRVE PARA EXTRAER LOS DATOS DEL CONTEXT
import PacientesContext from "../context/PacientesProvider"; // IDENTIFICAR QUE CONTEXT

const usePacientes = () => {

    return useContext(PacientesContext);
}

export default usePacientes;
