import { User } from "../../user/entities/User.Entity.js";

export type LoginResponse = {
    jwtToken:string;
}
export type LoginRequest = {
  email: string;
  password: string;
}