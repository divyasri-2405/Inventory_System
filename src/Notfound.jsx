import React from 'react';
import {useNavigate} from 'react-router-dom';
function Notfound(){
    const hello=useNavigate()
    return(
        <div className="not-found">
            <center>
                <img src="https://inventory-management-frontend-pied.vercel.app/static/media/404.2d47255f361c6cf188c4.png"
                alt="" width='50%'/>
                <br/>
                <h1>Page Not Found</h1>
                <br/>
                <p>The page you are looking for does not exist.</p>
                <br/>
                <button onClick={()=>hello('/')}>Home Page</button>
            </center>
        </div>
    )
}
export default Notfound