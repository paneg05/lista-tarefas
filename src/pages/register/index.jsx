import { useState,useEfect } from 'react';

import {auth,db} from '../../firebaseConfig/firebaseConnection'
import './index.css'

import {Link} from 'react-router-dom'


function Register() {
const [email,setEmail] = useState('')
const [senha,setSenha] = useState('')



function handleRegister (e){
  e.preventDefault()
  if(email!==''&&senha!==''){
    alert('teste')
  }else{
    alert('preencha todos os campos!')
  }
}




  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta !</span>

      <form onSubmit={handleRegister}>

       <input 
          type='text'
          placeholder='Digite seu Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          autoComplete={'false'}
          type='password'
          placeholder='digite sua senha'
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </form>
      <Link className='link' to='/'>
        já possui uma conta ? faça login.
      </Link>
    </div>
  );
}

export default Register;