import LoginForm from './LoginForm'
import { login } from '../../actions'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      return {
          loggedUser: state.user,
          isLogged: state.isLogged
      }
  }
 
  const mapDispatchToProps = dispatch => {
    return {
        login: (data)=>login(dispatch,data),
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);