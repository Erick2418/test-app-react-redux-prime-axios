import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { classNames } from 'primereact/utils';
import 'primereact/resources/themes/lara-dark-purple/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css';         // Importa PrimeReact CSS
import 'primeicons/primeicons.css';                       // Importa PrimeIcons
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import DocsPage from '../docs/pages/DocsPage';

export const AppRouter = () => {

    //const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';
    
    const {status,chechAuthToken} = useAuthStore();


    useEffect(() => {
        chechAuthToken();
    }, [])
    


    if(status === 'checking'){
        return( 
            <div>Cargando...</div>
        )
    }
    

    const containerClass = classNames('layout-wrapper' );

    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ (
                                <>    
                                    <div className={containerClass}>
                                        <div className="layout-main-container ">
                                            <LoginPage />
                                        </div> 
                                    </div>
                                </> 

                            ) } />

                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ (
                                <> 
                                    <div className={containerClass}>
                                        <div className="layout-main-container ">
                                            <DocsPage />
                                        </div> 
                                    </div>
                                </> 

                            ) } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

          
        </Routes>
    )
}

/* {
    ( status === 'not-authenticated')  
        ? 
        (
            <> 
            
            <div className={containerClass}>
                <div className="layout-main-container ">
                    <LoginPage />
                </div> 
            </div>
            </> 
        )
        
        : <Route path="/*" element={ 
            <> 
                <div className={containerClass}>
                    <div className="layout-main-container ">
                        <DocsPage />
                    </div> 
                </div>
            </> 
        } />
}
<Route path="/*" element={ <Navigate to="/auth/login" /> } /> */