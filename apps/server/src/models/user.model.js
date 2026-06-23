import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be 3 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      default: null,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: [{
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    }],
    role: {
      type: String,
      
      enum: ["buyer", "admin", "seller"],
      default: "buyer"
      
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local", 
    },
     isVerified: {
      type: Boolean,
      default: false,
    },
    hasPassword: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String
    },
    location: String,
    avatar: {
      type: String,
    
    },
    phone: String,
    coverImage:{
      type: String
    },
    languages: {
      type: [String],
    
    },
    verificationCode: String,
    verificationCodeExpiresAt: Date,
    resetPasswordCode: String,
    resetPasswordCodeExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
	  if (!this.password) return false; 
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET ,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY ,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
