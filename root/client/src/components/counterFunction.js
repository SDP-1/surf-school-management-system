import React, { useState } from "react";


function CounterFunction(){

let [count,setCount] = useState(0);

// function increment(){
//     setCount(++count);
// }

    return(
    <div>
        <h1>Counter = {count}</h1> 
        <button onClick={()=>setCount(++count)}>Increment</button>
    </div>
    )
}


export default CounterFunction;