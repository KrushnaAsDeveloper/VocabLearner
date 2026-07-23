import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const cookieOptions = JSON.parse(process.env.COOKIE_OPTIONS)
//Generate access and refresh token
async function generateAccessAndRefreshToken(userId) {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
}
// Register controller
export const registerNewUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "User already exists");
    }

    const createUser = await User.create({ email, password });

    const existedUser = await User.findById(createUser._id).select("-password");

    res.status(201).json(
        new ApiResponse(201, existedUser, "User Registerd Successfully !")
    );
});

// Login controller

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "user not exists, please do register");
    }

    const passwordVerify = await user.comparePassword(password.trim());
    if (!passwordVerify) throw new ApiError(401, "Unauthorize User");
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );
    const userWithRefreshToken = await User.findById(user._id).select("-password -refreshToken");

    res.status(200)
        .cookie("accessToken", accessToken, cookieOptions )
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                userWithRefreshToken,
                "User Log in Successfully"
            )
        );
});
