import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function checkToken(req: Request, res: Response, next: NextFunction){
  let {authorization }=req.headers
  try {
  let decode:any =jwt.verify(authorization as string,"secret")
  let payload =decode
    req.headers.authentication =payload.user_email
    next()
  } catch (error) {
    /* khoong cho vao cua sau va tra ve loi */
  }
}

export function nextDoor(req: Request, res: Response, next: NextFunction){
/* lay ra user_email  de xu li tac vu*/
let {authentication/* user_email */}=req.headers
}