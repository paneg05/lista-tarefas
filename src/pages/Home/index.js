import { useState,useEfect } from 'react';

import {auth,db} from '../../firebaseConfig/firebaseConnection'
import './Home.css'

import {Link} from 'react-router-dom'


function Home() {
const [email,setEmail] = useState('')
const [senha,setSenha] = useState('')



function handleLogin (e){
  e.preventDefault()
  if(email!==''&&senha!==''){
    alert('teste')
  }else{
    alert('preencha todos os campos!')
  }
}




  return (
    <div className="home-container">
      <h1>lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form onSubmit={handleLogin}>

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

        <button type='submit'>Acessar</button>
      </form>
      <Link className='link' to='/register'>
        Não possui uma conta ? Cadastre-se
      </Link>
    </div>
  );
}

export default Home;