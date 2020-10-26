import Home from './Home'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      return {
          loggedUser: state.AuthReducer.loggedUser,
          isLogged: state.AuthReducer.isLogged,
          token: state.AuthReducer.token
      }
  }
 
  
  export default connect(mapStateToProps)(Home);