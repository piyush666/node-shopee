import express from "express";
import mongoose from "mongoose";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signUp(req, res) {
  try {
    const user = await UserModel.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "mail exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: err.message,
            success: true,
          });
        } else {
          console.log("hash", hash);
          const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: hash,
          });

          try {
            const result = await user.save();
            console.log(result);
            res.status(201).json({
              message: "user Created",
              success: true,
            });
          } catch (error) {
            return res.status(500).json({
              message: error.message,
              success: false,
            });
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

async function login(req, res) {
  try {
    const user: any = await UserModel.find({ email: req.body.email });
    if (user.length < 1) {
      return res.status(409).json({
        message: "Auth Failed",
        success: false,
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
          success: false,
        });
      }
      if (result) {
        const token = jwt.sign(
          { email: user[0].email, userId: user[0]._id },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth Successfull",
          token: token,
          success: true,
        });
      }
      return res.status(401).json({
        message: "Auth failed",
        success: false,
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: err.message,
      success: false,
    });
  }
}

async function removeUser(req, res) {
  try {
    const result = await UserModel.remove({
      _id: req.params.userId,
    });
    if (result) {
      res.status(200).json({
        message: "user deleted",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: error.message,
      success: false,
    });
  }
}



export { signUp, login, removeUser };
