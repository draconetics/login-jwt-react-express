import React, {useState} from 'react'
import { useHistory, Redirect } from "react-router-dom";


const LoginForm = (props)=>{

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (props.isLogged === true) {
        return <Redirect to="/" />;
    }

    const login = ()=>{
        const user = {
            email,password
        }
        props.login(user).then(()=>{
            history.push({
                pathname: '/home',    
                state: { message: "User created correctly" }
              })
        });
        //console.log("login")
        //props.history.push("/home")
        
    }
    return (<>

        <div className="container">     
            <div className="login-container">
                <div className={"message "}>Register success</div>
                <div className="login-logo"><img src="./assets/lock.jpg"  alt="login-logo"/></div>
                <form className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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