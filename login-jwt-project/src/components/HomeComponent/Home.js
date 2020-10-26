import React from 'react'
import './Home.css';

const Home = (props)=>{
    console.log(props.location.state?props.location.state.message:"");
    
    const showAlert = () => {
        if(props.location && props.location.state){
            if(props.location.state.type && props.location.state.message){
                let type = props.location.state.type;
                let message = props.location.state.message;
                return <div className={"alert " + type}>{message}</div>
            }
        }
        return null;
    }

    return (
    <>
        {showAlert()}
    <div className="user-profile">
        {props.loggedUser?
            (<ul>
                <li><b>Name:</b>{props.loggedUser.name}</li>
            <li><b>Email:</b>{props.loggedUser.email}</li>
            <li><b>Token: </b>{props.token}</li>
            </ul>):null}
    </div>
    <div className="home-container">
            <div className="home-data">
                <h1>welcome to my website</h1>
                <p>This is a web for every body</p>
                <button>Learn More</button>
            </div>
    </div>
    </>);
}

export default Home;