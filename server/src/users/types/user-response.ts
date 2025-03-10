import { User } from "../users.service"
export type  userResponseType = Omit<User,'password'> & {token:string}

export{}