import { User } from "../models/user.model.js";

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user);

    console.log("type of user role", typeof user.role);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
