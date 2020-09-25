
class UserService {
  
  constructor(userRepository) {
      this.userRepository = userRepository;
  }


  async getAllUsers(){
      //console.log("service : " + this.userRepository.getAllUsers())
      //console.log("service" + this.userRepository.getAllUsers())
      const results = await this.userRepository.getAllUsers()
                                                .catch(e=> {throw e})
      return { results }
  }

  async createAndLogin( userBody ) {
    try{
          let user = await this.userRepository.create( userBody );
          let token = await this.userRepository.saveAuthToken(user) 
  
          return {user, token: token, info:"nothing"};
    }catch(e) {
          throw e
    }
}

async login( loginBody ) {
      
    const { email, password } = loginBody
    
    try{
        console.log("service login")
        const user = await this.userRepository.findByCredentials( email, password )
        await this.userRepository.saveAuthToken(user)
        return {results: user}
    
    }catch(e){
        throw e
    }
}

async logout (user, loggedToken) {
    try {
        user.tokens = user.tokens.filter((token) => {
            return token.token != loggedToken
        })
        await this.userRepository.saveUser(user)
        return { results: user }
    } catch (e) {
        throw e
    }
}


}


module.exports = UserService;
