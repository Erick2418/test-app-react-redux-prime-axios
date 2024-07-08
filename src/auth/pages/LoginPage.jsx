import React, { useEffect, useRef } from 'react'
import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';                            
import { useAuthStore, useForm } from '../../hooks';
import { Toast } from 'primereact/toast';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: ''
}

export const LoginPage = () => {
    const toast = useRef(null);
    const {startLogin,errorMessage}= useAuthStore();
    const {loginEmail,loginPassword,onInputChange: onLoginInputChange} = useForm(loginFormFields);
    const [checked, setChecked] = useState(false);
   
    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email:loginEmail,password:loginPassword})
    }
    useEffect(() => {
        console.log(errorMessage )
        if(errorMessage !== undefined){
            console.log('error')
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Error en la Autenticación' });
        }
    }, [errorMessage]);

    


  return (
    <>
        <Toast ref={toast} />
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email1" type="text" 
                            name="loginEmail"
                            value={loginEmail}  
                            onChange={onLoginInputChange} 
                            placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" 
                            name="loginPassword"
                            value={loginPassword} 
                            onChange={onLoginInputChange} 
                            placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={loginSubmit}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}