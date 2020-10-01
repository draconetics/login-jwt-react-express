import Home from './Home'
import { connect } from 'react-redux';


  const mapStateToProps = state =>{
      return {
          loggedUser: state.loggedUser,
          isLogged: state.isLogged,
          token: state.token
      }
  }
 
  
  export default connect(mapStateToProps)(Home);