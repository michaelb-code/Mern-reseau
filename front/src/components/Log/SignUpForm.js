import React, { useState } from 'react'
import axios from "axios"
import SignInForm from './SignInForm';


const SignUpForm = () => {

  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, SetPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');



  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error')

    // pour reset au chargement...permet de reinjecter des string vides //
    
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";


    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe doivent correspondre!";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    }
    else {
      await axios({

        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password
        }
      })
        .then((res) => {
          console.log(res);

          if (res.data.errors) {
            pseudoError.innerHtml = res.data.errors.pseudo;
            emailError.innerHtml = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className='success'>Inscription réussie, veuillez-vous connecter!</h4>
        </>
      ) : (
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
          <input type='checkbox' id='terms' />
          <label htmlFor='terms'>J'accepte les<a href='#' target='_blank'> conditions générales</a></label>
          <br />
          <div className='terms error'></div>
          <input type='submit' value="Valider inscription" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
