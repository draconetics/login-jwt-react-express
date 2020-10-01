const User = require("./user.model");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserRepository {
  constructor() {
    this.User = User;
  }

  async create( userBody ) {
    try{
        console.log("repository" + JSON.stringify(userBody))
        let user = new this.User( userBody );
        await this.saveUser(user)
        return user
    }catch(e){
        console.log(e);
        throw e
    }
}

    async saveAuthToken(user)  
    {
        try{
            //USE JWT_KEY
            //const token = jwt.sign({user}, process.env.JWT_KEY)
            const token = await jwt.sign({_id:user._id}, 'secret')
            user.tokens = user.tokens.concat({token})
            await this.saveUser(user)
            //console.log(token)
            return {user,token}

        }catch(e){
            throw e;    
        }
    }

    async saveUser(user) {
    
        return await user.save()
                          .catch(e=> {
                            console.log(e);
                            throw e;
                          })
      }

  async getAllUsers() {
      console.log("repository")

      return await this.User.find({})
                  .catch(e => {
                      let error = new Error('db - error getting all users');
                      error.stack = e
                      throw error
                  })

  }

    async findByIdAndToken(id, token){
        console.log("find by id and token")
        const data = { _id: id, 'tokens.token': token }
        return await this.User.findOne( data )
                        .catch(e => {
                            e.message="User not found by id and token"
                            throw e;
                        })
    } 

    async findByCredentials(email, password){
      
        let user = {}
        
        try{
            //let err = new ErrorLevel()
            user = await this.findByEmail(email)
            if (!user) {
                console.log("user no exist")
                const error = new Error('Invalid login credentials');
                error.code = 400
                throw error
            }
            
            
            const isPasswordMatch = await bcrypt.compare(password, user.password)
                                      .catch(e=> {
                                        const error = new Error('error comparing password')
                                        error.code = 400
                                        error.stack = e
                                        throw error
                                      })
            
            if (!isPasswordMatch) {
                console.log('error password')
                const error = new Error('Invalid login credentials')
                error.code = 400
                throw error
            }
            return user
        }catch(e){
            //(Error object or ErrorLevel object) and stack message
            e.stack = e.stack || 'check user.repository.js->findByCredentials2()' 
            throw e         
        }
        
    }


    
  async findByEmail(email){
      
    //let errorLevel = new ErrorLevel()

    
    return await User.findOne({ email } )
                      .catch(e => {
                          const error = new Error('db - error on finding by email')
                          error.stack = e;
                          error.code = 500
                          throw error
                      })
    }

}

module.exports = UserRepository;
