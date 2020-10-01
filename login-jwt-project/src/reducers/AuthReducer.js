let init = {
    loggedUser: null,
    isLogged: false,
    token: ""
}

if( localStorage.getItem('isLogged') && 
    localStorage.getItem('loggedUser') &&
    localStorage.getItem('token'))
    init={
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
        isLogged:JSON.parse(localStorage.getItem('isLogged')),
        token: localStorage.getItem('token'),
    }

const AuthReducer = (state = init, action) => {
    console.log("this is the action.value")
    console.log(action.value)
      switch (action.type) {
        case 'UPDATE_LOGGED_USER':
          return {...state, loggedUser:action.value};
        case 'UPDATE_ISLOGGED':
            return {...state,isLogged:action.value}
        case 'UPDATE_TOKEN':
            return {...state, token: action.value}
        default:
          return state
      }
    }
    
    export default AuthReducer;