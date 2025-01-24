import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const IsAuthenticate = async (req, res, next) => {
try{

    const  token  =  req.header('Authorization').replace('Bearer ',"") ||  req.cookies.token || req.body.token
    if (!token) {
      return res.status(401).json({ status: false, message: "Please Signin" });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid token,Please Signin Again" });
    }
    req.user = data;
    next();
}catch(err){
    console.log(err);
    res.status(500).json({ status: false, message: "Authentication failed" });
}
};
