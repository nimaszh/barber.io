
import './App.css';

import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js'
import Barbers from './components/Barbers/Barbers.js';
import ReserveTable from'./components/ReserveTable/ReserveTable.js';
import AdminPannel from './components/AdminPannel/AdminPannel.js'
import ReserveDates from './components/ReserveDates/ReserveDates.js'
import Register from './components/Register/Register.js'
import { useState } from 'react';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState('register');
  const [username, setUserName] = useState(' ')
  const [usernumber, setUserNumber] = useState('')
  const [selectedDate, setSelectedDate] =  useState(null)




  function signedIn(value, route) {
    setIsSignedIn(value);
    setRoute(route)
  }

  function loadUser(data) {
    setUserName(data.name)
    setUserNumber(data.number)
  }
  

  function onRouteChange(value) {
    setRoute(value)
  }


  let content;
  if (isSignedIn===false) {
      if(route==='register'){
        content = <Register signedIn={signedIn} loadUser={loadUser} />;
      } else if (route==='signin'){
        content = <SignIn signedIn={signedIn} loadUser={loadUser}/>
      }

    }else {
        if (usernumber === '9359616266'){
            content = <AdminPannel setRoute={setRoute} route ={route}/>
        } else {
          if(route==='home') {
            content = <Barbers onRouteChange={onRouteChange} />
          } else if (route=== 'reserve'){
            content = <ReserveDates onRouteChange={onRouteChange} setSelectedDate= {setSelectedDate}/>
          } else if (route === 'reservetable') {
            content = <ReserveTable username={username} usernumber={usernumber} selectedDate= {selectedDate}/>
          }  
        }


  

    }

    
    console.log(username,usernumber)



  return (
    <div className="App">
      <Navigation isSignedIn= {isSignedIn}  onRouteChange={onRouteChange} signedIn={signedIn}/>
      <div> 
        {content}
        {/* <AdminPannel/> */}
      </div>
    </div>
  );
}

export default App;
