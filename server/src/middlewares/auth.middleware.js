import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export async function protectRoute(req, res, next) {
  try {
      const accessToken = req.cookies.accessToken;
      if(!accessToken){
          return res.status({message: "Uauthorized= No access token provied"})
      }
  
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
  
      if(!user){
            return res.status(400).json({message: "User not found"})
      }
  
      req.user = user;
      next();
  } catch (error) {
    console.error("Error in protect middleware (outer catch):", error.message);
    res.status(500).json({
      message: "Error in protect middleware",
      error: error.message,
    });
  }

}

export async function adminRoute(req, res, next){
  if(req.user && req.user.role === "admin"){
    next();
  }
  else{
    return res.status(403).json({message: "Access denied - Admin only"});
  }
}