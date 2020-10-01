import http from "../config/http-common";

class AuthService {
  login(data) {
    return http.post("/users/login",data);
  }
  logout(token){
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    }
      return http.post("/users/logout",null,{headers:headers});
  }
}

export default new AuthService();
