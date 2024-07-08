import { Provider } from 'react-redux'
import { store } from './store'
import { AppRouter } from './router'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'; 

import 'primeicons/primeicons.css';
import './App.css'
 

export const  DocApp = () => { 
  const value = {
    appendTo: 'self',
   
  };

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <PrimeReactProvider value={value}>
          
            <AppRouter />
        
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  )
}