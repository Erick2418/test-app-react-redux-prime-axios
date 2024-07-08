import { useDispatch, useSelector } from "react-redux"
import { docsApi } from '../api';
import {onChecking,onLogin,clearErrorMessage, onLogout} from '../store';

export const useAuthStore = () => {

    const {
        status,
        user,
        errorMessage,
    } = useSelector( state => state.auth );
     const dispatch = useDispatch();
    
    const startLogin = async ( {email,password} ) => {
        dispatch( onChecking() );
        try{
            const {data} = await docsApi.post('/user/login', { usuario:email, password });
            console.log('here')
            localStorage.setItem('token',data.datos.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            localStorage.setItem('name',data.datos.nombre);
            localStorage.setItem('uid',data.datos.id);
            dispatch( onLogin({name: data.datos.nombre,uid: data.datos.id}) );
        }catch(error){
            console.log('errrorr')
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const chechAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );
        const tokenInitDate = localStorage.getItem('token-init-date');
        const name = localStorage.getItem('name');
        const uid = localStorage.getItem('uid');        
        dispatch( onLogin({name,uid}) );  
        /* try {
            const { data } = await docsApi.get('/user/renew');
            localStorage.setItem('token',data.datos.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch( onLogin({name: data.datos.nombre,uid: data.datos.id}) );
        } catch (error) { 
            dispatch( onLogout('Token no valido') );
            return false;
        } */
    }



    return {
        // PROPIEDADES
        status,
        user,
        errorMessage,

        // METODOS
        startLogin,
        chechAuthToken
  }
}
 