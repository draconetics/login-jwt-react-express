import http from "../config/http-common";

class UserService {
  getAll() {
    return http.get("/users");
  }
  createUser(data){
    return http.post("/users",data);
  }
}

export default new UserService();
