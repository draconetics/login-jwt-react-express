import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Menu.css'


const Menu = (props)=>{
    const history = useHistory();

    const logout = ()=>{
        props.logout(props.token).then(
            ()=>{
                history.push('/')
            }
        );
        
        
        
    }
    console.log("this is the user")
    console.log(props);
    return (
        <nav>
            <div className="main-nav">
                <div className="logo">DracoNetics</div>
                <ul className="main-menu">
                    <li><NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>         
                    </li>
                    <li>
                        <NavLink to="/blog" activeClassName="active" >Blog</NavLink>         
                    </li>
                </ul>
                <ul className="right-menu">
                    
                        {(props.isLogged)?
                        (<>
                        <li><button className="btn btn--primary" onClick={()=>logout()}>Logout</button></li>
                        </>)
                    :(<>
                    <li><NavLink activeClassName="active" to="/register">Sign Up</NavLink></li>
                    <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                    </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Menu;