function Barbers({onRouteChange}) {
    return (
        <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>  
            <div> 
                <h1 className="white bb pa4 bold dim"> آرایشگر ها</h1>
            </div>
            <div >
                <h1 className="white ba  pointer pa4 ma4 bold dim" onClick={() => onRouteChange('reserve')}>  مسعود سلطانی</h1>
                <h1 className="white ba  pointer pa4 ma4 bold dim" onClick={() => onRouteChange('reserve')}>   طاها ابراهیمی</h1>
            </div>
        </div>
    );
  }
  
  export default Barbers;