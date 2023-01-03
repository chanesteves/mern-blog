// TODO: Add tests
import { Request, Response } from "express"
import User from "../../models/userModel"
import bcrypt from "bcrypt"
import { generateActiveToken } from "../../dependencies/jwt"
import { validEmail, validPhone } from "../../middlewares/validators/registerValidator"
import { GMail } from "../../dependencies/gmail"
import { Twilio } from "../../dependencies/twilio"
import { MessagingService } from "../../services/MessagingService"

const registerController = {
    // TODO: Apply single responsibility
    register: async(req: Request, res: Response) => {
        try {
             const { name, username, password } = req.body

             const user = await User.findOne({ username })
             if (user) {
                return res.status(403).json({ message : "Username already exists" })
             }

             const passwordHash = await bcrypt.hash(password, 12)

             const userData = { name, username, password : passwordHash }
             const newUser = new User(userData)

             const active_token = generateActiveToken(userData)
             const activation_url = `${process.env.BASE_URL}/api/auth/activate?active_token=${active_token}`

             let message = ""
             let messagingService = null;
             if (validEmail(username)) {
                // TODO: catch if there is sending error
                messagingService = new MessagingService(new GMail())
                messagingService.send(
                    username, 
                    "MERN Blog App - Verify Your Email Address",
                    `
                        <div>
                            <h2>Welcome to the MERN Blog App</h2>
                            <p>Congratulation! You're almost set to start using MERN Blog App. Just click the button below to validate your email address.</p>
                        </div>

                        <a href=${activation_url}>Verify my email address</a>

                        <p>If the button does not work for any reason, you can also click the link below:</p>

                        <div>${activation_url}</div>
                    `
                )
                message = "Registered successfully! Please check your email."
             } else if (validPhone(username)) {
                // TODO: catch if there is sending error
                messagingService = new MessagingService(new Twilio())
                messagingService.send(
                    username, 
                    '',
                    `MERN Blog APP - Verify your phone number by clicking this link: ${activation_url}`
                )
                message = "Registered successfully! Please check your phone."
             }

             return res.json({ 
                message, 
                data : newUser,
                active_token
            })
        } catch (err : any) {
            return res.status(500).json({ message : err.message })
        }
    }
}

export default registerController

