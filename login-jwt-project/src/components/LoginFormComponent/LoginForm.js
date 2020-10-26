import React, {useState} from 'react'
import { Redirect } from "react-router-dom";


const LoginForm = (props)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (props.isLogged === true) {
        return <Redirect to="/" />;
    }

    const login = ()=>{
        const user = {
            email,password
        }
        props.login(user).then((data)=>{
            console.log("this is the data")
            console.log(data);
            props.history.push('/home')
        }).catch((e)=>{
            setError(e.response.data.message);
        });
        //console.log("login")
        //props.history.push("/home")
        
    }

    const showMessage = () =>{
        if(error){
            return <div className="alert danger">{error}</div>
        }
        return null;
    }

    return (<>

        <div className="container">     
            <div className="login-container">
                {showMessage()}
                <div className="login-logo"><img src="./assets/lock.jpg"  alt="login-logo"/></div>
                <form className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                                className="form-control"
                                type="email" 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                required="required"/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input 
                                className="form-control"
                                type="password" 
                                value={password} 
                                autoComplete="new-password"
                                onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="button" className="btn btn--primary" onClick={()=>login()}>Login</button>
                    </div>
                </form>

            </div>
        </div>
    </>);
}

export default LoginForm;