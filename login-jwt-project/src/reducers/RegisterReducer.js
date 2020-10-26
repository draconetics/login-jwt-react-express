const init = {
    registerSuccess : localStorage.getItem('registerSuccess') || "",
    registerFailure : localStorage.getItem('registerFailure') || ""
}
const registerReducer = (state=init, action) => {
    switch(action.type){
        case "REGISTER_SUCCESS":
            localStorage.setItem('registerSuccess', JSON.stringify(action.value));
            return {...state,registerSuccess:action.value}
        case "REGISTER_FAILED":
            localStorage.setItem('registerFailure', JSON.stringify(action.value));
            return {...state, registerFailure:action.value}
        default:
            return state;
    }
}

export default registerReducer;