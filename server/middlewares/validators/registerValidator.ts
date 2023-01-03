import { Request, Response, NextFunction } from "express";

const errors : string[] = []

export const validateRegister = async (req : Request, res : Response, next : NextFunction) => {
    const { name, username, password } = req.body

    if (!name) {
        errors.push("Please enter your name")
    } else if (name.length > 20) {
        errors.push("Name must be at most 20 characters long")
    } else if (!validEmail(username) && !validPhone(username)) {
        errors.push("Please enter a valid email or phone number")
    } else if (password.length < 6) {
        errors.push("Password must consist of at least 6 characters")
    }

    if (errors.length > 0) {
        return res.status(200).json({ errors })
    }
    
    next()
}

export function validEmail(email : string) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email)
}

export function validPhone(phone : string) {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/
    return phoneRegex.test(phone)
}