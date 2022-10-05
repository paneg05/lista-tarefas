import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import Register from "../pages/register";
import Admin from "../pages/admin";

function RoutesApp(){

    return(
        <Routes>
            <Route path="/" element={<Home/>} />
             
            <Route path="/register" element={<Register/>}/>

            <Route path="/admin" element={<Admin/>}/>
                
        </Routes>
    )
    
}


export default RoutesApp
