import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, {timestamps : true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id, 
            email : this.email,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id, 
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

const User = mongoose.model("User", userSchema);


export default User
