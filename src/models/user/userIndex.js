import User from "./userModel.js";
import UserAuth from "./userAuthModel.js";
import UserToken from "./userTokenModel.js";

User.hasMany(UserAuth, { foreignKey: "userId", as: 'authMethods' });
User.hasMany(UserToken, {foreignKey: 'userId', as: 'tokens'});

export { User, UserAuth, UserToken };

