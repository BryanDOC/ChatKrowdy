import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { useStore } from '../zustand';
import { LOGIN_MUTATION } from '../graphql/mutations/login';
import { REGISTER_MUTATION } from '../graphql/mutations/register';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const {setUser} = useStore()
    
    const [login] = useMutation(LOGIN_MUTATION);
    const [registerUser] = useMutation(REGISTER_MUTATION);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (isLogin) {
        try {
          const response = await login({ variables: { email, password } });
          toast.success('Sesión iniciada correctamente');
          setUser(response.data.login)
          navigate('/home');
        } catch (err: any) {
          toast.error("Error al iniciar sesión:", err)
         
        }
      } else {
        try {
          const response = await registerUser({
            variables: { username, email, password },
          });
          console.log('Usuario registrado:', response.data.registerUser);
          toast.success('Usuario registrado correctamente');
          setIsLogin(true);
        } catch (err) {
          console.error('Error al registrar:', err);
          toast.error('Error al registrar');
        }
      }
    };

   const handleLogin = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center h-screen gap-12 px-12 text-white bg-black">
      <div className='hidden md:flex'>
          <img src="/src/assets/Portada.png" alt="" className='w-[450px]'/>
        </div>
      <section className="w-full max-w-md p-6 border-[0.5px] border-gray-500 shadow-lg rounded-2xl">
                <div className='h-full '>
                  <div className=''>
                      <img src="/src/assets/LogoKrowdy.png" alt="logo" className='w-1/2 mx-auto' />
               
          <h2 className="mt-4 mb-8 font-bold text-center text-gray-500">
          {isLogin ? '' : 'Regístrate para chatear con tus amigos'}
            </h2>
                  </div>
              
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Toaster 
            position='bottom-right'
            />
            {!isLogin && (
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                placeholder="Nombre" 
                className="px-4 py-3 text-white placeholder-gray-500 bg-[#121212] border-gray-600 rounded-lg" 
              />
            )}
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="Correo electrónico" 
              className="px-4 py-3 text-white placeholder-gray-500 bg-[#121212] border-gray-600 rounded-lg" 
            />
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="Contraseña" 
              className="px-4 py-3 text-white placeholder-gray-500 bg-[#121212] border-gray-600 rounded-lg" 
            />
            <button 
              type="submit" 
              className="bg-[#fe7541] hover:bg-[#e86436] text-white font-semibold py-2 rounded-xl">
              {isLogin ? 'Entrar' : 'Registrarse'}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-400">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <button 
              className="text-[#fe7541] hover:underline" 
              onClick={handleLogin}>
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </section>
    </div>
  )
}
