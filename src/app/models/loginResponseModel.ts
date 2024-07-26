import { Status } from "./status";

export interface LoginResponseModel extends Status {
    accessToken: string,
    refreshToken: string,
    expired: string
}