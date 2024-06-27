import jwt from "jsonwebtoken";
const AuthorizeMd = (token) => {
  try {
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export default AuthorizeMd;
