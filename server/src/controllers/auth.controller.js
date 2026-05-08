import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis.js";
import client from "../utils/googleClient.js";
import axios from "axios";
import { randomInt } from "crypto";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetSuccessEmail,
  sendPasswordResetEmail,
} from "../utils/mailing/email.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `click-an-cart:refresh_token: ${userId}`,
    refreshToken,
    {EX: 
    7 * 24 * 60 * 60}
  );
};

const setCookies = (res, refreshToken, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const googleAuth = async (req, res) => {
  const { access_token } = req.body;
  try {
    if (!access_token) {
      return res
        .status(400)
        .json({ message: "Google access token is required" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    if(!response) return res.status(400).json
    const { email, name } = response.data;

    let user = await User.findOne({ email });
      const verificationCode = randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");
    if (!user) {
      user = await User.create({
        name,
        email,
        hasPassword: false,
         verificationCode,
        
      verificationCodeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        authProvider: "google",
      });
    }

    const { refreshToken, accessToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, refreshToken, accessToken);
 await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
       isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("Error in googleAuth:", error.message);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
   const verificationCode = randomInt(0, 1000000)
  .toString()
  .padStart(6, "0");

    const user = await User.create({
      name,
      email,
      password,
      verificationCode,
      authProvider: "local",
      verificationCodeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const { refreshToken, accessToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, refreshToken, accessToken);

    await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("Error in signup controller", error.message);
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages[0] });
    }

    console.log("Error in signup controller", error.message);

    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({
      verificationCode: code,
      verificationCodeExpiresAt: { $gt: Date.now() },
    });
  
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: true,
      authProvider: user.authProvider
    });
  } catch (error) {
    console.error("Error in verifyEmail controller:", error.message);
    res.status(500).json({
      message: "Server error while verifying email",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
     
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, refreshToken, accessToken);

      res.json({
        _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
       isVerified: user.isVerified,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token: ${decoded.userId}`);
      
    
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token: ${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token is invalid" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 60 * 1000,
    });

   res.json({ accessToken });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    const resetPasswordCode = randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");

    const resetPasswordCodeExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordCode = resetPasswordCode;
    user.resetPasswordCodeExpiresAt = resetPasswordCodeExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordCode}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "password reset link sent to your email",
        code: user.resetPasswordCode,
      });
  } catch (error) {
    console.log("Error in forgot password: ", error);
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { code } = req.params;
    const { newPassword } = req.body;
  
    const user = await User.findOne({
      resetPasswordCode: code,
      resetPasswordCodeExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired reset token" });
    }

    user.password = newPassword;
    user.resetPasswordCode = undefined;
    user.resetPasswordCodeExpiresAt = undefined;
    await user.save();

    await sendPasswordResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("error in reset password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};



export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordCode: token,
      resetPasswordCodeExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "Valid token" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
   const verificationCode = randomInt(0, 1000000)
  .toString()
  .padStart(6, "0");
    user.verificationCode = verificationCode;
    user.verificationCodeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h expiry
    await user.save();

    // Send email
    await sendVerificationEmail(user.email, verificationCode);

    res.status(200).json({ message: "Verification code resent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to resend verification code" });
  }
};

export const setPassword = async (req, res) => {
  try {
    const {_id} = req.user; 
    
    const { password} = req.body;


    const user = await User.findById(_id);
    console.log("user: ", user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    user.password = password;
    user.hasPassword = true;

    await user.save();

    res.status(200).json({
      _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasPassword: user.hasPassword,
        isVerified: user.isVerified,
    });
  } catch (err) {
    console.error("Set password error:", err);
    res.status(500).json({ success: false, message: "Server error.", hasPassword: false });
  }
};

export const switchRoleToAdmin = async (req, res) => {
  try {
    const {role} = req.body;
    if(role !== "admin" ){
      return res.status(401).json({message: "Access denied! Admins Only."})
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      role
    }, {
      new: true
    })
    if(!updatedUser){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(
      updatedUser
    )

  } catch (err) {
    console.error("Error switching role: ", err);
    res.status(500).json({ message: err.message });
  }
};




export const toggleRole = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle role
    user.role = user.role === "buyer" ? "seller" : "buyer";
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
