function Navigation({isSignedIn, onRouteChange,signedIn}) {


  
  if(isSignedIn){
    return (
      <nav style={{display:"flex", justifyContent: "flex-end"}}>
        <p className="f3 link dim white underline pa3 pointer" onClick={() => onRouteChange('home')}> صفحه اصلی   </p>  
        <p className="f3 link dim white underline pa3 pointer"  onClick={() => signedIn(false, 'signin')}> خروج    </p>   
        <p className="f3 link dim white underline pa3 pointer">  تماس با ما </p>   
      </nav>
    );
  } else {
    return(
      <nav style={{display:"flex", justifyContent: "flex-end"}}>
        <p className="f3 link dim white underline pa3 pointer" onClick={() => onRouteChange('signin')}> ورود   </p>  
        <p className="f3 link dim white underline pa3 pointer" onClick={() => onRouteChange('register')}>  عضویت  </p>    
        <p className="f3 link dim white underline pa3 pointer">  تماس با ما </p>   
      </nav>
    );
  }


}

export default Navigation;