import React,{useState} from 'react';
import './RegisterForm.css';
import UserService from '../../services/UserService'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const RegisterForm = (props)=>{

    

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    if (props.isLogged === true) {
        return <Redirect to="/" />;
    }

    const createUser= ()=>{
        
        const user = {name:username,email,password:password1}
        UserService.createUser(user)
            .then(resp =>{
                console.log(resp.data);
                clearFields();
                //showSuccessMessage();
            })
            .catch(e=>console.log(e))
    }
/*
    const showSuccessMessage=()=>{
        console.log("show sucess")
        setMsgSuccess("show");
        //setTimeout(()=>{console.log("time out");setMsgSuccess("").bind(this);},50000);
        const timeout = setTimeout(() => {
            setMsgSuccess("")
          }, 5000);
      
         return () => clearTimeout(timeout);
    }
*/
    const clearFields = ()=>{
        setUsername("");
        setEmail("")
        setPassword2("");
        setPassword1("")
    }

    return (<>
        <div className="container">
            <div className="login-container">
                <div className="login-logo"><img src="./assets/user.png"  alt="login-logo"/></div>
                <form className="login-form">
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label >Repeat your Password</label>
                        <input type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                    </div>
                    <div>
                        <button type="button" className="btn btn--primary" onClick={()=>createUser()}>Sign Up</button>
                    </div>
                </form>

            </div>
        </div>
    </>);
}


const mapStateToProps = state =>{
    return {
        isLogged: state.isLogged,
        
    }
}


export default connect(mapStateToProps)(RegisterForm);
