import express from "express";
import userController from "../controller/userController.js";
import {  userValidationRules } from "../helpers/validators.js";

export const userRouter = express();

userRouter.get('/search' , userController.searchUser)

userRouter.post('/' ,userValidationRules, userController.createUser)

userRouter.put('/update/:id' ,userValidationRules, userController.updateUser)
