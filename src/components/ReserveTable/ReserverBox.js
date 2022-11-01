import { useState } from 'react';



 function ReserveBox({index, reserve, oneTimeReserve}) {

    function onClickReserve() {
        if(oneTimeReserve==='none'){
            reserve('first');
        } else { 
            reserve('second')
        }


    }
    function ReserveMassage() {
        return (
            <div>. با موفقیت انجام شد</div>
        )
    }

    let content;
    content = <ReserveMassage/>
     


    if(1) {
        return (

            <div  style={{display:"flex",alignItems:"center"}}  className="ba green mainbox dim ma1 pa2" >
                <h1 className=" light-green  pa3 ma1 pr6"> {index.time}</h1>
                <h2 className="f6 link dim br1 ph3 pv2 mb2 dib white bg-near-black pointer center" onClick={() => onClickReserve()} >کلیک</h2>
            </div>
        );
    } else  {
        return (
            <div >
                <div  style={{display:"flex",alignItems:"center"}}  className="ba red mainboxreserved ma1 pa2" >
                    <h1 className=" light-RED  pa3 ma1 pr6"> {index.time}</h1>
                    <h2 className="f6 link dim br1 ph3 pv2 mb2 dib red bg-black  center" >X</h2>
                </div>
                <div className="white pa2">
                    {content}
                </div>
            </div>
        );
    }



}
export default ReserveBox;








