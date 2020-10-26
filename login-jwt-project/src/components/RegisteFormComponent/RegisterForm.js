import React,{useState} from 'react';
import './RegisterForm.css';
import UserService from '../../services/UserService'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const RegisterForm = (props)=>{


    
    const inputInit = {
        value:"", 
        touched:false, 
        msg:"",
        isValidated:false
    };
    const [username, setUsername] = useState(inputInit);
    const [email, setEmail] = useState(inputInit);
    const [password1, setPassword1] = useState(inputInit);
    const [password2, setPassword2] = useState(inputInit);

    if (props.isLogged === true) {
        return <Redirect to="/" />;
    }

    const validateUsername = (inputUsername)=>{
        let error = "";
        if (inputUsername.value.length <= 3)
            error = "First Name should be > 3 characters";
        else if (inputUsername.value.length > 10)
            error = "First Name should be <= 10 characters";

        let isValidated = false;
        if(error.length > 0){
            inputUsername.classList.add("required")
        }else{
            inputUsername.classList.remove("required")
            isValidated=true;
        }

        setUsername({...username, touched:true, value:inputUsername.value, msg:error, isValidated})
    }

    const validateRepeatPassword = (inputPassword2)=>{

        let error = "";
        if(password2.touched && password2.value.length <= 0)
            error = "please, repeat your password"
        if(password2.touched && password1.value !== inputPassword2.value)
            error = "Password does not match."
        
        let isValidated = false;
        if(error.length > 0){
            inputPassword2.classList.add("required")
        }else{
            inputPassword2.classList.remove("required")
            isValidated=true;
        }

        setPassword2({...password2, touched:true, value:inputPassword2.value, msg:error, isValidated})
    }


    const validateEmail = (inputEmail) =>{
        let error = "";
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value)))
            error = 'Email does not accepted';
        
        let isValidated = false;
        if(error.length > 0){
            inputEmail.classList.add("required")
        }else{
            inputEmail.classList.remove("required")
            isValidated=true;
        }
        setEmail({...email, touched:true, value:inputEmail.value, msg:error, isValidated})
        
    }

    const validatePassword = (inputPassword1)=>{
        let error = "";
        if (password1.touched && inputPassword1.value.length <= 3)
            error = "Password should be > 3 characters";
        
        let isValidated = false;
        if(error.length > 0){
            inputPassword1.classList.add("required")
        }else{
            inputPassword1.classList.remove("required")
            isValidated=true;
        }
        setPassword1({...password1, touched:true, value:inputPassword1.value, msg:error, isValidated})
        
    }

    const createUser= ()=>{
        //console.log("create user")
        const user = {
            name:username.value,
            email:email.value,
            password:password1.value
        }
        UserService.createUser(user)
            .then(resp =>{
                console.log(resp.data);
                props.saveRegisterAccepted(resp.data);
                //showSuccessMessage();
                props.history.push({
                    pathname: '/home',    
                    state: { type:"success",message: "User successfully created." }
                  })
            })
            .catch(e=>{
                props.saveRegisterFailed(e)        
                props.history.push({
                    pathname: '/home',    
                    state: { type:"danger",message: "Error trying to register new user, please try again later" }
                })        
            })
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
    const handleOnChange = (e) =>{

        let input = e.target
        switch(input.name){
            case "username":
                validateUsername(input);
                break;
            case "email":
                validateEmail(input);
                break;
            case "password1":
                validatePassword(input);
                break;
            case "password2":
                validateRepeatPassword(input);
                break;
            default:
        }
    }

    const onBlur = (e)=>{
        
        let msg = ""
        let input = e.target
        switch(input.name){
            case "username":
                if(username.isValidated===false && username.value.length===0)
                    input.classList.add("required")
                else
                    msg = username.msg
                setUsername({...username, touched:true, msg})
                break;
            case "email":
                if(email.isValidated===false && email.value.length===0)
                    input.classList.add("required")
                else
                    msg = email.msg
                setEmail({...email, touched:true, msg})
                break;
            case "password1":
                if(password1.isValidated===false && password1.value.length===0)
                    input.classList.add("required")
                else
                    msg = password1.msg
                setPassword1({...password1, touched:true, msg})
                break;
            case "password2":
                if(password2.isValidated===false && password2.value.length===0)
                    input.classList.add("required")
                else
                    msg = password2.msg
                setPassword2({...password2, touched:true, msg})
                break;
            default:
        }
    }



    const isDissabled = () =>{
/*         console.log(username);
        console.log(email)
        console.log(password1)
        console.log(password2) */
        return (username.isValidated && email.isValidated && password1.isValidated && password2.isValidated)?"":"disabled"
    }
/*
    const validatedMessage = (inputName) =>{
        if(inputName.touched && inputName.error != null && inputName.error.length > 0)
            return (<span className="text-danger">{inputName.error}</span>);
        if(inputName.touched && inputName.error === ''){
            //console.log("correct!")
            return (<span className="text-success">{"Correct!"}
                        
                    </span>);
        }
            
        return "";
    }
*/
    const showAsterisk = (input) => {
        return <span className="text danger">{input.touched && input.isValidated === false?"(*)":""}</span>;
    }


    return (<>
        
        <div className="container">
            <div className="login-container">
                <div className="login-logo"><img src="./assets/user.png"  alt="login-logo"/></div>
                <form className="login-form" autoComplete="off">
                    <div className="form-group">
                        <label >Username {showAsterisk(username)}</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="username" 
                            value={username.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="Username"
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{username.msg}</span>
                    </div>
                    <div className="form-group">
                        <label>Email {showAsterisk(email)}</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="email" 
                            value={email.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="sample@gmail.com"
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{email.msg}</span>
                    </div>
                    <div className="form-group">
                        <label >Password {showAsterisk(password1)}</label>
                        <input 
                            className="form-control"
                            type="password" 
                            autoComplete="new-password"
                            name="password1" 
                            value={password1.value} 
                            onChange={(e)=>handleOnChange(e) }
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{password1.msg}</span>
                    </div>
                    <div className="form-group">
                        <label >Repeat your Password {showAsterisk(password2)}</label>
                        <input 
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            name="password2" 
                            value={password2.value} 
                            onChange={(e)=>handleOnChange(e) }
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{password2.msg}</span>
                    </div>
                    <div>
                        <button type="button" className={"btn btn--primary " + isDissabled()} onClick={()=>createUser()}>Sign Up</button>
                    </div>
                </form>

            </div>
        </div>
    </>);
}


const mapStateToProps = state =>{
    return {
        isLogged: state.AuthReducer.isLogged,
        registerSuccess: state.RegisterReducer.registerSuccess,
        registerFailed: state.RegisterReducer.registerFailure
    }
}


const mapDispatchToProps = dispatch => {
  return {
      saveRegisterAccepted: (data)=>dispatch({type:'REGISTER_SUCCESS',value:data}),
      saveRegisterFailed: (data) => dispatch({type:'REGISTER_FAILED',value:data})
  };
}; 

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
