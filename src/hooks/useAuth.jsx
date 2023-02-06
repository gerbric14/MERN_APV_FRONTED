import { useContext } from "react"; //SIRVE PARA EXTRAER LOS DATOS DEL CONTEXT
import AuthContext from "../context/AuthProvider"; // IDENTIFICAR QUE CONTEXT

const useAuth = () => {

    return useContext(AuthContext);
}

export default useAuth;
