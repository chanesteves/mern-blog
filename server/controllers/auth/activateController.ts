// TODO: Add tests
import { Request, Response } from "express";
import User from "../../models/userModel";
import IUser from "../../interfaces/IUser";
import IDecodedUserToken from "../../interfaces/IDecodedUserToken";
import { verifyActiveToken } from "../../dependencies/jwt";

const activateController = {
  activate: async (req: Request, res: Response) => {
    try {
      const active_token = req.query.active_token;

      const decoded = <IDecodedUserToken>verifyActiveToken(`${active_token}`);

      if (!decoded) {
        return res.status(400).json({ message: "Invalid activation token!" });
      }

      const user = new User({
        name: decoded.name,
        username: decoded.username,
        password: decoded.password,
      });

      await user.save();

      return res.json({
        message: "Activated successfully!",
        data: user,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default activateController;
