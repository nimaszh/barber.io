import './Signin.css'
import { useState } from 'react';

function SignIn({signedIn, loadUser}) {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword,setSignInPassword] = useState('');

  function onEmailChange(event) {
    setSignInEmail(event.target.value)
  }
  function onPasswordChange(event) {
    setSignInPassword(event.target.value)
  }
  function signInSubmit() {
    fetch('http://http://141.11.42.106:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        number: signInEmail,
        password: signInPassword
      })
    }).then(response => response.json())
      .then(data=> {if(data==='WRONG'){
          console.log('WRONG')

        }else{
          signedIn(true, 'home');
          loadUser(data)
      }})


  }
  

    return (
        <article className="br3 ba shadow-5  b--white-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 white-80 " >
              <form className="measure " style={{display:"flex", flexDirection:"column", alignItems:'flex-end'}}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                  <legend  className="f2 fw6 ph0 mh0 center" >ورود</legend>
                  <div className="mt3"style={{display:"flex", flexDirection:"column", alignItems:'flex-end'}}>
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">شماره تلفن</label>
                    <input  className="pa2 input-reset ba bg-transparent hover-bg-white hover-gray w-100"
                            style={{backgroundColor:'#FFFDCD'}} type="text" name="phone-number"  id="phone-number"
                            onChange={onEmailChange}/>
                  </div>
                  <div className="mv3" style={{display:"flex", flexDirection:"column", alignItems:'flex-end'}}>
                    <label className="db fw6 lh-copy f6" htmlFor="password">رمز عبور</label>
                    <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={onPasswordChange}/>
                  </div>
                </fieldset>
                <div className="">
                  <h1  className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"  onClick={() => signInSubmit()} > ورود</h1>
                </div>
              </form>
            </main>
        </article>
        );
}
export default SignIn