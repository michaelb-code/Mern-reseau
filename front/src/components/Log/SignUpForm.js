import React, { useState } from 'react'
import axios from "axios"


const SignUpForm = () => {

  const [pseudo, SetPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const password = document.querySelector('.password.error');
    const passwordConfirm = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error')

  }


  return (

    <form action="" onSubmit={handleRegister} id="sign-up-form">
      {/* pseudo */}
      <label htmlFor='pseudo'>Pseudo</label>
      <br />
      <input type='text'
        name='pseudo'
        id='pseudo'
        onChange={(e) => SetPseudo(e.target.value)}
        value={pseudo}
      />
      <div className='pseudo error'></div>
      <br />

      {/* email */}
      <label htmlFor='pseudo'>Email</label>
      <br />
      <input type='text'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className='email error'></div>
      <br />

      {/* password */}
      <label htmlFor='pseudo'>Mot De Passe</label>
      <br />
      <input type='password'
        name='password'
        id='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className='password error'></div>
      <br />
      {/* Control password */}
      <label htmlFor='password-conf'>Confirmez Votre Mot De Passe</label>
      <br />
      <input type='password'
        name='password-conf'
        id='password-conf'
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className='password-confirm error'></div>
      <br />
      <input type='checkbox' id='terms'/>
      <label htmlFor='terms'>J'accepte les<a href='#' target='_blank'> conditions générales</a></label>
      <br/>
      <div className='terms error'></div>
      <input type='submit' value="Valider inscription" />
    </form>
  )
}

export default SignUpForm