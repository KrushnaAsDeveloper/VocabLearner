import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const cookieOptionsForAccess = JSON.parse(process.env.ACCESS_COOKIE_OPTIONS);
const cookieOptionsForRefresh = JSON.parse(process.env.REFRESH_COOKIE_OPTIONS);
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
    const userWithRefreshToken = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    res.status(200)
        .cookie("accessToken", accessToken, cookieOptionsForAccess)
        .cookie("refreshToken", refreshToken, cookieOptionsForRefresh)
        .json(
            new ApiResponse(
                200,
                userWithRefreshToken,
                "User Log in Successfully"
            )
        );
});

//Log out user
export const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });

    const userWithNoRefreshToken = await User.findById(req.user._id).select(
        "-password"
    );

    res.status(200)
        .clearCookie("accessToken", cookieOptionsForAccess)
        .clearCookie("refreshToken", cookieOptionsForRefresh)
        .json(new ApiResponse(200, userWithNoRefreshToken, "User Logged out"));
});

// refreshAccessToken controller

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshTokenFromCookiesAndBody =
        req.cookies?.refreshToken || req.body?.refreshToken;

    const decode = jwt.verify(
        refreshTokenFromCookiesAndBody,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decode._id);

    if (refreshTokenFromCookiesAndBody !== user.refreshToken) {
        throw new ApiError(401, "Refresh token expires !");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        decode._id
    );

    res.status(200)
        .cookie("accessToken", accessToken, cookieOptionsForAccess)
        .cookie("refreshToken", refreshToken, cookieOptionsForRefresh)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "User logged in successfully and access token refreshed !"
            )
        );
});


// edit password contrller

export const editUserRoute = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if(oldPassword === newPassword){
        throw new ApiError(400, "New password is same as old one please try again !")
    }
    const id = req.user._id
       
    if (!id) {
        throw new ApiError(401, "Unauthorized User, Not logged in");
    }
    const user = await User.findById(id);
    const checkOldpassword = await user.comparePassword(oldPassword);
    if(!checkOldpassword){
        throw new ApiError(400, "Old password is incorrect, please enter valid password")


    }

    user.password = newPassword;
    user.refreshToken = undefined;
    await user.save();

    const newUser = await User.findById(id).select(
        "-password -refreshToken"
    );

    res.status(200)
        .clearCookie("accessToken", cookieOptionsForAccess)
        .clearCookie("refreshToken", cookieOptionsForRefresh)
        .json(
            new ApiResponse(
                201,
                newUser,
                "Your Password Updated Successfully !"
            )
        );
});
