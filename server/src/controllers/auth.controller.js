import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { redis } from "../utils/redis.js";

const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
}

const storeRefreshToken = async(userId, refreshToken) => {
	await redis.set(`refresh_token: ${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}

const setCookies = (res, refreshToken, accessToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 15 * 60 * 1000,
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, 
	});
}

export const register = async (req, res) => {
    const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });

	
	
		const {refreshToken, accessToken} = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);
		setCookies(res, refreshToken, accessToken);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		  if (error.name === "ValidationError") {
			console.log("Error in signup controller", error.message);
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages[0] }); 
    }

		console.log("Error in signup controller", error.message);

		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		console.log("user", user)
		if (user && (await user.comparePassword(password))) {
			console.log("hi1")
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, refreshToken, accessToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
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
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
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
	
			if(storedToken !== refreshToken){
				return res.status(401).json({ message: "Refresh token is invalid" });
			}
	
			const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
	
			res.cookie("access_token", accessToken, {
				httpOnly: true,
					secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000, 
			})
	
				res.json({ message: "Token refreshed successfully" });
	
	
} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
}}

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getProfile:", error.message);
    res.status(500).json({ error: "Server error, please try again later." });
	}
}