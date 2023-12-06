import {  Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import * as userController from '../controllers/userController'
const SECRET = <jwt.Secret>process.env.AUTH_SECRET

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization)
        return res.status(401).json("No Authorization")

    const splitAuth = <string[]>authorization?.split(' ')
    if (splitAuth?.shift() != "Bearer")
        return res.status(401).json("Invalid token type")


    const token = splitAuth?.shift()
    if (!token)
        return res.status(401).json("No token")

    // const decoded = jwt.decode(token)
    try {
        const decoded = <jwt.JwtPayload> jwt.verify(token, SECRET)
        console.log(decoded)

        res.locals.userId = decoded.userId
        // console.log(decoded)

        // const isUser = await userController.isValidUser(decoded.email)
        // if(!isUser)
        //     return res.status(401).json("Invalid user")


    } catch (err) {
        return res.status(401).json("Invalid token")
    }

    next()
}