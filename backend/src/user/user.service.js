
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

  
          return {user};
    }catch(e) {
          throw e
    }
}

async login( loginBody ) {
      
    const { email, password } = loginBody
    
    try{
        console.log("service login")
        const foundUser = await this.userRepository.findByCredentials( email, password )
        const userWithToken = await this.userRepository.saveAuthToken(foundUser)
        return userWithToken;
    
    }catch(e){
        console.log(e);
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
