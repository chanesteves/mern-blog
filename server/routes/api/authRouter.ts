import express from "express"
import registerController from "../../controllers/auth/registerController"
import activateController from "../../controllers/auth/activateController"
import { validateRegister } from "../../middlewares/validators/registerValidator"

const authRouter = express.Router()

authRouter.post('/register', validateRegister, registerController.register)
authRouter.get('/activate', activateController.activate)

export default authRouter