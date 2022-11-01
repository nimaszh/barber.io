import { useState, useEffect } from 'react';
import './ReserveTable.css'


function ReserveTable({username,usernumber, selectedDate}) {

    const [oneTimeReserve, setOneTimeReserve] = useState('none');
    const[data,setData] = useState(null)
    useEffect(() =>{
        fetch('http://localhost:3005/masoodtable', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                value: Number(selectedDate),
              })
        }).then(res => res.json())
          .then(data => setData(data))
    }, []);
    
    console.log(selectedDate)



 
    function reserve(value){
        setOneTimeReserve(value);
    };

    function ReserveMassageError() {
        return(
            <div className="white ba mt4 bg-red o-40 pa4 "> . شما در روز یکبار مجاز به رزرو هستید </div>
        )
    };

    console.log(username)


    function Please({shift,id}) {
        const [isFree, setIsFree] = useState('zero')
        function onButtonReserve(){
            fetch('http://localhost:3005/masoodreserve', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: Number(id),
                  name: username,
                  number: Number(usernumber) 
                })
              }).then(response => response.json())
                .then(data => console.log(data))
            
            reserve('second')
        }

        function reserve(value){
            setIsFree(value)
        }

        function ReturnMessage(){
            return (
                <div className='white pa4 underline' style={{textAlign:'center'}}>
                    با موفقیت انجام شد
                </div>
            )
        }
        function AgreeMessage(){
            return(
                <div style={{display:"flex",alignItems:"center", flexDirection:'row-reverse',justifyContent:'center'}} className='ba white'>
                    <h3 className=' white center'>آیا مطمینید؟</h3>
                    <h3 className=' pointer check btn-three w-10 pa3 ma4' onClick={() => onButtonReserve()}>✔</h3>
                    <h3 className='ex btn-three w-10 pa2 ma4 pointer' onClick={() => reserve('zero')} >×</h3>
                </div>
            )

        }

        let message;
        if(isFree==='first'){
            message = <AgreeMessage/>
        } else if(isFree==='second') {
            message = <ReturnMessage/>
        }

        if(data){
            if(shift.available === true) {
                if(isFree==='zero'){
                    return(
                        <div  style={{display:"flex",alignItems:"center"}}  className="ba green mainbox dim ma1 pa2" >
                            <h3 className=" light-green  pa3 ma1 pr6">{shift.time} </h3>
                            <h3 className="f6 link dim br1 ph3 pv2 mb2 dib white bg-near-black pointer center" onClick={() => reserve('first')} >کلیک</h3>
                        </div> 
                    ) 
                }   else {
                    return(
                        <div>
                            <div  style={{display:"flex",alignItems:"center"}}  className="ba red mainboxreserved ma1 pa2" >
                                <h3 className=" light-RED  pa3 ma1 pr6"> {shift.time}</h3>
                                <h3 className="f6 link dim br1 ph3 pv2 mb2 dib red bg-black  center" >X</h3>
                            </div>
                            {message}
                        </div>
                    )
                }

            } else {
                return(
                    <div  style={{display:"flex",alignItems:"center"}}  className="ba red mainboxreserved ma1 pa2" >
                        <h3 className=" light-RED  pa3 ma1 pr6"> {shift.time}</h3>
                        <h3 className="f6 link dim br1 ph3 pv2 mb2 dib red bg-black  center" >X</h3>
                    </div>
                )
            }

        }
    }
    const rows =[];
    if(data){
        data.map((shift,index) => {
            rows.push(<Please shift={shift} key={index} id={shift.id}/>)
        })
    }
     
    
    
    

    return (
        
        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>

            <div className="bb bt white">
                <p className="f1 lh-title near-white"> Date: 01/07/17</p>
            </div>
            <div>
                {rows}
            </div>
        </div>
    );
  }
  
  export default ReserveTable;


