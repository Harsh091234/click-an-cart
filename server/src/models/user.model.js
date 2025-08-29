import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [6, "Name must be 6 characters long"],
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
    cartItems: {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local", 
    },
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

const User = mongoose.model("User", userSchema);

export default User;
