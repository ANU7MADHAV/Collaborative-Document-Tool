import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig";

function generateAccessToken(username: string) {
  return jwt.sign(username, serverConfig.TOKEN, { expiresIn: "1800s" });
}

export default generateAccessToken;
