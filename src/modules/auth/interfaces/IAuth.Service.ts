import { User } from "../../user/entities/User.Entity.js";
import { LoginRequest, LoginResponse } from "../dtos/Auth.DTO.js";



export interface IAuthService {
  login(data:LoginRequest):Promise<LoginResponse>
}
