import AuthService from '../services/AuthService'


export const login = async (dispatch,value)=>{
    console.log("login action");
    return await AuthService.login(value)
                  .then((resp)=>{
                      console.log(resp.data)
                      
                      dispatch({type:'UPDATE_LOGGED_USER',value:resp.data.user});
                      dispatch({type:'UPDATE_ISLOGGED', value: true})
                      dispatch({type:'UPDATE_TOKEN', value: resp.data.token})
                      saveUserLocally(resp.data);
                  })
                  .catch(e=>console.log(e))
}

const saveUserLocally = (data)=>{
    localStorage.setItem('loggedUser',JSON.stringify(data.user));
    localStorage.setItem('isLogged',true)
    localStorage.setItem('token',data.token)
}

export const logout = async (dispatch, token)=>{
    console.log("logout action");
    return await AuthService.logout(token)
                  .then((resp)=>{
                      console.log("token deleted")
                      dispatch({type:'UPDATE_LOGGED_USER',value:null});
                      dispatch({type:'UPDATE_ISLOGGED', value: false});
                      dispatch({type:'UPDATE_TOKEN', value: ""});
                      deleteUserLocally();
                  })
                  .catch(e=>console.log(e))
}

const deleteUserLocally = ()=>{
    localStorage.removeItem('loggedUse');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('token');
}