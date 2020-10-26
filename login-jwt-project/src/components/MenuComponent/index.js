import Menu from './Menu'
import { connect } from 'react-redux';
import { logout } from '../../actions/index'


  const mapStateToProps = state =>{
      return {
          loggedUser: state.AuthReducer.loggedUser,
          isLogged: state.AuthReducer.isLogged,
          token: state.AuthReducer.token
      }
  }
 
  const mapDispatchToProps = dispatch => {
    return {
        logout: (token)=>logout(dispatch,token),
    };
  }; 
  
  export default connect(mapStateToProps, mapDispatchToProps)(Menu);