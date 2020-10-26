import LoginForm from './LoginForm'
import { login } from '../../actions'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      //console.log(state);
      return {
          loggedUser: state.AuthReducer.loggedUser,
          isLogged: state.AuthReducer.isLogged
      }
  }
 
  const mapDispatchToProps = dispatch => {
    return {
        login: (data)=>login(dispatch,data),
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);