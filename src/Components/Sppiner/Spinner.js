import React from "react";
import SpinnerImg from '../../assets/img/spin.gif';

let Spinner=()=>{
    return(
        <>
<div>
    <img src={ SpinnerImg} alt="" className="d-block m-auto" style={{width:'200px'}}/>
</div>
        </>
    )
}

export default Spinner;