import './ReserveDates.css'

function ReserveDates({onRouteChange, setSelectedDate}) {

    function routeDate(valueNumber) {
        onRouteChange('reservetable');
        setSelectedDate(valueNumber)
    }
    function dayOfWeek(dayFromNow) {
        const week = ['یکشنبه' ,
                  'دو شنبه',
                  'سه شنبه' ,
                  'چهارشنبه' ,
                  'پنج شنبه' ,
                  'جمعه' ,
                  'شنبه' ,
                    
             ]
        let day = new Date().getDay() + dayFromNow
        if(day > 6) {
            day = day - 7
       }
        
        
        const wantedDate = week[day]

        return wantedDate
    }
    


    return (
        <div style={{display:"flex", alignItems:'center',flexDirection:'column'}}>  
            <div className=''> 
                <h1 className="date white bb pa4 bold dim ">روز ها</h1>
            </div>
            <div >
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(0)} >  امروز : {dayOfWeek(0)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(1)}>   {dayOfWeek(1)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(2)}>   {dayOfWeek(2)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(3)}>   {dayOfWeek(3)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(4)}>   {dayOfWeek(4)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(5)}>   {dayOfWeek(5)}</h1>
                <h1 className="date white ba pointer pa4 ma4 bold dim" onClick={() => routeDate(6)}>   {dayOfWeek(6)}</h1>
                
                
            </div>
        </div>
    );
  }
  
  export default ReserveDates;