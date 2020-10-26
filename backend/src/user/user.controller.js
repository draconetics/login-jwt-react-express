
class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    async register(req, res) {
        try{            

            const data = await this.userService.createAndLogin( req.body )
            return res.status(201).json(data);
        }
        catch(e){
            return res.status(500).json(e)
        }
    }

    getAllUsers(req, res) {
        
        this.userService.getAllUsers()
            .then(data => {
                res.status(200).send(data);
            }).catch((e) => {
                
                return res.status(500).json(e)
            })
        //console.log(userList)
        
    }

    async login(req, res) {
        
        
        try{
            const data  = await this.userService.login( req.body )    
            
            return res.status(200).json({code:200,message:"success", data});    
        }catch(e){
            return res.status(e.code).json({code:e.code,message:e.message})
        }           
            
    }

    logout(req, res){

        // Log user out of the application
        this.userService.logout( req.user, req.token )
            .then(data => {
                console.log("user logout")
                return res.status(200).json(data);    
            })
            .catch(e=>{
                return res.status(500).json(e)
            })   

    }
} 
module.exports = UserController;