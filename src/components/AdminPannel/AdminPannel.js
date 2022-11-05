import './AdminPannel.css'
import { useEffect, useState } from 'react';


function CostumerList() {
    return (
        <div className="pa4" style={{display:"flex",justifyContent:"center"}}>
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead  >
                    <tr className="stripe-dark"  >
                    <th className="fw6 tl pa3 ma2  bg-white" style={{textAlign:'end'}}>شماره تلفن</th>
                    <th className="fw6 tl pa3 ma2  bg-white" style={{textAlign:'end'}}>نام</th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    <tr className="stripe-dark">

                    <td className="pa3  td white">14419232532474</td>
                    <td className="pa3 td white">رضا خلیلی</td>
                    </tr>
                    <tr className="stripe-dark">
                    <td className="pa3 td white">Hassan Johnson</td>
                    <td className="pa3 td white">14419232532474</td>
                    </tr>
                    <tr className="stripe-dark">
                    <td className="pa3 td white">Hassan Johnson</td>
                    <td className="pa3 td white">14419232532474</td>
                    </tr>
                    
                </tbody>
                </table>
              </div>
            </div>
    )
}



function AdminPannel({route,setRoute}){

    function AdminMasoodTable() {
        const [daysData, setDaysData] = useState(null)
        useEffect(() => {
            fetch('http://localhost:3000/adminmasoodtable', {
              method: 'get',
              headers: {'Content-Type': 'application/json'},
            }).then(res => res.json())
              .then(data => {
                  setDaysData(data)
              })
        
        }, []);
        console.log(daysData)

        function dayOfWeek(dayFromNow) {
            const week = ['Sunday' ,
                      'Monday',
                      'Tuesday' ,
                      'Wensday' ,
                      'Thursday' ,
                      'Friday' ,
                      'Saturday' ,
                        
                 ]
            let day = new Date().getDay() + dayFromNow
            if(day > 6) {
                day = day - 7
           }
            
            
            const wantedDate = week[day]
    
            return wantedDate
        }
        
        
        function Timedata({value}) {
            const [isFree,setIsFree] = useState(null);

            function trying(val) {
                setIsFree(val)
            }
            useEffect(() => { 
            if(daysData[value].available) {
                setIsFree(true);
            } else  {
                setIsFree(false); 
            }                   
                }, [])
                
            // if(daysData[value].available) {
            //     setIsFree(true);
            // } else if(!daysData[value].available) {
            //     setIsFree(false);
            // }

            function adminreserve(){
                
                let bolean;
                if(isFree){
                    bolean = false
                    
                } else {
                    bolean = true
                }


                fetch('http://localhost:3000/adminmasoodreserve', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      id: Number(daysData[value].id),
                      changeTo: bolean
                    })
                  }).then(response => response.json())
                    .then(data => console.log(data))
                trying(bolean)
                
            }
            
            
            let isfreeclass;
            let content;
            let button;
            if( isFree){
                content = 'Free';
                button = '✔'
                isfreeclass = 'green  dim bl'
            } else {
                content = 'Reserved';
                button = '×'
                isfreeclass = 'red  dim bl '
            }
            return(
                
                    <tr>
                        <td >{daysData[value].time}</td>
                        <td >{daysData[value].username}</td>
                        <td >{daysData[value].usernumber}</td>
                        <td className={isfreeclass} style={{fontSize:'18px'}} >{content}</td>
                        <td className={isfreeclass}   style={{fontSize:'18px', cursor:'pointer'}}  onClick={() => adminreserve()}> {button}</td>
                    </tr>
                
            )
        }

        function Bar({content,bar}){
            if(bar) {
                return(
                    <div className = 'tbl-header'>
                    <table cellpadding="0" cellspacing="0" border="0">
                            <thead className='tbl-header'>
                                <tr>
                                    <th>Time</th>
                                    <th>UserName</th>
                                    <th>UserNumber</th>
                                    <th>Reserve</th>
                                    <th>Click</th>
                                </tr>
                            </thead>
                            <tbody className='tbl-content'>
                                {content}
                            </tbody>
                        </table>
                     </div>
                )
            }

        }


        function EachDay({number}){
            const [bar,setBar] = useState(false);

            let rows = []
            if(daysData){
                let i = 0;
                while(i < 10) {
                    rows.push(<Timedata value={(number * 10) + i}/>);
                    i = i + 1;
                    
                }
            };
            function barChanger() {
                if(bar) {
                    setBar(false)
                } else {
                    setBar(true)
                }
            }

            let content;
            if(bar) {
                content = rows
            } ;
            return(
                <div className='tbl-whole-day'>
                    <div className='tbl-day'> 
                        {dayOfWeek(number)}
                        <div class="container pointer dim" onClick={() => barChanger()}>
                            <a data-scroll href="#full">
                                <div class="arrow" ></div>
                            </a>
                        </div>
                    </div>
                    <Bar content = {content} bar={bar}/>
                </div>
            )   
        }
        if(daysData){
            console.log(daysData[0])
            return <div className='yellow'>
                        <EachDay number={0}/>
                        <EachDay number={1}/>
                        <EachDay number={2}/>
                        <EachDay number={3}/>
                        <EachDay number={4}/>
                        <EachDay number={5}/>
                        <EachDay number={6}/>
                   </div>
        }


    }   






    function AdminHomePage() {
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
                <h1 className="white ba bg-near-black pointer pa4 ma4 bold dim" onClick= { () => setRoute('custom')} >  لیست مشتریان </h1>
                <h1 className="white ba o-60 pointer pa4 ma4 bold dim"  onClick={() => setRoute('schedule')}>  صفحه رزرو </h1>
            </div>
        )
    }

    if(route ==='home'){
        return(
            <div>
                <AdminHomePage/>
             </div>
        )
        } else if (route === 'custom') {
        return(
            <div>
                <CostumerList/>
            </div>
        )
        } else if (route === 'schedule') {
            return(
                <div>
                    <AdminMasoodTable/>
                </div>
            )
        }
    return(
        <div>
         </div>
    )

}

export default AdminPannel